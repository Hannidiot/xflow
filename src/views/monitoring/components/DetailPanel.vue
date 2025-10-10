<template>
  <div
    class="flex flex-col border border-gray-200 dark:border-gray-700 rounded"
  >
    <!-- Panel Header -->
    <div
      class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
    >
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {{ title }}
      </h3>

      <!-- Tab Navigation -->
      <div class="flex space-x-1">
        <el-button
          v-for="tab in tabs"
          :key="tab.value"
          :type="activeTab === tab.value ? 'primary' : 'default'"
          size="small"
          class="px-3 py-1 text-xs"
          @click="$emit('tab-change', tab.value)"
        >
          {{ tab.label }}
        </el-button>
      </div>
    </div>

    <!-- Content Area -->
    <el-scrollbar class="p-4 bg-white dark:bg-gray-900">
      <template v-if="!data">
        <div class="flex items-center justify-center text-gray-500 text-sm">
          Select a record to view details
        </div>
      </template>

      <template v-else>
        <!-- Pretty View -->
        <div v-if="activeTab === 'pretty'" class="space-y-2">
          <!-- Headers Section -->
          <div>
            <h4
              class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Headers
            </h4>
            <div class="bg-gray-50 dark:bg-gray-800 rounded p-3">
              <div
                v-for="(value, key) in data.headers"
                :key="key"
                class="flex text-sm border-b border-gray-200 dark:border-gray-700 last:border-b-0 py-1"
              >
                <span
                  class="font-mono font-semibold text-blue-600 dark:text-blue-400 w-32 flex-shrink-0"
                >
                  {{ key }}:
                </span>
                <span
                  class="font-mono text-gray-700 dark:text-gray-300 flex-1 break-all"
                >
                  {{ value }}
                </span>
              </div>
            </div>
          </div>

          <!-- Body Section -->
          <div>
            <h4
              class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Body
            </h4>
            <div class="bg-gray-50 dark:bg-gray-800 rounded p-3">
              <pre
                class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-all"
                >{{ formatBody(data.body) }}</pre
              >
            </div>
          </div>
        </div>

        <!-- Raw View -->
        <div v-else-if="activeTab === 'raw'">
          <pre
            class="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-all overflow-auto"
            >{{ formatRawData(data) }}
            </pre
          >
        </div>

        <!-- Hex View -->
        <div v-else-if="activeTab === 'hex'">
          <pre
            class="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-all overflow-auto"
            >{{ formatHexData(data.body) }}
            </pre
          >
        </div>
      </template>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface PanelData {
  headers: Record<string, string>;
  body: string;
}

export default defineComponent({
  name: "DetailPanel",
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object as PropType<PanelData | null>,
      default: null
    },
    activeTab: {
      type: String,
      default: "pretty"
    }
  },
  emits: ["tab-change"],
  setup() {
    const tabs = [
      { label: "Pretty", value: "pretty" },
      { label: "Raw", value: "raw" },
      { label: "Hex", value: "hex" }
    ];

    const formatBody = (body: string): string => {
      try {
        const parsed = JSON.parse(body);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return body;
      }
    };

    const formatRawData = (data: PanelData): string => {
      const headers = Object.entries(data.headers)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

      return `${headers}\n\n${data.body}`;
    };

    const formatHexData = (body: string): string => {
      const hexLines: string[] = [];
      const bytes = new TextEncoder().encode(body);

      for (let i = 0; i < bytes.length; i += 16) {
        const lineBytes = bytes.slice(i, i + 16);
        const hex = Array.from(lineBytes)
          .map(b => b.toString(16).padStart(2, "0"))
          .join(" ")
          .padEnd(48, " ");

        const ascii = Array.from(lineBytes)
          .map(b => (b >= 32 && b <= 126 ? String.fromCharCode(b) : "."))
          .join("");

        hexLines.push(`${i.toString(16).padStart(8, "0")}: ${hex}  ${ascii}`);
      }

      return hexLines.join("\n");
    };

    return {
      tabs,
      formatBody,
      formatRawData,
      formatHexData
    };
  }
});
</script>

<style scoped>
:deep(.el-button) {
  transition:
    color 0.2s,
    background-color 0.2s,
    border-color 0.2s;
}

:deep(.el-button--primary) {
  background-color: rgb(37 99 235);
  border-color: rgb(37 99 235);
}

:deep(.el-button--primary:hover) {
  background-color: rgb(29 78 216);
  border-color: rgb(29 78 216);
}
</style>
