<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/type";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    ip: "",
    port: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="设备地址" prop="ip">
      <el-input v-model="newFormInline.ip" clearable />
    </el-form-item>

    <el-form-item label="设备端口" prop="port">
      <el-input v-model="newFormInline.port" />
    </el-form-item>
  </el-form>
</template>
