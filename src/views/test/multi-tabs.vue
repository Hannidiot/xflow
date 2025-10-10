<script setup lang="ts">
import { ref } from "vue";
import ProjectInfo from "@/views/project/index.vue";
import TrafficMonitoring from "@/views/monitoring/index.vue";

const activeName = ref("first");
</script>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="标签一" name="first">
      <ProjectInfo />
    </el-tab-pane>
    <el-tab-pane label="标签二" name="second">
      <TrafficMonitoring />
    </el-tab-pane>
  </el-tabs>
</template>
