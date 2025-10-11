import type {
  ApiDiffItem,
  VulnerabilityDiffItem
} from "@/api/project-comparison";

export const apiDiffColumns = [
  {
    label: "变更类型",
    width: 100,
    align: "center",
    cellRenderer: ({ row }: { row: ApiDiffItem }) => {
      const typeMap = {
        added: { label: "新增", type: "success" },
        removed: { label: "删除", type: "danger" },
        modified: { label: "修改", type: "warning" }
      };

      const config = typeMap[row.diffType];
      return (
        <el-tag type={config.type} size="small">
          {config.label}
        </el-tag>
      );
    }
  },
  {
    label: "API名称",
    prop: "name",
    width: 150,
    align: "left"
  },
  {
    label: "端点",
    prop: "endpoint",
    width: 200,
    align: "left"
  },
  {
    label: "方法",
    width: 80,
    align: "center",
    cellRenderer: ({ row }: { row: ApiDiffItem }) => {
      const methodColors = {
        GET: "success",
        POST: "primary",
        PUT: "warning",
        DELETE: "danger"
      };

      return (
        <el-tag type={methodColors[row.method] || "info"} size="small">
          {row.method}
        </el-tag>
      );
    }
  },
  {
    label: "状态",
    width: 80,
    align: "center",
    cellRenderer: ({ row }: { row: ApiDiffItem }) => {
      return (
        <el-tag
          type={row.status === "Active" ? "success" : "info"}
          size="small"
        >
          {row.status}
        </el-tag>
      );
    }
  },
  {
    label: "响应时间",
    prop: "responseTime",
    width: 100,
    align: "center"
  },
  {
    label: "变更详情",
    width: 200,
    align: "left",
    cellRenderer: ({ row }: { row: ApiDiffItem }) => {
      if (!row.changes || row.changes.length === 0) {
        return <span class="text-gray-400">-</span>;
      }

      return (
        <div class="space-y-1">
          {row.changes.map((change, index) => (
            <div key={index} class="text-xs">
              <span class="font-medium">{change.field}:</span>
              <span class="line-through text-red-500">{change.oldValue}</span>
              <span class="mx-1">→</span>
              <span class="text-green-500">{change.newValue}</span>
            </div>
          ))}
        </div>
      );
    }
  }
];

export const vulnerabilityDiffColumns = [
  {
    label: "变更类型",
    width: 100,
    align: "center",
    cellRenderer: ({ row }: { row: VulnerabilityDiffItem }) => {
      const typeMap = {
        added: { label: "新增", type: "success" },
        removed: { label: "删除", type: "danger" },
        modified: { label: "修改", type: "warning" }
      };

      const config = typeMap[row.diffType];
      return (
        <el-tag type={config.type} size="small">
          {config.label}
        </el-tag>
      );
    }
  },
  {
    label: "严重程度",
    width: 100,
    align: "center",
    cellRenderer: ({ row }: { row: VulnerabilityDiffItem }) => {
      const severityColors = {
        High: "danger",
        Medium: "warning",
        Low: "info"
      };

      return (
        <el-tag type={severityColors[row.severity] || "info"} size="small">
          {row.severity}
        </el-tag>
      );
    }
  },
  {
    label: "漏洞类型",
    prop: "category",
    width: 120,
    align: "left"
  },
  {
    label: "描述",
    prop: "description",
    width: 250,
    align: "left"
  },
  {
    label: "受影响端点",
    prop: "affectedEndpoint",
    width: 150,
    align: "left"
  },
  {
    label: "变更详情",
    width: 200,
    align: "left",
    cellRenderer: ({ row }: { row: VulnerabilityDiffItem }) => {
      if (!row.changes || row.changes.length === 0) {
        return <span class="text-gray-400">-</span>;
      }

      return (
        <div class="space-y-1">
          {row.changes.map((change, index) => (
            <div key={index} class="text-xs">
              <span class="font-medium">{change.field}:</span>
              <span class="line-through text-red-500">{change.oldValue}</span>
              <span class="mx-1">→</span>
              <span class="text-green-500">{change.newValue}</span>
            </div>
          ))}
        </div>
      );
    }
  }
];
