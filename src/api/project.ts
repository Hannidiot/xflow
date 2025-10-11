import { http, type Response } from "@/utils/http";

export type ProjectInfo = {
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type DiskUsage = {
  used: string;
  total: string;
  percentage: number;
  color: string;
};

export type ApiItem = {
  id: string;
  name: string;
  endpoint: string;
  method: string;
  status: string;
  responseTime: string;
  lastUpdated: string;
  usageCount: number;
};

export type ProjectDetailRequest = {
  projectId: string;
};

export const getProjectInfo = (params: ProjectDetailRequest) => {
  return http.request<Response<ProjectInfo>>("get", "/project/info", {
    params
  });
};

export const getProjectDiskUsage = (params: ProjectDetailRequest) => {
  return http.request<Response<DiskUsage>>("get", "/project/disk-usage", {
    params
  });
};

export const getProjectApiList = (params: ProjectDetailRequest) => {
  return http.request<Response<ApiItem[]>>("get", "/project/api-list", {
    params
  });
};
