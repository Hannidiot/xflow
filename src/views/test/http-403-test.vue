<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">HTTP 403 Response Test</h2>
    <p class="text-gray-600 mb-6">
      测试当API返回403状态码时，登录过期对话框是否正确显示
    </p>

    <div class="space-y-6">
      <!-- Test Controls -->
      <el-card>
        <template #header>
          <span class="font-semibold">403 Response Tests</span>
        </template>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <el-button
              type="primary"
              :loading="loading.expiredToken"
              class="w-full"
              @click="testExpiredToken"
            >
              Test Expired Token
            </el-button>

            <el-button
              type="warning"
              :loading="loading.insufficientPermissions"
              class="w-full"
              @click="testInsufficientPermissions"
            >
              Test Insufficient Permissions
            </el-button>

            <el-button
              type="danger"
              :loading="loading.delayed403"
              class="w-full"
              @click="testDelayed403"
            >
              Test Delayed 403 (2s)
            </el-button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <el-button
              type="info"
              :loading="loading.multiple403"
              class="w-full"
              @click="testMultiple403"
            >
              Test Multiple 403 Calls
            </el-button>

            <el-button
              type="success"
              :loading="loading.validApi"
              class="w-full"
              @click="testValidApiCall"
            >
              Test Valid API Call
            </el-button>
          </div>
        </div>
      </el-card>

      <!-- Current Dialog Status -->
      <el-card>
        <template #header>
          <span class="font-semibold">Dialog Status</span>
        </template>
        <div class="space-y-2">
          <div class="flex items-center">
            <span class="w-40">Dialog Shown:</span>
            <el-tag :type="dialogShown ? 'danger' : 'success'">
              {{ dialogShown ? "Yes" : "No" }}
            </el-tag>
          </div>
          <div class="flex items-center">
            <span class="w-40">Dialog Count:</span>
            <span class="font-semibold">{{ dialogCount }}</span>
          </div>
          <div class="flex items-center">
            <span class="w-40">Last Trigger:</span>
            <span class="text-gray-600">{{ lastTrigger }}</span>
          </div>
        </div>
      </el-card>

      <!-- Test Results -->
      <el-card>
        <template #header>
          <span class="font-semibold">Test Results</span>
        </template>
        <div class="space-y-2 max-h-60 overflow-y-auto">
          <div
            v-for="(result, index) in testResults"
            :key="index"
            class="flex items-center p-2 border-b border-gray-100 last:border-b-0"
          >
            <el-tag :type="result.type" size="small" class="flex-shrink-0">
              {{ result.type.toUpperCase() }}
            </el-tag>
            <div class="ml-3 flex-1">
              <div class="font-medium">{{ result.message }}</div>
              <div class="text-xs text-gray-500">{{ result.time }}</div>
              <div v-if="result.details" class="text-xs text-gray-600 mt-1">
                {{ result.details }}
              </div>
            </div>
          </div>
          <div
            v-if="testResults.length === 0"
            class="text-center text-gray-500 py-4"
          >
            No test results yet. Click the buttons above to start testing.
          </div>
        </div>
      </el-card>

      <!-- HTTP Interceptor Information -->
      <el-card>
        <template #header>
          <span class="font-semibold">HTTP Interceptor Information</span>
        </template>
        <div class="space-y-2 text-sm">
          <p><strong>Location:</strong> <code>src/utils/http/index.ts</code></p>
          <p>
            <strong>Interceptor Logic:</strong> When response contains
            <code>code: "403"</code>, the interceptor calls
            <code>showLoginExpiredDialog()</code>
          </p>
          <p>
            <strong>Dialog Component:</strong>
            <code>src/utils/http/login_expire_dialog.tsx</code>
          </p>
          <p>
            <strong>Expected Behavior:</strong> When a 403 response is received,
            the login expired dialog should appear and automatically log the
            user out when confirmed.
          </p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { http, type Response } from "@/utils/http";
import { loginExpiredDialogShown } from "@/utils/http/login_expire_dialog";
import { message } from "@/utils/message";

interface TestResult {
  type: "success" | "error" | "warning" | "info";
  message: string;
  time: string;
  details?: string;
}

// Reactive state
const loading = ref({
  expiredToken: false,
  insufficientPermissions: false,
  delayed403: false,
  multiple403: false,
  validApi: false
});

const testResults = ref<TestResult[]>([]);
const dialogShown = ref(false);
const dialogCount = ref(0);
const lastTrigger = ref("Never");

// Methods
const addTestResult = (
  type: TestResult["type"],
  message: string,
  details?: string
) => {
  testResults.value.unshift({
    type,
    message,
    time: new Date().toLocaleTimeString(),
    details
  });

  // Keep only last 20 results
  if (testResults.value.length > 20) {
    testResults.value = testResults.value.slice(0, 20);
  }
};

const updateDialogStatus = () => {
  dialogShown.value = loginExpiredDialogShown.value;
  if (loginExpiredDialogShown.value) {
    dialogCount.value++;
    lastTrigger.value = new Date().toLocaleTimeString();
  }
};

// Test methods
const testExpiredToken = async () => {
  loading.value.expiredToken = true;
  try {
    const response = await http.get<Response<null>>("/auth/test/expired-token");
    addTestResult(
      "warning",
      "Expired token test completed",
      `Response: ${JSON.stringify(response)}`
    );
    message("Expired token test completed - check for dialog", {
      type: "warning"
    });
  } catch (error) {
    addTestResult("error", "Expired token test failed", `Error: ${error}`);
    message("Expired token test failed", { type: "error" });
  } finally {
    loading.value.expiredToken = false;
  }
};

const testInsufficientPermissions = async () => {
  loading.value.insufficientPermissions = true;
  try {
    const response = await http.get<Response<null>>(
      "/auth/test/insufficient-permissions"
    );
    addTestResult(
      "warning",
      "Insufficient permissions test completed",
      `Response: ${JSON.stringify(response)}`
    );
    message("Insufficient permissions test completed - check for dialog", {
      type: "warning"
    });
  } catch (error) {
    addTestResult(
      "error",
      "Insufficient permissions test failed",
      `Error: ${error}`
    );
    message("Insufficient permissions test failed", { type: "error" });
  } finally {
    loading.value.insufficientPermissions = false;
  }
};

const testDelayed403 = async () => {
  loading.value.delayed403 = true;
  try {
    const response = await http.get<Response<null>>("/auth/test/delayed-403");
    addTestResult(
      "warning",
      "Delayed 403 test completed",
      `Response: ${JSON.stringify(response)}`
    );
    message("Delayed 403 test completed - check for dialog", {
      type: "warning"
    });
  } catch (error) {
    addTestResult("error", "Delayed 403 test failed", `Error: ${error}`);
    message("Delayed 403 test failed", { type: "error" });
  } finally {
    loading.value.delayed403 = false;
  }
};

const testMultiple403 = async () => {
  loading.value.multiple403 = true;
  try {
    // Make multiple 403 calls in sequence
    const promises = [
      http.get<Response<null>>("/auth/test/expired-token"),
      http.get<Response<null>>("/auth/test/insufficient-permissions"),
      http.get<Response<null>>("/auth/test/delayed-403")
    ];

    const results = await Promise.allSettled(promises);

    let successCount = 0;
    let errorCount = 0;

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        successCount++;
      } else {
        errorCount++;
      }
    });

    addTestResult(
      "info",
      "Multiple 403 test completed",
      `Success: ${successCount}, Errors: ${errorCount}, Total: ${results.length}`
    );
    message(
      `Multiple 403 test completed - ${successCount} successful, ${errorCount} errors`,
      { type: successCount > 0 ? "success" : "error" }
    );
  } catch (error) {
    addTestResult("error", "Multiple 403 test failed", `Error: ${error}`);
    message("Multiple 403 test failed", { type: "error" });
  } finally {
    loading.value.multiple403 = false;
  }
};

const testValidApiCall = async () => {
  loading.value.validApi = true;
  try {
    // Test a valid API call to ensure normal functionality still works
    const response = await http.get<Response<any>>("/auth/profile");
    addTestResult(
      "success",
      "Valid API call completed",
      `Response code: ${response.code}`
    );
    message("Valid API call completed successfully", { type: "success" });
  } catch (error) {
    addTestResult("error", "Valid API call failed", `Error: ${error}`);
    message("Valid API call failed", { type: "error" });
  } finally {
    loading.value.validApi = false;
  }
};

// Initialize
onMounted(() => {
  addTestResult(
    "info",
    "HTTP 403 Test page loaded",
    "Ready to test 403 response handling"
  );

  // Set up dialog status monitoring
  const interval = setInterval(updateDialogStatus, 100);

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<style scoped>
.code {
  padding: 2px 4px;
  font-family: "Courier New", monospace;
  font-size: 0.9em;
  background-color: #f5f5f5;
  border-radius: 3px;
}
</style>
