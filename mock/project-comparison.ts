import { defineFakeRoute } from "vite-plugin-fake-server/client";
import type {
  ProjectComparisonRequest,
  ProjectComparisonResponse,
  ApiDiffItem,
  VulnerabilityDiffItem
} from "@/api/project-comparison";
import type { ProjectItem } from "@/api/project-list";

// Generate mock API diff data for both projects with realistic comparison scenarios
const generateApiDiffData = () => {
  // Common APIs that exist in both projects
  const commonApis = [
    {
      id: "api-1",
      name: "User API",
      endpoint: "/api/v1/users",
      method: "GET",
      status: "Active",
      responseTimeA: "120ms",
      responseTimeB: "120ms" // Same response time
    },
    {
      id: "api-2",
      name: "Product API",
      endpoint: "/api/v1/products",
      method: "GET",
      status: "Active",
      responseTimeA: "200ms",
      responseTimeB: "150ms" // Different response time
    },
    {
      id: "api-3",
      name: "Order API",
      endpoint: "/api/v1/orders",
      method: "POST",
      status: "Active",
      responseTimeA: "180ms",
      responseTimeB: "180ms" // Same response time
    }
  ];

  // APIs that only exist in project A (removed in project B)
  const projectAOnlyApis = [
    {
      id: "api-4",
      name: "Payment API",
      endpoint: "/api/v1/payments",
      method: "POST",
      status: "Active",
      responseTimeA: "220ms"
    }
  ];

  // APIs that only exist in project B (added in project B)
  const projectBOnlyApis = [
    {
      id: "api-5",
      name: "Auth API",
      endpoint: "/api/v1/auth",
      method: "POST",
      status: "Active",
      responseTimeB: "90ms"
    },
    {
      id: "api-6",
      name: "Inventory API",
      endpoint: "/api/v1/inventory",
      method: "GET",
      status: "Inactive",
      responseTimeB: "300ms"
    }
  ];

  // Build project A APIs
  const projectAApis: ApiDiffItem[] = [
    // Common APIs for project A
    ...commonApis.map(api => ({
      id: api.id,
      name: api.name,
      endpoint: api.endpoint,
      method: api.method,
      status: api.status,
      responseTime: api.responseTimeA,
      diffType: "modified" as const,
      changes:
        api.responseTimeA === api.responseTimeB
          ? []
          : [
              {
                field: "responseTime",
                oldValue: api.responseTimeA,
                newValue: api.responseTimeB
              }
            ]
    })),
    // APIs that only exist in project A (will be removed in project B)
    ...projectAOnlyApis.map(api => ({
      id: api.id,
      name: api.name,
      endpoint: api.endpoint,
      method: api.method,
      status: api.status,
      responseTime: api.responseTimeA,
      diffType: "removed" as const,
      changes: []
    }))
  ];

  // Build project B APIs
  const projectBApis: ApiDiffItem[] = [
    // Common APIs for project B
    ...commonApis.map(api => ({
      id: api.id,
      name: api.name,
      endpoint: api.endpoint,
      method: api.method,
      status: api.status,
      responseTime: api.responseTimeB,
      diffType: "modified" as const,
      changes:
        api.responseTimeA === api.responseTimeB
          ? []
          : [
              {
                field: "responseTime",
                oldValue: api.responseTimeA,
                newValue: api.responseTimeB
              }
            ]
    })),
    // APIs that only exist in project B (added in project B)
    ...projectBOnlyApis.map(api => ({
      id: api.id,
      name: api.name,
      endpoint: api.endpoint,
      method: api.method,
      status: api.status,
      responseTime: api.responseTimeB,
      diffType: "added" as const,
      changes: []
    }))
  ];

  return {
    projectA: projectAApis,
    projectB: projectBApis
  };
};

// Generate mock vulnerability diff data for both projects with realistic comparison scenarios
const generateVulnerabilityDiffData = () => {
  // Common vulnerabilities that exist in both projects
  const commonVulnerabilities = [
    {
      id: "vuln-1",
      severityA: "High",
      severityB: "High", // Same severity
      category: "SQL Injection",
      description: "Potential SQL injection in user endpoint",
      affectedEndpoint: "/api/v1/users"
    },
    {
      id: "vuln-2",
      severityA: "Low",
      severityB: "Medium", // Different severity
      category: "XSS",
      description: "Cross-site scripting vulnerability",
      affectedEndpoint: "/api/v1/products"
    },
    {
      id: "vuln-3",
      severityA: "Medium",
      severityB: "Medium", // Same severity
      category: "CSRF",
      description: "CSRF protection missing",
      affectedEndpoint: "/api/v1/auth"
    }
  ];

  // Vulnerabilities that only exist in project A (fixed in project B)
  const projectAOnlyVulnerabilities = [
    {
      id: "vuln-4",
      severityA: "Low",
      category: "Information Disclosure",
      description: "Information disclosure vulnerability",
      affectedEndpoint: "/api/v1/admin"
    }
  ];

  // Vulnerabilities that only exist in project B (newly discovered)
  const projectBOnlyVulnerabilities = [
    {
      id: "vuln-5",
      severityB: "Critical",
      category: "Authentication Bypass",
      description: "Authentication bypass possible",
      affectedEndpoint: "/api/v1/payments"
    },
    {
      id: "vuln-6",
      severityB: "High",
      category: "Insecure Deserialization",
      description: "Insecure deserialization detected",
      affectedEndpoint: "/api/v1/orders"
    }
  ];

  // Build project A vulnerabilities
  const projectAVulnerabilities: VulnerabilityDiffItem[] = [
    // Common vulnerabilities for project A
    ...commonVulnerabilities.map(vuln => ({
      id: vuln.id,
      severity: vuln.severityA,
      category: vuln.category,
      description: vuln.description,
      affectedEndpoint: vuln.affectedEndpoint,
      diffType: "modified" as const,
      changes:
        vuln.severityA === vuln.severityB
          ? []
          : [
              {
                field: "severity",
                oldValue: vuln.severityA,
                newValue: vuln.severityB
              }
            ]
    })),
    // Vulnerabilities that only exist in project A (fixed in project B)
    ...projectAOnlyVulnerabilities.map(vuln => ({
      id: vuln.id,
      severity: vuln.severityA,
      category: vuln.category,
      description: vuln.description,
      affectedEndpoint: vuln.affectedEndpoint,
      diffType: "removed" as const,
      changes: []
    }))
  ];

  // Build project B vulnerabilities
  const projectBVulnerabilities: VulnerabilityDiffItem[] = [
    // Common vulnerabilities for project B
    ...commonVulnerabilities.map(vuln => ({
      id: vuln.id,
      severity: vuln.severityB,
      category: vuln.category,
      description: vuln.description,
      affectedEndpoint: vuln.affectedEndpoint,
      diffType: "modified" as const,
      changes:
        vuln.severityA === vuln.severityB
          ? []
          : [
              {
                field: "severity",
                oldValue: vuln.severityA,
                newValue: vuln.severityB
              }
            ]
    })),
    // Vulnerabilities that only exist in project B (newly discovered)
    ...projectBOnlyVulnerabilities.map(vuln => ({
      id: vuln.id,
      severity: vuln.severityB,
      category: vuln.category,
      description: vuln.description,
      affectedEndpoint: vuln.affectedEndpoint,
      diffType: "added" as const,
      changes: []
    }))
  ];

  return {
    projectA: projectAVulnerabilities,
    projectB: projectBVulnerabilities
  };
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
