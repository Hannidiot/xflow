<template>
  <div class="h-full">
    <!-- Header Section -->
    <div class="p-6 bg-white border-b border-gray-200 rounded-lg mb-4">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">项目对比</h1>
      <p class="text-sm text-gray-600">
        Compare details and configurations between two projects
      </p>
    </div>

    <!-- Project Selection Section -->
    <div class="p-4 bg-white rounded-lg shadow-sm mb-4">
      <el-form :inline="true" class="m-0">
        <el-form-item label="项目 A" class="mb-0">
          <el-select
            v-model="selectedProjectA"
            placeholder="Select Project A"
            clearable
            filterable
            class="w-48"
            @change="handleProjectSelection"
          >
            <el-option
              v-for="project in projectOptions"
              :key="project.id"
              :label="project.projectName"
              :value="project.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目 B" class="mb-0">
          <el-select
            v-model="selectedProjectB"
            placeholder="Select Project B"
            clearable
            filterable
            class="w-48"
            @change="handleProjectSelection"
          >
            <el-option
              v-for="project in projectOptions"
              :key="project.id"
              :label="project.projectName"
              :value="project.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="mb-0">
          <el-button
            type="primary"
            :disabled="!canCompare"
            :loading="loading"
            @click="handleCompare"
          >
            Compare
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- Comparison Results Section -->
    <div v-if="comparisonResult">
      <!-- Project Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="p-4 bg-white rounded-lg shadow-sm">
          <h3 class="text-lg font-bold text-gray-900 mb-3">
            {{ comparisonResult.projectA.projectName }}
          </h3>
          <div class="space-y-2">
            <div class="flex items-center">
              <span class="font-medium text-gray-600 w-20">状态:</span>
              <el-tag
                :type="
                  comparisonResult.projectA.status === 'active'
                    ? 'success'
                    : 'info'
                "
              >
                {{
                  comparisonResult.projectA.status === "active"
                    ? "活跃"
                    : "非活跃"
                }}
              </el-tag>
            </div>
            <div class="flex items-center">
              <span class="font-medium text-gray-600 w-20">产品类型:</span>
              <span>{{ comparisonResult.projectA.productType }}</span>
            </div>
            <div class="flex items-center">
              <span class="font-medium text-gray-600 w-20">API数量:</span>
              <span>{{ comparisonResult.projectA.apiCount }}</span>
            </div>
            <div class="flex items-center">
              <span class="font-medium text-gray-600 w-20">总流量:</span>
              <span>{{ comparisonResult.projectA.totalTraffic }}</span>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white rounded-lg shadow-sm">
          <h3 class="text-lg font-bold text-gray-900 mb-3">
            {{ comparisonResult.projectB.projectName }}
          </h3>
          <div class="space-y-2">
            <div class="flex items-center">
              <span class="font-medium text-gray-600 w-20">状态:</span>
              <el-tag
                :type="
                  comparisonResult.projectB.status === 'active'
                    ? 'success'
                    : 'info'
                "
              >
                {{
                  comparisonResult.projectB.status === "active"
                    ? "活跃"
                    : "非活跃"
                }}
              </el-tag>
            </div>
            <div class="flex items-center">
              <span class="font-medium text-gray-600 w-20">产品类型:</span>
              <span>{{ comparisonResult.projectB.productType }}</span>
            </div>
            <div class="flex items-center">
              <span class="font-medium text-gray-600 w-20">API数量:</span>
              <span>{{ comparisonResult.projectB.apiCount }}</span>
            </div>
            <div class="flex items-center">
              <span class="font-medium text-gray-600 w-20">总流量:</span>
              <span>{{ comparisonResult.projectB.totalTraffic }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- API Comparison -->
      <div class="mb-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4">API Comparison</h3>
        <DiffTable
          :data-group="[
            comparisonResult.apiDiff.projectA,
            comparisonResult.apiDiff.projectB
          ]"
          :columns="apiDiffColumns"
          unique-key="id"
          class="space-x-4"
        />
      </div>

      <!-- Vulnerability Comparison -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-900">
            Vulnerability Comparison
          </h3>
        </div>
        <el-collapse-transition>
          <div>
            <DiffTable
              :data-group="[
                comparisonResult.vulnerabilityDiff.projectA,
                comparisonResult.vulnerabilityDiff.projectB
              ]"
              :columns="vulnerabilityDiffColumns"
              unique-key="id"
              class="space-x-4"
            />
          </div>
        </el-collapse-transition>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!loading"
      class="flex items-center justify-center p-20 bg-white rounded-lg shadow-sm"
    >
      <div class="text-center">
        <el-icon size="64" color="#c0c4cc">
          <DocumentCopy />
        </el-icon>
        <p class="mt-4 text-gray-500">请选择两个项目进行对比</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { DocumentCopy } from "@element-plus/icons-vue";
import {
  getProjectOptions,
  compareProjects,
  type ProjectComparisonResponse,
  type DiffType
} from "@/api/project-comparison";
import type { ProjectItem } from "@/api/project-list";
import { apiDiffColumns, vulnerabilityDiffColumns } from "./comparison-columns";
import { DiffTable } from "@/components/DiffTable";

// State
const selectedProjectA = ref<string>("");
const selectedProjectB = ref<string>("");
const projectOptions = ref<ProjectItem[]>([]);
const comparisonResult = ref<ProjectComparisonResponse | null>(null);
const loading = ref<boolean>(false);

// Computed
const canCompare = computed(() => {
  return (
    selectedProjectA.value &&
    selectedProjectB.value &&
    selectedProjectA.value !== selectedProjectB.value
  );
});

// Methods
const loadProjectOptions = async () => {
  try {
    const response = await getProjectOptions();
    if (response.code === "200") {
      projectOptions.value = response.data.data;
    }
  } catch (error) {
    console.error("Failed to load project options:", error);
    ElMessage.error("加载项目列表失败");
  }
};

const handleProjectSelection = () => {
  if (
    selectedProjectA.value &&
    selectedProjectB.value &&
    selectedProjectA.value === selectedProjectB.value
  ) {
    ElMessage.warning("请选择两个不同的项目进行对比");
    selectedProjectB.value = "";
  }
};

const handleCompare = async () => {
  if (!canCompare.value) return;

  loading.value = true;
  comparisonResult.value = null;

  try {
    const response = await compareProjects({
      projectAId: selectedProjectA.value,
      projectBId: selectedProjectB.value
    });

    if (response.code === "200") {
      comparisonResult.value = response.data;
      ElMessage.success("对比完成");
    } else {
      ElMessage.error(response.err_msg || "对比失败");
    }
  } catch (error) {
    console.error("Failed to compare projects:", error);
    ElMessage.error("对比失败");
  } finally {
    loading.value = false;
  }
};

const getRowStyle = ({ row }: { row: { diffType: DiffType } }) => {
  const styleMap = {
    added: "background-color: #f0f9eb;",
    removed: "background-color: #fef0f0;",
    modified: "background-color: #fdf6ec;"
  };

  return styleMap[row.diffType] || "";
};

// Lifecycle
onMounted(() => {
  loadProjectOptions();
});
</script>
