import { http, type Response } from "@/utils/http";

export type Project = {
  _id: string;
  name: string;
  description?: string;
  type?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type ProjectType = {
  _id: string;
  name: string;
  code: string;
  description?: string;
};

export type CreateProjectRequest = {
  name: string;
  description?: string;
  type?: string;
};

export type UpdateProjectRequest = {
  name?: string;
  description?: string;
  type?: string;
};

export type ProjectsListResponse = {
  projects: Project[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    pages: number;
  };
};

/** 获取用户的项目列表 */
export const getProjects = (params?: {
  page?: number;
  per_page?: number;
  type?: string;
}) => {
  return http.request<Response<ProjectsListResponse>>("get", "/projects/", {
    params
  });
};

/** 创建新项目 */
export const createProject = (data: CreateProjectRequest) => {
  return http.request<Response<Project>>("post", "/projects/", { data });
};

/** 获取项目详情 */
export const getProjectDetail = (projectId: string) => {
  return http.request<Response<Project>>("get", `/projects/${projectId}`);
};

/** 更新项目 */
export const updateProject = (
  projectId: string,
  data: UpdateProjectRequest
) => {
  return http.request<Response<null>>("put", `/projects/${projectId}`, {
    data
  });
};

/** 删除项目 */
export const deleteProject = (projectId: string) => {
  return http.request<Response<null>>("delete", `/projects/${projectId}`);
};

/** 获取项目类型列表 */
export const getProjectTypes = () => {
  return http.request<Response<ProjectType[]>>(
    "get",
    "/projects/project/types"
  );
};
