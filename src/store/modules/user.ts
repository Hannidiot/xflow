import { defineStore } from "pinia";
import {
  type userType,
  store,
  router,
  resetRouter,
  routerArrays,
  storageLocal
} from "../utils";
import type { Response } from "@/utils/http";
import {
  type LoginRequest,
  type LoginResponseData,
  loginUser,
  logoutUser
} from "@/api/auth";
import { useMultiTagsStoreHook } from "./multiTags";
import { type DataInfo, setToken, removeToken, userKey } from "@/utils/auth";

export const useUserStore = defineStore("pure-user", {
  state: (): userType => ({
    // 用户名
    username: storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "",
    // 昵称
    nickname: storageLocal().getItem<DataInfo<number>>(userKey)?.nickname ?? "",
    // 页面级别权限
    roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
    // 按钮级别权限
    permissions:
      storageLocal().getItem<DataInfo<number>>(userKey)?.permissions ?? [],
    // 是否勾选了登录页的免登录
    isRemembered: false,
    // 登录页的免登录存储几天，默认7天
    loginDay: 7
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储昵称 */
    SET_NICKNAME(nickname: string) {
      this.nickname = nickname;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储按钮级别权限 */
    SET_PERMS(permissions: Array<string>) {
      this.permissions = permissions;
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_ISREMEMBERED(bool: boolean) {
      this.isRemembered = bool;
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGINDAY(value: number) {
      this.loginDay = Number(value);
    },
    /** 登入 */
    async loginByUsername(data: LoginRequest) {
      return new Promise<Response<LoginResponseData>>((resolve, reject) => {
        loginUser(data)
          .then(response => {
            if (response?.data) {
              // Transform the new API response to match the expected format
              const transformedData = {
                accessToken: response.data.token,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Default 24 hours expiry
                username: response.data.username,
                nickname: response.data.username,
                roles: [response.data.role],
                permissions: [] // No permissions field in new API response
              };
              setToken(transformedData);
            }
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 登出 */
    async logOut() {
      try {
        // Call logout API
        await logoutUser();
      } catch (error) {
        console.error("Logout API call failed:", error);
        // Continue with local logout even if API call fails
      }
      this.username = "";
      this.roles = [];
      this.permissions = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
