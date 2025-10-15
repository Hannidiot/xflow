<template>
  <div class="flex flex-col">
    <!-- Header Section -->
    <div
      class="bg-white p-6 mb-4 border-b border-gray-200 rounded-lg flex items-center justify-between"
    >
      <div class="flex items-center">
        <!-- Back Button -->
        <el-button
          type="primary"
          link
          class="flex items-center"
          @click="handleBack"
        >
          <el-icon><ArrowLeft /></el-icon>
        </el-button>

        <!-- Project Title -->
        <div class="pl-4">
          <h1 class="text-2xl font-bold text-gray-800">{{ projectTitle }}</h1>
        </div>
      </div>

      <!-- Status Block -->
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-600">扫描状态:</span>
        <el-tag
          :type="scanStatus === 'active' ? 'success' : 'warning'"
          size="large"
        >
          {{ scanStatus === "active" ? "活跃" : "非活跃" }}
        </el-tag>
      </div>
    </div>

    <!-- Tabs Section -->
    <div class="flex-1 bg-white rounded-lg shadow-sm">
      <el-tabs v-model="activeTab" type="border-card" class="h-full">
        <el-tab-pane label="项目信息" name="info">
          <ProjectInfoTab :project-id="projectId" />
        </el-tab-pane>

        <el-tab-pane label="扫描配置" name="configuration">
          <ProjectConfigurationTab :project-id="projectId" />
        </el-tab-pane>

        <el-tab-pane label="实时流量监控" name="monitoring">
          <RealtimeMonitoringTab :project-id="projectId" />
        </el-tab-pane>

        <el-tab-pane label="API分析" name="api-analysis">
          <ApiAnalysisTab :project-id="projectId" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useProjectDetail } from "./components/hooks";
import ProjectInfoTab from "./info-tab/index.vue";
import ProjectConfigurationTab from "./configuration-tab/configuration.vue";
import RealtimeMonitoringTab from "../monitoring/index.vue";
import ApiAnalysisTab from "./api-analysis-tab/api-analysis.vue";

// Multi-tab hook
const { getParameter, initToProjectDetail, router } = useProjectDetail();
initToProjectDetail();

// Get projectId from route parameters
const projectId = computed(() => {
  return getParameter.projectId as string;
});

// State
const activeTab = ref("info");
const projectTitle = ref("项目详情");
const scanStatus = ref("active"); // Default to active, should be fetched from API

// Methods
const handleBack = () => {
  router.push({ name: "ProjectList" });
};

// Load project data
const loadProjectData = async () => {
  if (!projectId.value) {
    ElMessage.error("项目ID不存在");
    router.push({ name: "ProjectList" });
    return;
  }

  try {
    // TODO: Fetch project details from API
    // const response = await getProjectDetail(projectId.value)
    // projectTitle.value = response.data.name
    // scanStatus.value = response.data.status

    // For now, set a placeholder title
    projectTitle.value = `项目 ${projectId.value}`;
  } catch (error) {
    console.error("Failed to load project data:", error);
    ElMessage.error("加载项目数据失败");
  }
};

// Lifecycle
onMounted(() => {
  // Initialize multi-tab
  loadProjectData();
});
</script>

<style>
/* Use Tailwind CSS classes instead of scoped CSS */
.el-tabs {
  height: 100%;
}

.el-tabs__content {
  height: calc(100% - 55px);
  padding: 0;
}

.el-tab-pane {
  height: 100%;
  padding: 0;
}
</style>
