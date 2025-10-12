const Layout = () => import("@/layout/index.vue");

export default {
  path: "/test",
  name: "Test",
  component: Layout,
  redirect: "/test/page",
  meta: {
    icon: "ep:monitor",
    title: "测试页面",
    rank: 10
  },
  children: [
    {
      path: "/test/page",
      name: "TestPage",
      component: () => import("@/views/test/index.vue"),
      meta: {
        title: "测试页面",
        showLink: true
      }
    },
    {
      path: "/test/data-intensity-table",
      name: "DataIntensityTable",
      component: () => import("@/views/test/data-intensity-table.vue"),
      meta: {
        title: "数据可视表格",
        showLink: true
      }
    },
    {
      path: "/test/diff-table",
      name: "DiffTableDemo",
      component: () => import("@/views/test/diff-table.vue"),
      meta: {
        title: "差异对比表格",
        showLink: true
      }
    },
    {
      path: "/test/multi-tabs",
      name: "MultiTabs",
      component: () => import("@/views/test/multi-tabs.vue"),
      meta: {
        title: "多标签页",
        showLink: true
      }
    },
    {
      path: "/test/http-403-test",
      name: "Http403Test",
      component: () => import("@/views/test/http-403-test.vue"),
      meta: {
        title: "HTTP 403测试",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
