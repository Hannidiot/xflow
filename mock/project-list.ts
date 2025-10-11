import { defineFakeRoute } from "vite-plugin-fake-server/client";
import type { ProjectItem, ProjectListResponse } from "@/api/project-list";

const generateProjectList = (): ProjectItem[] => {
  const productTypes = ["电商平台", "移动应用", "企业系统"];
  const statuses = ["active", "inactive"];
  const proxyStatuses = ["running", "stopped"];

  const data: ProjectItem[] = [];

  for (let i = 1; i <= 50; i++) {
    data.push({
      id: `project-${i}`,
      projectName: `电商平台V${i}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      productType:
        productTypes[Math.floor(Math.random() * productTypes.length)],
      description: `电商平台第${i}版本`,
      trafficCapture: Math.random() > 0.5,
      proxyStatus:
        proxyStatuses[Math.floor(Math.random() * proxyStatuses.length)],
      apiCount: Math.floor(Math.random() * 200) + 50,
      totalTraffic: `${(Math.random() * 5).toFixed(1)}M`,
      diskUsage: `${(Math.random() * 5).toFixed(1)}GB`,
      updateTime: `2024-01-${String(10 + i).padStart(2, "0")}`
    });
  }

  return data;
};

export default defineFakeRoute([
  {
    url: "/project/list",
    method: "get",
    response: ({ query }) => {
      const {
        currentPage = 1,
        pageSize = 10,
        projectName,
        productType,
        status
      } = query;
      const allData = generateProjectList();

      // Filter data based on search criteria
      let filteredData = allData;

      if (projectName) {
        filteredData = filteredData.filter(item =>
          item.projectName.includes(projectName)
        );
      }

      if (productType) {
        filteredData = filteredData.filter(
          item => item.productType === productType
        );
      }

      if (status) {
        filteredData = filteredData.filter(item => item.status === status);
      }

      // Paginate data
      const startIndex = (Number(currentPage) - 1) * Number(pageSize);
      const endIndex = startIndex + Number(pageSize);
      const paginatedData = filteredData.slice(startIndex, endIndex);

      const response: ProjectListResponse = {
        data: paginatedData,
        pagination: {
          currentPage: Number(currentPage),
          pageSize: Number(pageSize),
          total: filteredData.length
        }
      };

      return {
        code: "200",
        err_msg: "",
        data: response
      };
    }
  },
  {
    url: "/project/traffic-capture",
    method: "post",
    response: () => {
      return {
        code: "200",
        err_msg: "",
        data: {}
      };
    }
  },
  {
    url: "/project/delete",
    method: "post",
    response: () => {
      return {
        code: "200",
        err_msg: "",
        data: {}
      };
    }
  }
]);
