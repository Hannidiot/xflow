<template>
  <div class="h-full flex flex-row space-x-2">
    <div class="flex-[0_0_60%] flex justify-center items-center bg-blue-100" />

    <div class="flex-1 p-6 bg-white rounded-lg shadow-sm mb-4">
      <el-form
        ref="proxyFormRef"
        :model="proxySettings"
        label-width="120px"
        class="p-2"
      >
        <el-form-item label="代理模式" prop="mode">
          <el-select
            v-model="proxySettings.mode"
            placeholder="选择代理模式"
            class="w-48"
          >
            <el-option label="直连" value="direct" />
            <el-option label="HTTP" value="http" />
            <el-option label="HTTPS" value="https" />
            <el-option label="SOCKS" value="socks" />
          </el-select>
        </el-form-item>

        <el-form-item label="DNS过滤" prop="dnsFilter">
          <el-input
            v-model="proxySettings.dnsFilter"
            placeholder="输入DNS过滤规则，多个用逗号分隔"
            class="w-80"
          />
        </el-form-item>

        <el-form-item label="自动加解密" prop="autoEncrypt">
          <el-switch
            v-model="proxySettings.autoEncrypt"
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="success" class="ml-2"> 下载证书 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { type ProxySettings } from "@/api/project-configuration";

const blueWidth = ref(40); // initial percentage
const proxySettings = reactive<ProxySettings>({
  mode: "direct",
  dnsFilter: "",
  autoEncrypt: false
});
</script>
