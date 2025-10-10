<template>
  <div class="h-screen flex flex-col">
    <div
      class="flex-[0_0_60%]"
      :style="{
        background: `linear-gradient(to right, #3b82f6 ${blueWidth}%, transparent ${blueWidth}%)`
      }"
    >
      Top area ({{ blueWidth }}%)
      <el-slider v-model="blueWidth" />
    </div>

    <!-- bottom: fixed 40%; must allow children to shrink: min-h-0 -->
    <div class="flex-[0_0_40%] bg-red-200 flex flex-row min-h-0">
      <div class="flex-1 flex justify-center items-center">left</div>

      <!-- IMPORTANT: the scrolling element must also be able to shrink: min-h-0 -->
      <div class="flex-1 min-h-0 overflow-auto p-2">
        <p v-for="i in 50" :key="i">Line {{ i }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const blueWidth = ref(40); // initial percentage
</script>
