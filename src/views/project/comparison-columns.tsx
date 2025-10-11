// For DiffTable, we need simple column definitions without renderers
// The DiffTable component handles the comparison highlighting automatically

export const apiDiffColumns: TableColumnList = [
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
    prop: "method",
    width: 80,
    align: "center"
  },
  {
    label: "状态",
    prop: "status",
    width: 80,
    align: "center"
  },
  {
    label: "响应时间",
    prop: "responseTime",
    width: 100,
    align: "center"
  }
];

export const vulnerabilityDiffColumns: TableColumnList = [
  {
    label: "严重程度",
    prop: "severity",
    width: 100,
    align: "center"
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
  }
];
