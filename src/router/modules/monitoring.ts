const Layout = () => import("@/layout/index.vue");

export default {
  path: "/monitoring",
  name: "Monitoring",
  component: Layout,
  redirect: "/monitoring/traffic",
  meta: {
    icon: "ep:monitor",
    title: "项目监控",
    rank: 5
  },
  children: [
    {
      path: "/monitoring/traffic",
      name: "TrafficMonitoring",
      component: () => import("@/views/monitoring/index.vue"),
      meta: {
        title: "网络流量监控",
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
