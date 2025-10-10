<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">DiffTable Component Demo</h1>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Data Comparison Table</h2>
      <p class="text-gray-600 mb-4">
        This demo shows two tables side by side comparing data. Rows with green
        background indicate unmatched rows, and cells with red background
        indicate differences between the two datasets.
      </p>
    </div>

    <DiffTable
      :data-group="[data1, data2]"
      :columns="columns"
      unique-key="id"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DiffTable } from "@/components/DiffTable";

const columns = [
  { label: "ID", prop: "id" },
  { label: "Name", prop: "name" },
  { label: "Age", prop: "age" },
  { label: "City", prop: "city" },
  { label: "Status", prop: "status" }
];

const data1 = ref([
  { id: 1, name: "John Doe", age: 30, city: "New York", status: "Active" },
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    city: "Los Angeles",
    status: "Inactive"
  },
  { id: 3, name: "Bob Johnson", age: 35, city: "Chicago", status: "Active" },
  { id: 4, name: "Alice Brown", age: 28, city: "Houston", status: "Pending" },
  { id: 5, name: "Charlie Wilson", age: 32, city: "Phoenix", status: "Active" }
]);

const data2 = ref([
  { id: 1, name: "John Doe", age: 31, city: "New York", status: "Active" }, // Age changed
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    city: "San Francisco",
    status: "Inactive"
  }, // City changed
  { id: 3, name: "Bob Johnson", age: 35, city: "Chicago", status: "Suspended" }, // Status changed
  { id: 4, name: "Alice Brown", age: 28, city: "Houston", status: "Pending" }, // No changes
  { id: 6, name: "David Lee", age: 29, city: "Seattle", status: "Active" } // New row
]);
</script>

<style scoped>
.diff-table-container {
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
</style>
