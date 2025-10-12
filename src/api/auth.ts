import { http, type Response } from "@/utils/http";

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type UserInfo = {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  is_active: boolean;
  created_at?: string;
  last_login?: string;
};

export type LoginResponseData = {
  user_id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  token: string;
};

export type TokenInfo = {
  id: string;
  created_at: string;
  expires_at: string;
  is_active: boolean;
};

export type AdminTokenInfo = TokenInfo & {
  user_id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  last_used?: string;
  revoked_at?: string;
};

export type PaginationInfo = {
  page: number;
  per_page: number;
  total: number;
  pages: number;
};

export type TokenStats = {
  total_tokens: number;
  active_tokens: number;
  expired_tokens: number;
  today_tokens: number;
  top_users: Array<{
    _id: string;
    token_count: number;
    username: string;
    email: string;
  }>;
};

/** 用户注册 */
export const registerUser = (data: RegisterRequest) => {
  return http.request<Response<UserInfo>>("post", "/auth/register", { data });
};

/** 用户登录 */
export const loginUser = (data: LoginRequest) => {
  return http.request<Response<LoginResponseData>>("post", "/auth/login", {
    data
  });
};

/** 用户登出 */
export const logoutUser = () => {
  return http.request<Response<null>>("post", "/auth/logout");
};

/** 获取用户信息 */
export const getUserProfile = () => {
  return http.request<Response<UserInfo>>("get", "/auth/profile");
};

/** 更新用户信息 */
export const updateUserProfile = (data: {
  username?: string;
  profile?: {
    nickname?: string;
    bio?: string;
  };
}) => {
  return http.request<Response<null>>("put", "/auth/profile", { data });
};

/** 获取用户令牌列表 */
export const getUserTokens = () => {
  return http.request<Response<{ tokens: TokenInfo[] }>>("get", "/auth/tokens");
};

/** 撤销所有令牌 */
export const revokeAllTokens = () => {
  return http.request<Response<{ revoked_count: number }>>(
    "post",
    "/auth/tokens/revoke-all"
  );
};

/** 获取所有令牌（管理员） */
export const getAllTokens = (params?: {
  page?: number;
  per_page?: number;
  user_id?: string;
  is_active?: boolean;
}) => {
  return http.request<
    Response<{
      tokens: AdminTokenInfo[];
      pagination: PaginationInfo;
    }>
  >("get", "/auth/admin/tokens", { params });
};

/** 清理过期令牌（管理员） */
export const cleanupExpiredTokens = () => {
  return http.request<Response<{ cleaned_count: number }>>(
    "post",
    "/auth/admin/tokens/cleanup"
  );
};

/** 获取令牌统计（管理员） */
export const getTokenStats = () => {
  return http.request<Response<TokenStats>>("get", "/auth/admin/tokens/stats");
};
