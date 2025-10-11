import type { VxeColumnPropTypes } from "vxe-table";

export interface TableColumn {
  title: string;
  field: string;
  width?: number;
  minWidth?: number;
  type?: VxeColumnPropTypes.Type;
  align?: VxeColumnPropTypes.Align;
  fixed?: VxeColumnPropTypes.Fixed;
  sortable?: boolean;
  resizable?: boolean;
}

export const apiTableColumns: TableColumn[] = [
  {
    title: "API Name",
    field: "name",
    width: 200
  },
  {
    title: "Endpoint",
    field: "endpoint",
    width: 300
  },
  {
    title: "Method",
    field: "method",
    width: 100
  },
  {
    title: "Status",
    field: "status",
    width: 100
  },
  {
    title: "Response Time",
    field: "responseTime",
    width: 120
  },
  {
    title: "Last Updated",
    field: "lastUpdated",
    width: 180
  },
  {
    title: "Usage Count",
    field: "usageCount",
    width: 120
  }
];
