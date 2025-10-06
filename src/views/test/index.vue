<template>
  <div class="h-full flex flex-col">
    <!-- Search Bar Section -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-4">
        <el-input
          v-model="searchQuery"
          placeholder="搜索测试数据..."
          clearable
          class="flex-1"
          @input="handleSearch"
        >
          <template #prefix>
            <el-icon><SearchIcon /></el-icon>
          </template>
        </el-input>

        <el-select
          v-model="selectedCategory"
          placeholder="分类"
          clearable
          @change="handleFilterChange"
        >
          <el-option label="前端" value="frontend" />
          <el-option label="后端" value="backend" />
          <el-option label="数据库" value="database" />
          <el-option label="测试" value="testing" />
        </el-select>

        <el-select
          v-model="selectedStatus"
          placeholder="状态"
          clearable
          @change="handleFilterChange"
        >
          <el-option label="成功" value="success" />
          <el-option label="失败" value="failed" />
          <el-option label="进行中" value="running" />
          <el-option label="待处理" value="pending" />
        </el-select>
      </div>
    </div>

    <!-- Table Section -->
    <div class="flex-1 p-4">
      <vxe-grid
        ref="vxeTableRef"
        show-overflow
        height="auto"
        :column-config="{ resizable: true }"
        :scroll-y="{ enabled: true }"
        :columns="tableColumns"
        :data="filteredData"
        @cell-click="handleCellClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { Search as SearchIcon } from "@element-plus/icons-vue";

interface TestRecord {
  id: string;
  name: string;
  category: string;
  status: string;
  priority: string;
  duration: string;
  createdAt: string;
  description: string;
  author: string;
}

export default defineComponent({
  name: "TestTable",
  components: {
    SearchIcon
  },
  setup() {
    // State
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const selectedStatus = ref("");
    const selectedRow = ref<TestRecord | null>(null);
    const vxeTableRef = ref();

    // Mock data
    const mockData = ref<TestRecord[]>([]);

    // Generate mock data
    const generateMockData = () => {
      const categories = ["frontend", "backend", "database", "testing"];
      const statuses = ["success", "failed", "running", "pending"];
      const priorities = ["high", "medium", "low"];
      const authors = ["张三", "李四", "王五", "赵六", "钱七"];

      const data: TestRecord[] = [];

      for (let i = 0; i < 50; i++) {
        const category =
          categories[Math.floor(Math.random() * categories.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const priority =
          priorities[Math.floor(Math.random() * priorities.length)];
        const author = authors[Math.floor(Math.random() * authors.length)];

        data.push({
          id: `test-${i + 1}`,
          name: `测试用例 ${i + 1}`,
          category,
          status,
          priority,
          duration: `${Math.floor(Math.random() * 120) + 1}秒`,
          createdAt: new Date(
            Date.now() - Math.random() * 86400000 * 7
          ).toISOString(),
          description: `这是测试用例 ${i + 1} 的描述信息，用于演示表格功能`,
          author
        });
      }

      return data;
    };

    // Table columns for VxeTable
    const tableColumns = ref([
      {
        title: "ID",
        field: "id",
        width: 100
      },
      {
        title: "名称",
        field: "name",
        width: 200
      },
      {
        title: "分类",
        field: "category",
        width: 120
      },
      {
        title: "状态",
        field: "status",
        width: 100
      },
      {
        title: "优先级",
        field: "priority",
        width: 100
      },
      {
        title: "耗时",
        field: "duration",
        width: 80
      },
      {
        title: "创建时间",
        field: "createdAt",
        width: 180
      },
      {
        title: "描述",
        field: "description",
        width: 300
      },
      {
        title: "作者",
        field: "author",
        width: 100
      }
    ]);

    // Computed
    const filteredData = computed(() => {
      let filtered = mockData.value;

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          item =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.author.toLowerCase().includes(query)
        );
      }

      if (selectedCategory.value) {
        filtered = filtered.filter(
          item => item.category === selectedCategory.value
        );
      }

      if (selectedStatus.value) {
        filtered = filtered.filter(
          item => item.status === selectedStatus.value
        );
      }

      return filtered;
    });

    // Methods
    const handleSearch = () => {
      // Search is handled reactively by computed property
    };

    const handleFilterChange = () => {
      // Filtering is handled reactively by computed property
    };

    const handleCellClick = ({ row }: { row: TestRecord }) => {
      selectedRow.value = row;
      console.log("Selected row:", row);
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
      selectedCategory,
      selectedStatus,
      selectedRow,
      vxeTableRef,
      tableColumns,
      filteredData,
      handleSearch,
      handleFilterChange,
      handleCellClick
    };
  }
});
</script>

<style scoped>
.selected-row {
  border-left: 4px solid rgb(59 130 246);
}
</style>
