import { http, type Response } from "@/utils/http";

export type ProjectItem = {
  id: string;
  projectName: string;
  status: string;
  productType: string;
  description: string;
  trafficCapture: boolean;
  proxyStatus: string;
  apiCount: number;
  totalTraffic: string;
  diskUsage: string;
  updateTime: string;
};

export type SearchForm = {
  projectName: string;
  productType: string;
  status: string;
};

export type Pagination = {
  currentPage: number;
  pageSize: number;
  total: number;
};

export type ProjectListRequest = {
  projectName?: string;
  productType?: string;
  status?: string;
  currentPage: number;
  pageSize: number;
};

export type ProjectListResponse = {
  data: ProjectItem[];
  pagination: Pagination;
};

export const getProjectList = (params: ProjectListRequest) => {
  return http.request<Response<ProjectListResponse>>("get", "/project/list", {
    params
  });
};

export const updateTrafficCapture = (data: {
  id: string;
  trafficCapture: boolean;
}) => {
  return http.post<Response<any>, { id: string; trafficCapture: boolean }>(
    "/project/traffic-capture",
    {
      data
    }
  );
};

export const deleteProject = (data: { id: string }) => {
  return http.post<Response<any>, { id: string }>("/project/delete", {
    data
  });
};
