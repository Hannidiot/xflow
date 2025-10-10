<template>
  <pure-table :data="tableData" :columns="columns" :row-style="getRowStyle" />
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed } from "vue";

const date = dayjs(new Date()).format("YYYY-MM-DD");
const shadowColor = "oklch(96.7% 0.001 286.375)";

const maxAmount = computed(() =>
  Math.max(...tableData.map(item => item.amount))
);

const getRowStyle = ({ row }) => {
  let percent = Math.floor((row.amount / maxAmount.value) * 100);
  return `background: linear-gradient(to right, ${shadowColor} ${percent}%, transparent ${percent}%)`;
};

const columns: TableColumnList = [
  {
    label: "日期",
    prop: "date"
  },
  {
    label: "姓名",
    prop: "name"
  },
  {
    label: "地址",
    prop: "address"
  },
  {
    label: "数量",
    prop: "amount"
  }
];

const tableData = [
  {
    date,
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    amount: 100
  },
  {
    date,
    name: "Jack",
    address: "No. 189, Grove St, Los Angeles",
    amount: 120
  },
  {
    date,
    name: "Dick",
    address: "No. 189, Grove St, Los Angeles",
    amount: 130
  },
  {
    date,
    name: "Harry",
    address: "No. 189, Grove St, Los Angeles",
    amount: 90
  },
  {
    date,
    name: "Sam",
    address: "No. 189, Grove St, Los Angeles",
    amount: 0
  },
  {
    date,
    name: "Lucy",
    address: "No. 189, Grove St, Los Angeles",
    amount: 300
  },
  {
    date,
    name: "Mary",
    address: "No. 189, Grove St, Los Angeles",
    amount: 200
  },
  {
    date,
    name: "Mike",
    address: "No. 189, Grove St, Los Angeles",
    amount: 50
  }
];
</script>
