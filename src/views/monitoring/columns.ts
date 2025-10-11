import type { TableColumn } from "@/views/project/columns";

export const monitoringTableColumns: TableColumn[] = [
  {
    title: "Method",
    field: "method",
    width: 80
  },
  {
    title: "URL",
    field: "url",
    width: 300
  },
  {
    title: "Protocol",
    field: "protocol",
    width: 100
  },
  {
    title: "Status",
    field: "statusCode",
    width: 100
  },
  {
    title: "Status Text",
    field: "statusText",
    width: 120
  },
  {
    title: "Size",
    field: "size",
    width: 100
  },
  {
    title: "Time",
    field: "time",
    width: 80
  },
  {
    title: "Content Type",
    field: "contentType",
    width: 150
  },
  {
    title: "Timestamp",
    field: "timestamp",
    width: 180
  }
];
