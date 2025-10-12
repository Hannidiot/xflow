<script setup lang="ts">
import editForm from "./dialog-form.vue";
import { h, ref } from "vue";
import { addDialog } from "@/components/ReDialog";
import { DeviceForm } from "./utils/type";

const formRef = ref();
function openDialog(title = "连接", row?: DeviceForm) {
  addDialog({
    title: `${title}设备`,
    props: {
      formInline: {
        ip: row?.port ?? "",
        port: row?.port ?? ""
      }
    },
    width: "40%",
    draggable: true,
    closeOnClickModal: false,
    contentRenderer: () => h(editForm, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const FormRef = formRef.value.getRef();
      const curData = options.props.formInline as DeviceForm;
      async function chores() {
        done(); // 关闭弹框
      }
      FormRef.validate(async valid => {
        if (valid) {
          await chores();
        }
      });
    }
  });
}
</script>

<template>
  <div class="h-full">
    <el-button @click="openDialog('create')">Open Dialog</el-button>
  </div>
</template>
