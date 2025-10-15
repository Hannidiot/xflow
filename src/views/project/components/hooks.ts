import { isString, isEmpty } from "@pureadmin/utils";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { useRouter, useRoute, type LocationQueryRaw } from "vue-router";

export function useProjectDetail() {
  const route = useRoute();
  const router = useRouter();
  const getParameter = isEmpty(route.params) ? route.query : route.params;

  function toProjectDetail(parameter: LocationQueryRaw) {
    // Convert parameters to strings (important!)
    Object.keys(parameter).forEach(param => {
      if (!isString(parameter[param])) {
        parameter[param] = parameter[param].toString();
      }
    });

    // Save information to multi-tags
    useMultiTagsStoreHook().handleTags("push", {
      path: `/project/detail`,
      name: "ProjectDetail",
      query: parameter,
      meta: {
        title: `项目 ${parameter.projectId} - 详情`,
        // Maximum number of open tabs
        dynamicLevel: 3
      }
    });
    // Route navigation
    router.push({ name: "ProjectDetail", query: parameter });
  }

  // Used for page refresh, re-get browser address bar parameters and save to multi-tags
  const initToProjectDetail = () => {
    if (getParameter) toProjectDetail(getParameter);
  };

  return { toProjectDetail, initToProjectDetail, getParameter, router };
}
