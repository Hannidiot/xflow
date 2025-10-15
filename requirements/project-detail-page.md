# Project Detail Page

It contains the detail info of a certain project, which contains below tabs:

1. Project Info tab ('/src/views/project/index.vue')
2. Project Scan Configuration tab ('/src/views/project/configuration.vue')
3. Realtime Flow Monitoring tab ('/src/views/monitoring/index.vue')
4. API Analysis tab ('/src/views/project/api-analysis.vue')

## Requirements

- It cannot be accessed directly from the navigation bar. Instead, user needs to click a project in the project-list page to jump to this page. So this component takes a projectId parameter before being loaded.
- Implement this with a el-tab element, you can refer to '/src/views/test/multi-tabs.vue'
- Above the tab section, there is a header, left side is a back button to return to project-list page, then follows with title of this project. Right side is a status block to show if the scan is active or inactive.
- use tailwindcss instead of scoped css

You can refer to below files which are under /Users/minhao/Workspace/github-projects/vue-pure-admin:

1. Hidden Route Configuration - src/router/modules/remaining.ts

This file contains routes that are registered but not shown in menus:
{
path: "/account-settings",
name: "AccountSettings",
component: () => import("@/views/account-settings/index.vue"),
meta: {
title: $t("buttons.pureAccountSettings"),
showLink: false // This hides the route from menus
}
}

2. Route Parameter Passing - src/views/tabs/hooks.ts

Shows how to pass variables via query/params:
function toDetail(parameter: LocationQueryRaw | RouteParamsRaw, model: "query" | "params") {
// Convert parameters to strings (important!)
Object.keys(parameter).forEach(param => {
if (!isString(parameter[param])) {
parameter[param] = parameter[param].toString();
}
});

    if (model === "query") {
      router.push({ name: "TabQueryDetail", query: parameter });
    } else if (model === "params") {
      router.push({ name: "TabParamsDetail", params: parameter });
    }

}

3. Component Usage Example - src/views/tabs/index.vue

Shows how to trigger navigation with parameters:
<el-button @click="toDetail({ id: 666, name: '小明', age: 18, job: '工程师' }, 'query')">
多个参数
</el-button>

4. Route Definition for Parameters - src/router/modules/remaining.ts

Example of parameterized routes:
{
path: "/redirect/:path(.\*)",
name: "Redirect",
component: () => import("@/layout/redirect.vue")
}

Implementation Steps:

1. Create Your Component

Create your component in src/views/ (e.g., src/views/monitor/logs/details/index.vue)

2. Register Hidden Route

Add to src/router/modules/remaining.ts:
{
path: "/monitor/logs/details",
name: "LogDetails",
component: () => import("@/views/monitor/logs/details/index.vue"),
meta: {
title: "日志详情",
showLink: false // Hidden from menus
}
}

3. Access Parameters in Component

In your component, access passed variables:

  <script setup lang="ts">
  import { useRoute } from "vue-router";

  const route = useRoute();
  const { id, name, age } = route.query; // or route.params
  </script>

4. Navigate Programmatically

From any component, navigate with parameters:

  <script setup lang="ts">
  import { useRouter } from "vue-router";

  const router = useRouter();

  function openDetails(logData: any) {
    router.push({
      name: "LogDetails",
      query: {
        id: logData.id,
        name: logData.name,
        timestamp: logData.timestamp.toString()
      }
    });
  }
  </script>

  <template>
    <el-button @click="openDetails({ id: 123, name: '操作日志', timestamp: Date.now() })">
      查看详情
    </el-button>
  </template>

## Changelog

### v1

- for logic of opening new tab, pls refer to below files so that tab can be created under multi-tab container, then do changes accordingly, core difference here is `useMultiTagsStoreHook().handleTags` method
  - /Users/minhao/Workspace/github-projects/vue-pure-admin/src/views/tabs/hooks.ts
  - /Users/minhao/Workspace/github-projects/vue-pure-admin/src/views/tabs/query-detail.vue
