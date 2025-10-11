<template>
  <div class="h-full flex flex-col">
    <!-- Main Content with Splitter -->
    <div class="flex-1">
      <!-- Project Information Block -->
      <div
        class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div class="space-y-6">
          <!-- Header -->
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Project Dashboard
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Monitor your project metrics and API performance
            </p>
          </div>

          <!-- Project Metadata -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Project Name -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Project Name
              </label>
              <div class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ projectInfo.name }}
              </div>
            </div>

            <!-- Disk Usage -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Disk Usage
              </label>
              <div class="flex items-center space-x-3">
                <el-progress
                  :percentage="diskUsage.percentage"
                  :color="diskUsage.color"
                  :show-text="false"
                  class="flex-1"
                />
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ diskUsage.used }} / {{ diskUsage.total }}
                </span>
              </div>
            </div>

            <!-- Status -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Status
              </label>
              <el-tag
                :type="projectInfo.status === 'Active' ? 'success' : 'warning'"
                size="large"
              >
                {{ projectInfo.status }}
              </el-tag>
            </div>

            <!-- Created Date -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Created Date
              </label>
              <div class="text-gray-900 dark:text-white">
                {{ formatDate(projectInfo.createdAt) }}
              </div>
            </div>

            <!-- Last Updated -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last Updated
              </label>
              <div class="text-gray-900 dark:text-white">
                {{ formatDate(projectInfo.updatedAt) }}
              </div>
            </div>

            <!-- API Count -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Total APIs
              </label>
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {{ apiList.length }}
              </div>
            </div>
          </div>

          <!-- Project Description -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <div
              class="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
            >
              {{ projectInfo.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- API List Block -->
      <div>
        <VxeTableBar
          :vxeTableRef="vxeTableRef"
          :columns="tableColumns"
          title="API List"
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
              :data="apiList"
            />
          </template>
        </VxeTableBar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { VxeTableBar } from "@/components/ReVxeTableBar";
import {
  getProjectInfo,
  getProjectDiskUsage,
  getProjectApiList,
  type ProjectInfo,
  type DiskUsage,
  type ApiItem
} from "@/api/project";
import { apiTableColumns } from "./columns";

export default defineComponent({
  name: "ProjectInfo",
  components: {
    VxeTableBar
  },
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // State
    const vxeTableRef = ref();
    const projectInfo = ref<ProjectInfo>({
      name: "",
      description: "",
      status: "",
      createdAt: "",
      updatedAt: ""
    });

    const diskUsage = ref<DiskUsage>({
      used: "",
      total: "",
      percentage: 0,
      color: "#409EFF"
    });

    const apiList = ref<ApiItem[]>([]);

    // Table columns
    const tableColumns = ref(apiTableColumns);

    // Computed
    const tableHeight = computed(() => {
      return window.innerHeight - 500;
    });

    // Methods
    const handleRefresh = () => {
      loadAllData();
    };

    const formatDate = (dateString: string): string => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };

    const loadProjectInfo = async () => {
      try {
        const response = await getProjectInfo({ projectId: props.projectId });
        if (response.code === "200") {
          projectInfo.value = response.data;
        }
      } catch (error) {
        console.error("Failed to load project info:", error);
      }
    };

    const loadDiskUsage = async () => {
      try {
        const response = await getProjectDiskUsage({
          projectId: props.projectId
        });
        if (response.code === "200") {
          diskUsage.value = response.data;
        }
      } catch (error) {
        console.error("Failed to load disk usage:", error);
      }
    };

    const loadApiList = async () => {
      try {
        const response = await getProjectApiList({
          projectId: props.projectId
        });
        if (response.code === "200") {
          apiList.value = response.data;
        }
      } catch (error) {
        console.error("Failed to load API list:", error);
      }
    };

    const loadAllData = async () => {
      await Promise.all([loadProjectInfo(), loadDiskUsage(), loadApiList()]);
    };

    // Lifecycle
    onMounted(() => {
      loadAllData();
    });

    return {
      vxeTableRef,
      projectInfo,
      diskUsage,
      apiList,
      tableColumns,
      tableHeight,
      handleRefresh,
      formatDate
    };
  }
});
</script>

<style scoped>
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
