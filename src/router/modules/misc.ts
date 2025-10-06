const Layout = () => import("@/layout/index.vue");

export default {
  path: "/test",
  name: "Test",
  component: Layout,
  redirect: "/test/table",
  meta: {
    icon: "ep:monitor",
    title: "测试页面",
    rank: 10
  },
  children: [
    {
      path: "/test/table",
      name: "TestTable",
      component: () => import("@/views/test/index.vue"),
      meta: {
        title: "测试表格",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
