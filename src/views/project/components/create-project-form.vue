<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/type";
import type { ProjectType } from "@/api/projects";

const props = withDefaults(
  defineProps<FormProps & { productTypes: ProjectType[] }>(),
  {
    formInline: () => ({
      name: "",
      description: "",
      type: ""
    }),
    productTypes: () => []
  }
);

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
    <el-form-item label="项目名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入项目名称"
      />
    </el-form-item>

    <el-form-item label="项目描述" prop="description">
      <el-input
        v-model="newFormInline.description"
        type="textarea"
        :rows="3"
        placeholder="请输入项目描述"
      />
    </el-form-item>

    <el-form-item label="产品类型" prop="type">
      <el-select
        v-model="newFormInline.type"
        placeholder="请选择产品类型"
        clearable
      >
        <el-option
          v-for="productType in productTypes"
          :key="productType._id"
          :label="productType.name"
          :value="productType.code"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>
