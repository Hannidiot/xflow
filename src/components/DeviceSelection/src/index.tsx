import { getDeviceList } from "@/api/device";
import { cloneDeep, delay } from "@pureadmin/utils";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { getStatusColor, getStatusDescription } from "@/utils/device-status";
import RefreshIcon from "./svg/refresh.svg?component";
import type { TableColumns } from "@pureadmin/table";

const orderList = ["offline", "init", "device"];
const sortByStatus = (row1, row2) => {
  return (
    orderList.indexOf(row2.dev_status) - orderList.indexOf(row1.dev_status)
  );
};

const props = {
  disabled: {
    type: Boolean,
    default: false
  },
  dev_id: {
    type: String,
    default: ""
  },
  show_search: {
    type: Boolean,
    default: false
  },
  addtional_columns: {
    type: Array<TableColumns>,
    default: []
  }
};

export default defineComponent({
  name: "DeviceSelection",
  props,
  emits: ["device-change"],
  setup(props, { emit, expose }) {
    let initializing = true;
    const tableRef = ref();
    const form = reactive({
      dev_id: ""
    });
    const filterId = ref("");
    const loading = ref(false);
    const dataList = ref([]);
    const filteredList = computed(() => {
      if (filterId.value != "") {
        return dataList.value.filter(
          device => device.dev_id.indexOf(filterId.value) >= 0
        );
      }
      return dataList.value;
    });
    const iconClass = computed(() => {
      return [
        "text-black",
        "dark:text-white",
        "duration-100",
        "hover:!text-primary",
        "cursor-pointer",
        "outline-none"
      ];
    });

    const columns: TableColumnList = [
      {
        align: "left",
        width: 100,
        minWidth: 70,
        cellRenderer: ({ row }) => (
          <>
            <el-radio
              label=" "
              v-model={row.selected}
              disabled={row.dev_status == "offline"}
            />
          </>
        )
      },
      {
        label: "设备ID",
        prop: "dev_id"
      },
      {
        label: "设备名",
        cellRenderer: ({ row }) => (
          <>
            <el-text>{row.dev_name ?? "-"}</el-text>
          </>
        )
      },
      {
        label: "连接方式",
        cellRenderer: ({ row }) => (
          <>
            <el-text>{row.dev_type.toUpperCase() ?? "-"}</el-text>
          </>
        )
      },
      {
        headerRenderer: () => (
          <div class="flex items-center">
            <span>设备状态</span>
            <div style="margin-left: 4px">
              <el-tooltip
                effect="dark"
                content="刷新"
                placement="top"
                style="pad-left: 4px"
              >
                <RefreshIcon
                  class={[
                    "w-[16px]",
                    iconClass.value,
                    loading.value ? "animate-spin" : ""
                  ]}
                  onClick={() => onRefreshDeviceList()}
                />
              </el-tooltip>
            </div>
          </div>
        ),
        cellRenderer: ({ row }) => (
          <>
            <div class={["status-circle", getStatusColor(row.dev_status)]} />
            <el-text>{getStatusDescription(row.dev_status)}</el-text>
          </>
        )
      }
    ];

    const columnsExt = computed(() => {
      if (props?.addtional_columns.length != 0) {
        const cloneColumns: TableColumnList = cloneDeep(columns);
        props.addtional_columns.forEach(col => cloneColumns.push(col));
        return cloneColumns;
      }
      return columns;
    });

    const setCurrent = (dev_id: string) => {
      const result = filteredList.value.filter(
        device => device.dev_id == dev_id
      );
      if (result.length > 0) {
        const row = result[0];
        const { setCurrentRow } = tableRef.value.getTableRef();
        setCurrentRow(row);
      }
    };

    const handleCurrentChange = (currentRow, oldCurrentRow) => {
      if (
        (props.disabled && !initializing) ||
        currentRow?.dev_status == "offline"
      )
        return;

      if (currentRow != null) {
        currentRow.selected = " ";
      }
      if (oldCurrentRow != null) {
        oldCurrentRow.selected = "-";
      }
      emit("device-change", currentRow ?? {});
    };

    const onSearch = async () => {
      loading.value = true;
      if (form?.dev_id != undefined && form?.dev_id != "") {
        filterId.value = form.dev_id;
      } else {
        resetSearch();
      }
      delay(500).then(() => (loading.value = false));
    };

    const resetSearch = async () => {
      loading.value = true;
      form.dev_id = "";
      filterId.value = form.dev_id;
      delay(500).then(() => (loading.value = false));
    };

    const onRefreshDeviceList = async () => {
      resetSearch().then(() => loadData());
    };

    const loadData = async () => {
      loading.value = true;
      const { data } = await getDeviceList().then(resp => {
        loading.value = false;
        return resp;
      });
      const tmpList = [];
      data.forEach(device => {
        tmpList.push({
          dev_id: device.dev_id,
          dev_type: device.dev_type,
          dev_status: device.dev_status,
          dev_name: device.dev_name,
          selected: "-"
        });
      });
      tmpList.sort(sortByStatus);
      dataList.value = tmpList;
      emit("device-change", {});
    };

    onMounted(async () => {
      await loadData();
      if (props?.dev_id != "") {
        setCurrent(props.dev_id);
      }
      initializing = false;
    });

    expose({
      onRefreshDeviceList
    });

    return () => (
      <>
        {props.show_search ? (
          <el-form
            ref="formRef"
            v-model={form}
            inline={true}
            disabled={props.disabled}
          >
            <el-form-item label="设备ID" prop="dev_id">
              <el-input v-model={form.dev_id} />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" onClick={() => onSearch()}>
                搜索
              </el-button>
              <el-button onClick={() => resetSearch()}>清空</el-button>
            </el-form-item>
          </el-form>
        ) : (
          <div></div>
        )}
        <el-form disabled={props.disabled}>
          <el-form-item>
            <pure-table
              ref={tableRef}
              data={filteredList.value}
              columns={columnsExt.value}
              loading={loading.value}
              highlight-current-row
              onCurrentChange={(cur, old) => handleCurrentChange(cur, old)}
            />
          </el-form-item>
        </el-form>
      </>
    );
  }
});
