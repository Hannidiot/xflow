const Layout = () => import("@/layout/index.vue");

export default {
  path: "/project",
  name: "Project",
  component: Layout,
  redirect: "/project/list",
  meta: {
    icon: "ep:document",
    title: "项目信息",
    rank: 6
  },
  children: [
    {
      path: "/project/list",
      name: "ProjectList",
      component: () => import("@/views/project/list.vue"),
      meta: {
        title: "项目管理",
        showLink: true
      }
    },
    {
      path: "/project/comparison",
      name: "ProjectComparison",
      component: () => import("@/views/project/comparison-tab/comparison.vue"),
      meta: {
        title: "项目对比",
        showLink: true
      }
    },
    {
      path: "/project/info",
      name: "ProjectInfo",
      component: () => import("@/views/project/index.vue"),
      meta: {
        title: "项目信息",
        showLink: true
      }
    },
    {
      path: "/project/configuration",
      name: "ProjectConfiguration",
      component: () =>
        import("@/views/project/configuration-tab/configuration.vue"),
      meta: {
        title: "项目配置",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
