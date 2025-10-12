import { http, type Response } from "@/utils/http";

export type LanguageInfo = {
  code: string;
  name: string;
  native_name: string;
};

export type LanguagesResponse = {
  languages: LanguageInfo[];
  current_language: string;
};

export type SetLanguageRequest = {
  language: string;
};

/** 获取支持的语言列表 */
export const getLanguages = (params?: { lang?: string }) => {
  return http.request<Response<LanguagesResponse>>("get", "/i18n/languages", {
    params
  });
};

/** 获取当前语言 */
export const getCurrentLanguage = (params?: { lang?: string }) => {
  return http.request<Response<{ language: string }>>("get", "/i18n/language", {
    params
  });
};

/** 设置当前语言 */
export const setCurrentLanguage = (
  data: SetLanguageRequest,
  params?: { lang?: string }
) => {
  return http.request<Response<{ language: string }>>(
    "post",
    "/i18n/language",
    { data, params }
  );
};
