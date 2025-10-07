<template>
  <div id="test" ref="testRef" class="h-dvh">
    <ReSplitPane
      ref="splitPaneRef"
      :split-set="settingTB"
      :height="sectionHeight"
    >
      <template #paneL>
        <PureTableBar title="测试用例列表" :columns="tableColumns">
          <template v-slot="{ size, dynamicColumns }">
            <pure-table
              row-key="id"
              align-whole="center"
              table-layout="auto"
              :height="tableHeight"
              :data="mockData"
              :size="size"
              :columns="dynamicColumns"
            />
          </template>
        </PureTableBar>
      </template>

      <template #paneR>
        <div class="demo-panel">
          <h2 class="text-2xl font-bold">测试用例列表面板</h2>
        </div>
      </template>
    </ReSplitPane>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, reactive } from "vue";
import { PureTableBar } from "@/components/RePureTableBar";
import ReSplitPane, { ContextProps } from "@/components/ReSplitPane";

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
    PureTableBar,
    ReSplitPane
  },
  setup() {
    // State
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const selectedStatus = ref("");
    const selectedRow = ref<TestRecord | null>(null);
    const testRef = ref<HTMLElement | null>(null);
    const splitPaneRef = ref<InstanceType<typeof ReSplitPane> | null>(null);
    const settingTB: ContextProps = reactive({
      minPercent: 35,
      defaultPercent: 70,
      split: "horizontal"
    });

    // Mock data
    const mockData = ref<TestRecord[]>([]);

    // Generate mock data
    const generateMockData = () => {
      const categories = ["frontend", "backend", "database", "testing"];
      const statuses = ["success", "failed", "running", "pending"];
      const priorities = ["high", "medium", "low"];
      const authors = ["张三", "李四", "王五", "赵六", "钱七"];

      const data: TestRecord[] = [];

      for (let i = 0; i < 30; i++) {
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
        label: "ID",
        prop: "id",
        width: 100
      },
      {
        label: "名称",
        prop: "name",
        width: 200
      },
      {
        label: "分类",
        prop: "category",
        width: 120
      },
      {
        label: "状态",
        prop: "status",
        width: 100
      },
      {
        label: "优先级",
        prop: "priority",
        width: 100
      },
      {
        label: "耗时",
        prop: "duration",
        width: 80
      },
      {
        label: "创建时间",
        prop: "createdAt",
        width: 180
      },
      {
        label: "描述",
        prop: "description",
        width: 300
      },
      {
        label: "作者",
        prop: "author",
        width: 100
      }
    ]);

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

    const sectionHeight = computed(() => {
      if (testRef.value) {
        let height = 0.85 * testRef.value.clientHeight - 100; // Adjust 100px for header and padding
        console.log("Calculated section height:", height);

        return height;
      }
      return 600; // Default height
    });

    const tableHeight = computed(() => {
      if (splitPaneRef.value) {
        let height =
          ((splitPaneRef.value.percent as number) / 100) *
          (0.95 * testRef.value!.clientHeight - 100); // Adjust 100px for header and padding

        console.log("Calculated table height:", height);
        return height;
      }
      return 500;
    });

    // Lifecycle
    onMounted(() => {
      mockData.value = generateMockData();
      // Select first row by default
      if (mockData.value.length > 0) {
        selectedRow.value = mockData.value[0];
      }
      console.log("Initial testRef height:", testRef.value.clientHeight);
    });

    return {
      searchQuery,
      selectedCategory,
      selectedStatus,
      selectedRow,
      tableColumns,
      settingTB,
      sectionHeight,
      tableHeight,
      testRef,
      splitPaneRef,
      mockData,
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

.demo-panel {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
