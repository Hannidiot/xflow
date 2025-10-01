<template>
  <div class="h-full flex flex-col">
    <!-- Search Bar Section -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-4">
        <el-input
          v-model="searchQuery"
          placeholder="Search traffic records..."
          clearable
          class="flex-1"
          @input="handleSearch"
        >
          <template #prefix>
            <el-icon><SearchIcon /></el-icon>
          </template>
        </el-input>

        <el-select
          v-model="selectedMethod"
          placeholder="Method"
          clearable
          @change="handleFilterChange"
        >
          <el-option label="GET" value="GET" />
          <el-option label="POST" value="POST" />
          <el-option label="PUT" value="PUT" />
          <el-option label="DELETE" value="DELETE" />
          <el-option label="PATCH" value="PATCH" />
        </el-select>

        <el-select
          v-model="selectedStatus"
          placeholder="Status"
          clearable
          @change="handleFilterChange"
        >
          <el-option label="200 OK" value="200" />
          <el-option label="404 Not Found" value="404" />
          <el-option label="500 Server Error" value="500" />
          <el-option label="302 Redirect" value="302" />
        </el-select>
      </div>
    </div>

    <!-- Main Content with Splitter -->
    <el-splitter layout="vertical" class="flex-1">
      <!-- Virtualized Table Section -->
      <el-splitter-panel>
        <VxeTableBar
          :vxeTableRef="vxeTableRef"
          :columns="tableColumns"
          title="Network Traffic"
          @refresh="handleRefresh"
        >
          <template #default="{ size, dynamicColumns }">
            <vxe-grid
              ref="vxeTableRef"
              show-overflow
              :height="tableHeight"
              :size="size"
              :column-config="{ resizable: true }"
              :scroll-y="{ enabled: true }"
              :columns="dynamicColumns"
              :data="filteredData"
            />
          </template>
        </VxeTableBar>
      </el-splitter-panel>

      <el-splitter-panel>
        <!-- Detail Panels Section -->
        <el-splitter layout="horizontal">
          <!-- Request Details Panel -->
          <el-splitter-panel>
            <DetailPanel
              title="Request Details"
              :data="selectedRow?.request"
              :active-tab="requestActiveTab"
              @tab-change="requestActiveTab = $event"
            />
          </el-splitter-panel>

          <!-- Response Details Panel -->
          <el-splitter-panel>
            <DetailPanel
              title="Response Details"
              :data="selectedRow?.response"
              :active-tab="responseActiveTab"
              @tab-change="responseActiveTab = $event"
            />
          </el-splitter-panel>
        </el-splitter>
      </el-splitter-panel>
    </el-splitter>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { Search as SearchIcon } from "@element-plus/icons-vue";
import { VxeTableBar } from "@/components/ReVxeTableBar";
import DetailPanel from "./components/DetailPanel.vue";

interface TrafficRecord {
  id: string;
  method: string;
  url: string;
  protocol: string;
  statusCode: number;
  statusText: string;
  size: string;
  time: string;
  contentType: string;
  timestamp: string;
  request: {
    headers: Record<string, string>;
    body: string;
  };
  response: {
    headers: Record<string, string>;
    body: string;
  };
}

export default defineComponent({
  name: "TrafficMonitoring",
  components: {
    SearchIcon,
    VxeTableBar,
    DetailPanel
  },
  setup() {
    // State
    const searchQuery = ref("");
    const selectedMethod = ref("");
    const selectedStatus = ref("");
    const selectedRow = ref<TrafficRecord | null>(null);
    const vxeTableRef = ref();
    const requestActiveTab = ref("pretty");
    const responseActiveTab = ref("pretty");

    // Mock data - in real app this would come from API
    const mockData = ref<TrafficRecord[]>([]);

    // Generate mock data
    const generateMockData = () => {
      const methods = ["GET", "POST", "PUT", "DELETE"];
      const statusCodes = [200, 404, 500, 302];
      const statusTexts = ["OK", "Not Found", "Server Error", "Found"];
      const protocols = ["HTTP/1.1", "HTTP/2"];
      const contentTypes = ["application/json", "text/html", "application/xml"];

      const data: TrafficRecord[] = [];

      for (let i = 0; i < 10000; i++) {
        const method = methods[Math.floor(Math.random() * methods.length)];
        const statusIndex = Math.floor(Math.random() * statusCodes.length);

        data.push({
          id: `record-${i}`,
          method,
          url: `/api/v${Math.floor(Math.random() * 3) + 1}/endpoint/${i}`,
          protocol: protocols[Math.floor(Math.random() * protocols.length)],
          statusCode: statusCodes[statusIndex],
          statusText: statusTexts[statusIndex],
          size: `${Math.floor(Math.random() * 10000)} bytes`,
          time: `${Math.random().toFixed(2)}s`,
          contentType:
            contentTypes[Math.floor(Math.random() * contentTypes.length)],
          timestamp: new Date(
            Date.now() - Math.random() * 86400000
          ).toISOString(),
          request: {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer token123",
              "User-Agent": "Mozilla/5.0"
            },
            body: JSON.stringify({
              id: i,
              action: "get",
              timestamp: new Date().toISOString()
            })
          },
          response: {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
              Server: "nginx/1.18.0"
            },
            body: JSON.stringify({
              data: { id: i, name: `Item ${i}`, status: "active" },
              success: true,
              timestamp: new Date().toISOString()
            })
          }
        });
      }

      return data;
    };

    // Table columns for VxeTableBar
    const tableColumns = ref([
      {
        title: "Method",
        field: "method",
        width: 80
      },
      {
        title: "URL",
        field: "url",
        width: 300
      },
      {
        title: "Protocol",
        field: "protocol",
        width: 100
      },
      {
        title: "Status",
        field: "statusCode",
        width: 100
      },
      {
        title: "Status Text",
        field: "statusText",
        width: 120
      },
      {
        title: "Size",
        field: "size",
        width: 100
      },
      {
        title: "Time",
        field: "time",
        width: 80
      },
      {
        title: "Content Type",
        field: "contentType",
        width: 150
      },
      {
        title: "Timestamp",
        field: "timestamp",
        width: 180
      }
    ]);

    // Computed
    const filteredData = computed(() => {
      let filtered = mockData.value;

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          item =>
            item.url.toLowerCase().includes(query) ||
            item.method.toLowerCase().includes(query) ||
            item.statusText.toLowerCase().includes(query)
        );
      }

      if (selectedMethod.value) {
        filtered = filtered.filter(
          item => item.method === selectedMethod.value
        );
      }

      if (selectedStatus.value) {
        filtered = filtered.filter(
          item => item.statusCode.toString() === selectedStatus.value
        );
      }

      return filtered;
    });

    const tableHeight = computed(() => {
      return window.innerHeight - 400;
    });

    // Methods
    const handleSearch = () => {
      // Search is handled reactively by computed property
    };

    const handleFilterChange = () => {
      // Filtering is handled reactively by computed property
    };

    const handleCellClick = ({ row }: { row: TrafficRecord }) => {
      selectedRow.value = row;
    };

    const handleRefresh = () => {
      // Refresh logic here - could reload data from API
      console.log("Refreshing table data...");
    };

    // VXE Table row class handling
    const getRowClass = ({ row }: { row: TrafficRecord }) => {
      return selectedRow.value?.id === row.id
        ? "selected-row bg-blue-50 dark:bg-blue-900"
        : "";
    };

    const getMethodClass = (method: string) => {
      const colorMap: Record<string, string> = {
        GET: "text-blue-600 font-bold",
        POST: "text-green-600 font-bold",
        PUT: "text-yellow-600 font-bold",
        DELETE: "text-red-600 font-bold"
      };
      return colorMap[method] || "text-gray-600 font-bold";
    };

    const getStatusClass = (statusCode: number) => {
      if (statusCode >= 400) return "text-red-600 font-bold";
      if (statusCode >= 300) return "text-yellow-600 font-bold";
      return "text-green-600 font-bold";
    };

    const formatTimestamp = (timestamp: string) => {
      return new Date(timestamp).toLocaleString();
    };

    // Lifecycle
    onMounted(() => {
      mockData.value = generateMockData();
      // Select first row by default
      if (mockData.value.length > 0) {
        selectedRow.value = mockData.value[0];
      }
    });

    return {
      searchQuery,
      selectedMethod,
      selectedStatus,
      selectedRow,
      vxeTableRef,
      requestActiveTab,
      responseActiveTab,
      tableColumns,
      filteredData,
      tableHeight,
      handleSearch,
      handleFilterChange,
      handleCellClick,
      handleRefresh,
      getMethodClass,
      getStatusClass,
      formatTimestamp
    };
  }
});
</script>

<style scoped>
.selected-row {
  border-left: 4px solid rgb(59 130 246);
}

:deep(.el-split__trigger) {
  background-color: rgb(229 231 235);
}

:deep(.el-split__trigger:hover) {
  background-color: rgb(209 213 219);
}

@media (prefers-color-scheme: dark) {
  :deep(.el-split__trigger) {
    background-color: rgb(55 65 81);
  }

  :deep(.el-split__trigger:hover) {
    background-color: rgb(75 85 99);
  }
}
</style>
