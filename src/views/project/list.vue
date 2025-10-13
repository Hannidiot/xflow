<template>
  <div class="h-full">
    <!-- Header Section -->
    <div class="bg-white p-6 mb-4 border-b border-gray-200 rounded-lg">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">项目管理</h1>
      <p class="text-sm text-gray-600">管理和监控您的流量分析项目</p>
    </div>

    <!-- Search/Filter Section -->
    <div
      class="bg-white p-6 mb-4 rounded-lg shadow-sm flex items-center justify-between"
    >
      <el-form :inline="true" :model="searchForm">
        <el-form-item class="min-w-[150px]">
          <el-input
            v-model="searchForm.projectName"
            placeholder="请输入项目名称"
            clearable
          />
        </el-form-item>
        <el-form-item class="min-w-[150px]">
          <el-select
            v-model="searchForm.productType"
            placeholder="请选择产品"
            clearable
          >
            <el-option
              v-for="type in productTypes"
              :key="type._id"
              :label="type.name"
              :value="type.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="min-w-[150px]">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
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
      <div class="ml-3">
        <el-button type="primary" @click="handleCreate">
          <el-icon><Plus /></el-icon>
          创建项目
        </el-button>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <el-table
        :data="tableData"
        class="w-full text-sm"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="name" label="项目名称" width="180">
          <template #default="{ row }">
            <el-link type="primary" @click="handleDetail(row)">
              {{ row.name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="状态标签" width="100" align="center">
          <template>
            <el-tag type="success"> 活跃 </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="产品类型" width="120">
          <template #default="{ row }">
            {{ row.type || "未设置" }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="150" />
        <el-table-column label="更新时间" width="120">
          <template #default="{ row }">
            {{ formatDate(row.updated_at) }}
          </template>
        </el-table-column>
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
      <div class="flex justify-end mt-4">
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
import { ref, reactive, onMounted, h } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getProjects,
  createProject,
  deleteProject,
  getProjectTypes,
  type Project,
  type ProjectType,
  type CreateProjectRequest
} from "@/api/projects";
import { addDialog } from "@/components/ReDialog";
import CreateProjectForm from "./components/create-project-form.vue";
import { message } from "@/utils/message";

// Type definitions
interface SearchForm {
  projectName: string;
  productType: string;
  status: string;
}

interface Pagination {
  currentPage: number;
  pageSize: number;
  total: number;
}

// State
const searchForm = reactive<SearchForm>({
  projectName: "",
  productType: "",
  status: ""
});

const tableData = ref<Project[]>([]);
const selectedRows = ref<Project[]>([]);
const productTypes = ref<ProjectType[]>([]);

const pagination = reactive<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: 0
});

// Methods
const loadTableData = async () => {
  try {
    const response = await getProjects({
      page: pagination.currentPage,
      per_page: pagination.pageSize,
      type: searchForm.productType || undefined
    });

    if (response.code === "200") {
      tableData.value = response.data.projects;
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

const formRef = ref();

const handleCreate = () => {
  addDialog({
    title: "创建项目",
    props: {
      formInline: {
        name: "",
        description: "",
        type: ""
      },
      productTypes: productTypes.value
    },
    width: "40%",
    draggable: true,
    closeOnClickModal: false,
    contentRenderer: () => h(CreateProjectForm, { ref: formRef }),
    beforeSure: async (done, { options }) => {
      const FormRef = formRef.value.getRef();
      const curData = options.props.formInline as CreateProjectRequest;

      async function chores() {
        try {
          await createProject(curData);
          ElMessage.success("创建项目成功");
          loadTableData();
          done(); // 关闭弹框
        } catch (error) {
          console.error("Failed to create project:", error);
          ElMessage.error("创建项目失败");
        }
      }

      FormRef.validate(async (valid: boolean) => {
        if (valid) {
          await chores();
        }
      });
    }
  });
};

const handleSelectionChange = (selection: Project[]) => {
  selectedRows.value = selection;
};

const handleDetail = (row: Project) => {
  ElMessage.info(`查看详情: ${row.name}`);
  // Navigate to detail page
};

const handleEdit = (row: Project) => {
  ElMessage.info(`编辑项目: ${row.name}`);
  // Navigate to edit page or open dialog
};

const handleDelete = async (row: Project) => {
  try {
    await ElMessageBox.confirm(`确定要删除项目 "${row.name}" 吗?`, "确认删除", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    });

    await deleteProject(row._id);
    message("删除成功");
    loadTableData();
  } catch (error) {
    if (error !== "cancel") {
      console.error("Failed to delete project:", error);
      message("删除项目失败", { type: "error" });
    }
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN");
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

// Load product types
const loadProductTypes = async () => {
  try {
    const response = await getProjectTypes();
    if (response.code === "200") {
      productTypes.value = response.data;
    }
  } catch (error) {
    console.error("Failed to load product types:", error);
    ElMessage.error("加载产品类型失败");
  }
};

// Lifecycle
onMounted(() => {
  loadTableData();
  loadProductTypes();
});
</script>
