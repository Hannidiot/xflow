import { defineFakeRoute } from "vite-plugin-fake-server/client";
import type { ProjectInfo, DiskUsage, ApiItem } from "@/api/project";

const project_info: ProjectInfo = {
  name: "API Gateway Dashboard",
  description:
    "A comprehensive monitoring and management dashboard for API gateway services with real-time metrics and performance tracking.",
  status: "Active",
  createdAt: "2024-01-15T00:00:00Z",
  updatedAt: "2024-10-01T00:00:00Z"
};

const disk_usage: DiskUsage = {
  used: "2.4 GB",
  total: "10 GB",
  percentage: 24,
  color: "#409EFF"
};

const generateApiList = (): ApiItem[] => {
  const methods = ["GET", "POST", "PUT", "DELETE"];
  const statuses = ["Active", "Inactive"];
  const endpoints = [
    "/api/v1/users",
    "/api/v1/products",
    "/api/v1/orders",
    "/api/v1/auth",
    "/api/v1/settings",
    "/api/v1/reports",
    "/api/v1/analytics",
    "/api/v1/notifications"
  ];

  const data: ApiItem[] = [];

  for (let i = 0; i < 1000; i++) {
    const method = methods[Math.floor(Math.random() * methods.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];

    data.push({
      id: `api-${i}`,
      name: `API ${i + 1}`,
      endpoint: endpoint,
      method: method,
      status: status,
      responseTime: `${(Math.random() * 500).toFixed(0)}ms`,
      lastUpdated: new Date(
        Date.now() - Math.random() * 86400000 * 30
      ).toISOString(),
      usageCount: Math.floor(Math.random() * 10000)
    });
  }

  return data;
};

export default defineFakeRoute([
  {
    url: "/project/info",
    method: "get",
    response: () => {
      return {
        code: "200",
        err_msg: "",
        data: project_info
      };
    }
  },
  {
    url: "/project/disk-usage",
    method: "get",
    response: () => {
      return {
        code: "200",
        err_msg: "",
        data: disk_usage
      };
    }
  },
  {
    url: "/project/api-list",
    method: "get",
    response: () => {
      return {
        code: "200",
        err_msg: "",
        data: generateApiList()
      };
    }
  }
]);
