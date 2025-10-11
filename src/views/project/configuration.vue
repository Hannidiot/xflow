<template>
  <div class="h-full flex flex-col">
    <!-- Proxy Settings Section -->
    <div class="p-6 bg-white rounded-lg shadow-sm mb-4">
      <h2 class="text-xl font-bold text-gray-900 mb-4">代理设置</h2>

      <el-form
        ref="proxyFormRef"
        :model="proxySettings"
        :rules="proxyRules"
        label-width="120px"
        class="max-w-2xl"
      >
        <el-form-item label="代理模式" prop="mode">
          <el-select
            v-model="proxySettings.mode"
            placeholder="选择代理模式"
            class="w-48"
          >
            <el-option label="直连" value="direct" />
            <el-option label="HTTP" value="http" />
            <el-option label="HTTPS" value="https" />
            <el-option label="SOCKS" value="socks" />
          </el-select>
        </el-form-item>

        <el-form-item label="DNS过滤" prop="dnsFilter">
          <el-input
            v-model="proxySettings.dnsFilter"
            placeholder="输入DNS过滤规则，多个用逗号分隔"
            class="w-80"
          />
        </el-form-item>

        <el-form-item label="自动加解密" prop="autoEncrypt">
          <el-switch
            v-model="proxySettings.autoEncrypt"
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="proxyLoading"
            @click="handleSaveProxySettings"
          >
            保存设置
          </el-button>
          <el-button
            type="success"
            class="ml-2"
            @click="handleDownloadCertificate"
          >
            下载证书
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- Device Selection Section -->
    <div class="flex-1 p-6 bg-white rounded-lg shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-900">设备管理</h2>
        <el-button type="primary" @click="handleAddDevice">
          添加设备
        </el-button>
      </div>

      <DeviceSelection
        :show_search="true"
        @device-change="handleDeviceChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import {
  getProxySettings,
  updateProxySettings,
  downloadCertificate,
  type ProxySettings
} from "@/api/project-configuration";
import { DeviceSelection } from "@/components/DeviceSelection";

// Proxy Settings
const proxyFormRef = ref<FormInstance>();
const proxySettings = reactive<ProxySettings>({
  mode: "direct",
  dnsFilter: "",
  autoEncrypt: false
});
const proxyLoading = ref(false);

// Device Selection
const selectedDevice = ref<any>(null);

// Form Validation Rules
const proxyRules: FormRules = {
  mode: [{ required: true, message: "请选择代理模式", trigger: "change" }],
  dnsFilter: [
    { max: 500, message: "DNS过滤规则不能超过500个字符", trigger: "blur" }
  ]
};

// Methods
const loadProxySettings = async () => {
  try {
    const response = await getProxySettings();
    if (response.code === "200") {
      Object.assign(proxySettings, response.data.data);
    }
  } catch (error) {
    console.error("Failed to load proxy settings:", error);
    ElMessage.error("加载代理设置失败");
  }
};

const handleSaveProxySettings = async () => {
  if (!proxyFormRef.value) return;

  try {
    await proxyFormRef.value.validate();
    proxyLoading.value = true;

    const response = await updateProxySettings(proxySettings);
    if (response.code === "200") {
      ElMessage.success("代理设置保存成功");
    } else {
      ElMessage.error(response.err_msg || "保存失败");
    }
  } catch (error) {
    console.error("Failed to save proxy settings:", error);
    ElMessage.error("保存代理设置失败");
  } finally {
    proxyLoading.value = false;
  }
};

const handleDownloadCertificate = async () => {
  try {
    const response = await downloadCertificate();
    if (response.code === "200") {
      // In a real application, this would trigger a file download
      ElMessage.success("证书下载链接已生成");
      console.log("Download URL:", response.data.downloadUrl);
    } else {
      ElMessage.error(response.err_msg || "证书下载失败");
    }
  } catch (error) {
    console.error("Failed to download certificate:", error);
    ElMessage.error("证书下载失败");
  }
};

const handleDeviceChange = (device: any) => {
  selectedDevice.value = device;
  if (device?.dev_id) {
    ElMessage.success(`已选择设备: ${device.dev_name || device.dev_id}`);
  }
};

const handleAddDevice = () => {
  ElMessage.info("添加设备功能待实现");
};

// Lifecycle
onMounted(() => {
  loadProxySettings();
});
</script>
