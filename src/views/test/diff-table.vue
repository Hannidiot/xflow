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
      class="space-x-2"
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
  { label: "Status", prop: "status" },
  { label: "Department", prop: "department" },
  { label: "Salary", prop: "salary" }
];

const data1 = ref([
  {
    id: 1,
    name: "John Doe",
    age: 30,
    city: "New York",
    status: "Active",
    department: "Engineering",
    salary: 75000
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    city: "Los Angeles",
    status: "Inactive",
    department: "Marketing",
    salary: 65000
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 35,
    city: "Chicago",
    status: "Active",
    department: "Sales",
    salary: 80000
  },
  {
    id: 4,
    name: "Alice Brown",
    age: 28,
    city: "Houston",
    status: "Pending",
    department: "HR",
    salary: 55000
  },
  {
    id: 5,
    name: "Charlie Wilson",
    age: 32,
    city: "Phoenix",
    status: "Active",
    department: "Engineering",
    salary: 72000
  },
  {
    id: 7,
    name: "Eva Davis",
    age: 29,
    city: "Boston",
    status: "Active",
    department: "Design",
    salary: 68000
  },
  {
    id: 8,
    name: "Frank Miller",
    age: 45,
    city: "Miami",
    status: "Inactive",
    department: "Finance",
    salary: 95000
  },
  {
    id: 9,
    name: "Grace Lee",
    age: 27,
    city: "Denver",
    status: "Active",
    department: "Engineering",
    salary: 70000
  },
  {
    id: 10,
    name: "Henry Chen",
    age: 33,
    city: "Austin",
    status: "Pending",
    department: "Product",
    salary: 78000
  },
  {
    id: 11,
    name: "Ivy Wang",
    age: 31,
    city: "Portland",
    status: "Active",
    department: "Marketing",
    salary: 67000
  }
]);

const data2 = ref([
  {
    id: 1,
    name: "John Doe",
    age: 31,
    city: "New York",
    status: "Active",
    department: "Engineering",
    salary: 78000
  }, // Age and salary changed
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    city: "San Francisco",
    status: "Active",
    department: "Marketing",
    salary: 68000
  }, // City, status, and salary changed
  {
    id: 3,
    name: "Bob Johnson",
    age: 35,
    city: "Chicago",
    status: "Suspended",
    department: "Sales",
    salary: 80000
  }, // Status changed
  {
    id: 4,
    name: "Alice Brown",
    age: 28,
    city: "Houston",
    status: "Pending",
    department: "HR",
    salary: 55000
  }, // No changes
  {
    id: 6,
    name: "David Lee",
    age: 29,
    city: "Seattle",
    status: "Active",
    department: "Engineering",
    salary: 71000
  }, // New row
  {
    id: 7,
    name: "Eva Davis",
    age: 29,
    city: "Boston",
    status: "Active",
    department: "Design",
    salary: 72000
  }, // Salary changed
  {
    id: 8,
    name: "Frank Miller",
    age: 45,
    city: "Miami",
    status: "Retired",
    department: "Finance",
    salary: 95000
  }, // Status changed
  {
    id: 9,
    name: "Grace Lee",
    age: 27,
    city: "Denver",
    status: "Active",
    department: "Engineering",
    salary: 70000
  }, // No changes
  {
    id: 10,
    name: "Henry Chen",
    age: 33,
    city: "Austin",
    status: "Active",
    department: "Product",
    salary: 82000
  }, // Status and salary changed
  {
    id: 12,
    name: "Kevin Zhang",
    age: 26,
    city: "Dallas",
    status: "Active",
    department: "Sales",
    salary: 63000
  }, // New row
  {
    id: 13,
    name: "Lisa Taylor",
    age: 34,
    city: "Atlanta",
    status: "Pending",
    department: "HR",
    salary: 59000
  } // New row
]);
</script>

<style scoped>
.diff-table-container {
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
</style>
