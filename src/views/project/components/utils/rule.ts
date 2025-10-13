import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "项目名称为必填项", trigger: "blur" }],
  type: [{ required: true, message: "请选择产品类型", trigger: "change" }]
});
