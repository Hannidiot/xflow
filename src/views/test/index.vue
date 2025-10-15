<template>
  <div class="h-full">
    <el-button @click="handleNewTab"> ToProjectDetail </el-button>
  </div>
</template>

<script setup lang="ts">
import { useProjectDetail } from "@/views/project/components/hooks";

const { toProjectDetail } = useProjectDetail();

const handleNewTab = () => {
  toProjectDetail({ projectId: 1 });
};
</script>
