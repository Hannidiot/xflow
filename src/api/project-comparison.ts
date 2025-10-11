import { http, type Response } from "@/utils/http";
import type { ProjectItem } from "./project-list";

export type DiffType = "added" | "removed" | "modified";

export interface ApiDiffItem {
  id: string;
  name: string;
  endpoint: string;
  method: string;
  status: string;
  responseTime: string;
  diffType: DiffType;
  changes?: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
}

export interface VulnerabilityDiffItem {
  id: string;
  severity: string;
  category: string;
  description: string;
  affectedEndpoint: string;
  diffType: DiffType;
  changes?: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
}

export interface ProjectComparisonRequest {
  projectAId: string;
  projectBId: string;
}

export interface ProjectComparisonResponse {
  projectA: ProjectItem;
  projectB: ProjectItem;
  apiDiff: {
    projectA: ApiDiffItem[];
    projectB: ApiDiffItem[];
  };
  vulnerabilityDiff: {
    projectA: VulnerabilityDiffItem[];
    projectB: VulnerabilityDiffItem[];
  };
}

export interface ProjectListResponse {
  data: ProjectItem[];
}

/**
 * Get list of all projects for dropdown selection
 */
export const getProjectOptions = () => {
  return http.request<Response<ProjectListResponse>>("get", "/project/list", {
    params: {
      currentPage: 1,
      pageSize: 1000 // Get all projects for dropdown
    }
  });
};

/**
 * Compare two projects
 */
export const compareProjects = (data: ProjectComparisonRequest) => {
  return http.post<
    Response<ProjectComparisonResponse>,
    ProjectComparisonRequest
  >("/project/compare", {
    data
  });
};
