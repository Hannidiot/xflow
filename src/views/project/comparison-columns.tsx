// For DiffTable, we need simple column definitions without renderers
// The DiffTable component handles the comparison highlighting automatically

export const apiDiffColumns: TableColumnList = [
  {
    label: "API名称",
    prop: "name",
    minWidth: 150,
    align: "left"
  },
  {
    label: "端点",
    prop: "endpoint",
    minWidth: 200,
    align: "left"
  },
  {
    label: "方法",
    prop: "method",
    minWidth: 80,
    align: "center"
  },
  {
    label: "状态",
    prop: "status",
    minWidth: 80,
    align: "center"
  },
  {
    label: "响应时间",
    prop: "responseTime",
    minWidth: 100,
    align: "center"
  }
];

export const vulnerabilityDiffColumns: TableColumnList = [
  {
    label: "严重程度",
    prop: "severity",
    minWidth: 100,
    align: "center"
  },
  {
    label: "漏洞类型",
    prop: "category",
    minWidth: 120,
    align: "left"
  },
  {
    label: "描述",
    prop: "description",
    minWidth: 250,
    align: "left"
  },
  {
    label: "受影响端点",
    prop: "affectedEndpoint",
    minWidth: 150,
    align: "left"
  }
];
