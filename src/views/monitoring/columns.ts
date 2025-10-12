import type { TableColumn } from "@/views/project/columns";

export const monitoringTableColumns: TableColumn[] = [
  {
    title: "Method",
    field: "method",
    minWidth: 80
  },
  {
    title: "URL",
    field: "url",
    minWidth: 300
  },
  {
    title: "Protocol",
    field: "protocol",
    minWidth: 100
  },
  {
    title: "Status",
    field: "statusCode",
    minWidth: 100
  },
  {
    title: "Status Text",
    field: "statusText",
    minWidth: 120
  },
  {
    title: "Size",
    field: "size",
    minWidth: 100
  },
  {
    title: "Time",
    field: "time",
    minWidth: 80
  },
  {
    title: "Content Type",
    field: "contentType",
    minWidth: 150
  },
  {
    title: "Timestamp",
    field: "timestamp",
    minWidth: 180
  }
];
