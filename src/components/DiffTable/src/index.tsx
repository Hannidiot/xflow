import { defineComponent, computed, ref } from "vue";
import type { TableColumns } from "@pureadmin/table";

function deepClone(val: any) {
  // 看需求要不要做深拷贝
  return val;
}

const props = {
  uniqueKey: {
    type: String,
    default: "id"
  },
  dataGroup: {
    type: Array,
    validator: (val: any[]) => val.length === 2
  },
  columns: {
    type: Array as () => TableColumns[],
    required: true
  }
};

export default defineComponent({
  name: "DiffTable",
  props,
  setup(props) {
    const DIFF_CELL_KEY = "__diffCells__";
    const COMPLETED_KEY = "__completed__";
    const cacheMap = ref(new Map());

    const completedData = computed(() => {
      const _dataGroup = deepClone(props.dataGroup);
      const _cacheMap = new Map();

      for (const _row of _dataGroup[0]) {
        _row[DIFF_CELL_KEY] = [];
        _cacheMap.set(_row[props.uniqueKey], _row);
      }

      for (const _row of _dataGroup[1]) {
        for (const { prop } of props.columns) {
          if (prop === props.uniqueKey) continue;
          const original = _cacheMap.get(_row[props.uniqueKey]);
          if (!original) continue;
          _row[COMPLETED_KEY] = true;
          original[COMPLETED_KEY] = true;
          if (_row[prop] !== original[prop]) {
            original[DIFF_CELL_KEY].push(prop);
          }
        }
      }

      cacheMap.value = _cacheMap;
      return _dataGroup;
    });

    const markRowStyles = ({ row }: { row: any }) => {
      return (
        !row[COMPLETED_KEY] && {
          backgroundColor: "#E1F3D8"
        }
      );
    };

    const markCellStyles = ({ row, column }: { row: any; column: any }) => {
      const _cacheRow = cacheMap.value.get(row[props.uniqueKey]);
      return (
        _cacheRow &&
        _cacheRow[DIFF_CELL_KEY].includes(column.property) && {
          backgroundColor: "#FDE2E2"
        }
      );
    };

    return () => (
      <div class="flex space-x-2">
        {completedData.value.map((data, i) => (
          <el-table
            key={i}
            data={data}
            row-style={markRowStyles}
            cell-style={markCellStyles}
          >
            {props.columns.map((item: any) => (
              <el-table-column
                key={`${i}${item.prop}`}
                {...item}
                align="center"
              />
            ))}
          </el-table>
        ))}
      </div>
    );
  }
});
