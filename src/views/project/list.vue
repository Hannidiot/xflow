<template>
  <div class="h-dvh">
    <!-- Header Section -->
    <div class="header-section">
      <h1 class="page-title">项目管理</h1>
      <p class="page-subtitle">管理和监控您的流量分析项目</p>
    </div>

    <!-- Search/Filter Section -->
    <div class="search-section">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item>
          <el-input
            v-model="searchForm.projectName"
            placeholder="请输入项目名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.productType"
            placeholder="请选择产品"
            clearable
            style="width: 160px"
          >
            <el-option label="电商平台" value="ecommerce" />
            <el-option label="移动应用" value="mobile" />
            <el-option label="企业系统" value="enterprise" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
            style="width: 140px"
          >
            <el-option label="活跃" value="active" />
            <el-option label="非活跃" value="inactive" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="create-button">
        <el-button type="primary" @click="handleCreate">
          <el-icon><Plus /></el-icon>
          创建项目
        </el-button>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-section">
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="projectName" label="项目名称" width="180">
          <template #default="{ row }">
            <el-link type="primary" @click="handleDetail(row)">
              {{ row.projectName }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态标签"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status === "active" ? "活跃" : "非活跃" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="productType" label="产品类型" width="120" />
        <el-table-column prop="description" label="描述" min-width="150" />
        <el-table-column
          prop="trafficCapture"
          label="流量抓取"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-switch
              v-model="row.trafficCapture"
              @change="handleTrafficCaptureChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="proxyStatus"
          label="代理状态"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag
              :type="row.proxyStatus === 'running' ? 'success' : 'danger'"
            >
              {{ row.proxyStatus === "running" ? "运行中" : "已停止" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="apiCount"
          label="API数量"
          width="100"
          align="center"
        />
        <el-table-column
          prop="totalTraffic"
          label="总流量"
          width="100"
          align="center"
        />
        <el-table-column
          prop="diskUsage"
          label="磁盘占用"
          width="110"
          align="center"
        />
        <el-table-column prop="updateTime" label="更新时间" width="120" />
        <el-table-column label="操作" width="200" fixed="right" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              size="small"
              @click="handleDetail(row)"
            >
              <el-icon><View /></el-icon>
              详情
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click="handleEdit(row)"
            >
              <el-icon><Edit /></el-icon>
              编辑
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click="handleDelete(row)"
            >
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div class="pagination-section">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getProjectList,
  updateTrafficCapture,
  deleteProject,
  type ProjectItem,
  type SearchForm,
  type Pagination
} from "@/api/project-list";
import { projectListColumns } from "./list-columns";

// State
const searchForm = reactive<SearchForm>({
  projectName: "",
  productType: "",
  status: ""
});

const tableData = ref<ProjectItem[]>([]);
const selectedRows = ref<ProjectItem[]>([]);

const pagination = reactive<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: 0
});

// Methods
const loadTableData = async () => {
  try {
    const response = await getProjectList({
      projectName: searchForm.projectName,
      productType: searchForm.productType,
      status: searchForm.status,
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize
    });

    if (response.code === "200") {
      tableData.value = response.data.data;
      pagination.total = response.data.pagination.total;
    }
  } catch (error) {
    console.error("Failed to load project list:", error);
    ElMessage.error("加载项目列表失败");
  }
};

const handleSearch = () => {
  pagination.currentPage = 1;
  loadTableData();
};

const handleReset = () => {
  searchForm.projectName = "";
  searchForm.productType = "";
  searchForm.status = "";
  pagination.currentPage = 1;
  loadTableData();
  ElMessage.info("已重置搜索条件");
};

const handleCreate = () => {
  ElMessage.info("创建项目功能待实现");
  // Navigate to create page or open dialog
};

const handleSelectionChange = (selection: ProjectItem[]) => {
  selectedRows.value = selection;
};

const handleTrafficCaptureChange = async (row: ProjectItem) => {
  try {
    await updateTrafficCapture({
      id: row.id,
      trafficCapture: row.trafficCapture
    });
    ElMessage.success(
      `已${row.trafficCapture ? "开启" : "关闭"}流量抓取: ${row.projectName}`
    );
  } catch (error) {
    console.error("Failed to update traffic capture:", error);
    ElMessage.error("更新流量抓取状态失败");
    // Revert the change on error
    row.trafficCapture = !row.trafficCapture;
  }
};

const handleDetail = (row: ProjectItem) => {
  ElMessage.info(`查看详情: ${row.projectName}`);
  // Navigate to detail page
};

const handleEdit = (row: ProjectItem) => {
  ElMessage.info(`编辑项目: ${row.projectName}`);
  // Navigate to edit page or open dialog
};

const handleDelete = async (row: ProjectItem) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除项目 "${row.projectName}" 吗?`,
      "确认删除",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }
    );

    await deleteProject({ id: row.id });
    ElMessage.success("删除成功");
    loadTableData();
  } catch (error) {
    if (error !== "cancel") {
      console.error("Failed to delete project:", error);
      ElMessage.error("删除项目失败");
    } else {
      ElMessage.info("已取消删除");
    }
  }
};

const handleSizeChange = (size: number) => {
  pagination.pageSize = size;
  pagination.currentPage = 1;
  loadTableData();
};

const handleCurrentChange = (page: number) => {
  pagination.currentPage = page;
  loadTableData();
};

// Lifecycle
onMounted(() => {
  loadTableData();
});
</script>

<style scoped lang="scss">
// Responsive
@media (width <= 1199px) {
  .search-section {
    flex-direction: column;
    align-items: flex-start;

    .search-form {
      width: 100%;
      margin-bottom: 12px;
    }

    .create-button {
      margin-left: 0;
    }
  }
}

@media (width <= 767px) {
  .project-list-page {
    padding: 12px;
  }

  .header-section {
    padding: 16px;
  }

  .search-section {
    padding: 12px;

    .search-form {
      :deep(.el-form-item) {
        display: block;
        margin-bottom: 8px;

        .el-input,
        .el-select {
          width: 100% !important;
        }
      }
    }
  }

  .table-section {
    overflow-x: auto;
  }
}

.header-section {
  padding: 24px;
  margin-bottom: 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
  border-radius: 8px;

  .page-title {
    margin: 0 0 8px;
    font-size: 24px;
    font-weight: bold;
    color: #303133;
  }

  .page-subtitle {
    margin: 0;
    font-size: 14px;
    color: #606266;
  }
}

.search-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  margin-bottom: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 5%);

  .search-form {
    flex: 1;
    margin: 0;

    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }

  .create-button {
    margin-left: 12px;
  }
}

.table-section {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 5%);

  :deep(.el-table) {
    font-size: 14px;

    .el-table__header-wrapper {
      th {
        font-weight: bold;
        background-color: #f8f8f8;
      }
    }

    .el-table__row {
      &:hover {
        background-color: #f5f7fa;
      }
    }

    .cell {
      padding: 12px;
    }
  }
}

.pagination-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
