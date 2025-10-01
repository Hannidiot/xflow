const Layout = () => import("@/layout/index.vue");

export default {
  path: "/project",
  name: "Project",
  component: Layout,
  redirect: "/project/info",
  meta: {
    icon: "ep:document",
    title: "项目信息",
    rank: 6
  },
  children: [
    {
      path: "/project/info",
      name: "ProjectInfo",
      component: () => import("@/views/project/index.vue"),
      meta: {
        title: "项目信息",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
