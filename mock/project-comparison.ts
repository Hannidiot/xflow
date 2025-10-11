import { defineFakeRoute } from "vite-plugin-fake-server/client";
import type {
  ProjectComparisonRequest,
  ProjectComparisonResponse,
  ApiDiffItem,
  VulnerabilityDiffItem
} from "@/api/project-comparison";
import type { ProjectItem } from "@/api/project-list";

// Generate mock API diff data
const generateApiDiffData = (): ApiDiffItem[] => {
  return [
    {
      id: "api-1",
      name: "User API",
      endpoint: "/api/v1/users",
      method: "GET",
      status: "Active",
      responseTime: "120ms",
      diffType: "added",
      changes: []
    },
    {
      id: "api-2",
      name: "Product API",
      endpoint: "/api/v1/products",
      method: "GET",
      status: "Active",
      responseTime: "150ms",
      diffType: "modified",
      changes: [
        {
          field: "responseTime",
          oldValue: "200ms",
          newValue: "150ms"
        }
      ]
    },
    {
      id: "api-3",
      name: "Order API",
      endpoint: "/api/v1/orders",
      method: "POST",
      status: "Inactive",
      responseTime: "180ms",
      diffType: "removed",
      changes: []
    }
  ];
};

// Generate mock vulnerability diff data
const generateVulnerabilityDiffData = (): VulnerabilityDiffItem[] => {
  return [
    {
      id: "vuln-1",
      severity: "High",
      category: "SQL Injection",
      description: "Potential SQL injection in user endpoint",
      affectedEndpoint: "/api/v1/users",
      diffType: "added",
      changes: []
    },
    {
      id: "vuln-2",
      severity: "Medium",
      category: "XSS",
      description: "Cross-site scripting vulnerability",
      affectedEndpoint: "/api/v1/products",
      diffType: "modified",
      changes: [
        {
          field: "severity",
          oldValue: "Low",
          newValue: "Medium"
        }
      ]
    },
    {
      id: "vuln-3",
      severity: "Low",
      category: "CSRF",
      description: "CSRF protection missing",
      affectedEndpoint: "/api/v1/auth",
      diffType: "removed",
      changes: []
    }
  ];
};

export default defineFakeRoute([
  {
    url: "/project/compare",
    method: "post",
    response: ({ body }: { body: ProjectComparisonRequest }) => {
      const { projectAId, projectBId } = body;

      // Mock project data
      const projectA: ProjectItem = {
        id: projectAId,
        projectName: "电商平台V1",
        status: "active",
        productType: "电商平台",
        description: "电商平台第一版本",
        trafficCapture: true,
        proxyStatus: "running",
        apiCount: 156,
        totalTraffic: "1.3M",
        diskUsage: "2.3GB",
        updateTime: "2024-01-20"
      };

      const projectB: ProjectItem = {
        id: projectBId,
        projectName: "电商平台V2",
        status: "active",
        productType: "电商平台",
        description: "电商平台第二版本",
        trafficCapture: true,
        proxyStatus: "running",
        apiCount: 189,
        totalTraffic: "2.1M",
        diskUsage: "3.1GB",
        updateTime: "2024-01-25"
      };

      const response: ProjectComparisonResponse = {
        projectA,
        projectB,
        apiDiff: generateApiDiffData(),
        vulnerabilityDiff: generateVulnerabilityDiffData()
      };

      return {
        code: "200",
        err_msg: "",
        data: response
      };
    }
  }
]);
