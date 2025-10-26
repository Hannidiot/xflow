<template>
  <div>
    <!-- Search Bar Section -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-4">
        <el-input
          v-model="searchQuery"
          placeholder="Search traffic records..."
          clearable
          @input="handleSearch"
        >
          <template #prefix>
            <el-icon><SearchIcon /></el-icon>
          </template>
        </el-input>

        <el-select v-model="selectedMethod" placeholder="Method" clearable>
          <el-option label="GET" value="GET" />
          <el-option label="POST" value="POST" />
          <el-option label="PUT" value="PUT" />
          <el-option label="DELETE" value="DELETE" />
          <el-option label="PATCH" value="PATCH" />
        </el-select>

        <el-select v-model="selectedStatus" placeholder="Status" clearable>
          <el-option label="200 OK" value="200" />
          <el-option label="404 Not Found" value="404" />
          <el-option label="500 Server Error" value="500" />
          <el-option label="302 Redirect" value="302" />
        </el-select>
      </div>
    </div>

    <div class="h-[80vh] grid grid-cols-2 grid-rows-5 gap-1">
      <!-- Main Content -->
      <div class="col-span-2 row-span-3">
        <vxe-grid
          ref="vxeTableRef"
          show-overflow
          height="auto"
          :column-config="{ resizable: true }"
          :row-config="{ isCurrent: true, isHover: true }"
          :scroll-y="{ enabled: true }"
          :columns="tableColumns"
          :data="filteredData"
          @current-change="handleCurrentChange"
        />
      </div>

      <div class="col-span-2 row-span-2 flex flex-row space-x-1">
        <DetailPanel
          title="Request Details"
          :data="selectedRow?.request"
          :active-tab="requestActiveTab"
          class="flex-1"
          @tab-change="requestActiveTab = $event"
        />

        <DetailPanel
          title="Response Details"
          :data="selectedRow?.response"
          :active-tab="responseActiveTab"
          class="flex-1"
          @tab-change="responseActiveTab = $event"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { Search as SearchIcon } from "@element-plus/icons-vue";
import DetailPanel from "./components/DetailPanel.vue";
import { getTrafficRecords, type TrafficRecord } from "@/api/monitoring";
import { monitoringTableColumns } from "./columns";

export default defineComponent({
  name: "TrafficMonitoring",
  components: {
    SearchIcon,
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

    // Traffic data from API
    const trafficData = ref<TrafficRecord[]>([]);

    // Table columns for VxeTableBar
    const tableColumns = ref(monitoringTableColumns);

    // Computed
    const filteredData = computed(() => {
      let filtered = trafficData.value;

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

    // Methods
    const handleSearch = () => {
      // Search is handled reactively by computed property
    };

    const loadTrafficData = async () => {
      try {
        const response = await getTrafficRecords({
          searchQuery: searchQuery.value,
          method: selectedMethod.value,
          status: selectedStatus.value
        });

        if (response.code === "200") {
          trafficData.value = response.data.data;
        }
      } catch (error) {
        console.error("Failed to load traffic data:", error);
      }
    };

    const handleRefresh = () => {
      loadTrafficData();
    };

    const handleCurrentChange = ({ oldValue, newValue }) => {
      console.log(
        "current change: ",
        JSON.stringify(oldValue),
        JSON.stringify(newValue)
      );
      selectedRow.value = newValue;
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
      loadTrafficData();
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
      handleSearch,
      handleCurrentChange,
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
</style>
