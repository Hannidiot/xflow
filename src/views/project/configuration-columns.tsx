import type { TableColumnList } from "@pureadmin/table";

export const deviceColumns: TableColumnList = [
  {
    label: "选择",
    prop: "selected",
    width: 80,
    align: "center",
    cellRenderer: ({ row }) => (
      <el-radio
        modelValue={row.selected}
        onChange={() => {
          // Selection will be handled in the parent component
        }}
      />
    )
  },
  {
    label: "设备名称",
    prop: "name",
    minWidth: 150,
    align: "left"
  },
  {
    label: "IP地址",
    prop: "ipAddress",
    minWidth: 120,
    align: "center"
  },
  {
    label: "状态",
    prop: "status",
    minWidth: 100,
    align: "center",
    cellRenderer: ({ row }) => {
      const statusMap = {
        online: { type: "success", text: "在线" },
        offline: { type: "danger", text: "离线" },
        unknown: { type: "warning", text: "未知" }
      };

      const status = statusMap[row.status] || statusMap.unknown;

      return (
        <el-tag type={status.type} size="small">
          {status.text}
        </el-tag>
      );
    }
  },
  {
    label: "最后在线",
    prop: "lastSeen",
    minWidth: 150,
    align: "center"
  },
  {
    label: "操作",
    prop: "operations",
    width: 120,
    align: "center",
    cellRenderer: ({ _ }) => (
      <el-button
        type="primary"
        size="small"
        onClick={() => {
          // Test connection will be handled in the parent component
        }}
      >
        测试连接
      </el-button>
    )
  }
];
