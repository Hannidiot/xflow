import type { TableColumn } from "./columns";

export const projectListColumns: TableColumn[] = [
  {
    title: "项目名称",
    field: "projectName",
    width: 180
  },
  {
    title: "状态标签",
    field: "status",
    width: 100,
    align: "center"
  },
  {
    title: "产品类型",
    field: "productType",
    width: 120
  },
  {
    title: "描述",
    field: "description",
    minWidth: 150
  },
  {
    title: "流量抓取",
    field: "trafficCapture",
    width: 100,
    align: "center"
  },
  {
    title: "代理状态",
    field: "proxyStatus",
    width: 100,
    align: "center"
  },
  {
    title: "API数量",
    field: "apiCount",
    width: 100,
    align: "center"
  },
  {
    title: "总流量",
    field: "totalTraffic",
    width: 100,
    align: "center"
  },
  {
    title: "磁盘占用",
    field: "diskUsage",
    width: 110,
    align: "center"
  },
  {
    title: "更新时间",
    field: "updateTime",
    width: 120
  }
];
