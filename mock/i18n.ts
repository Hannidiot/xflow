import { defineFakeRoute } from "vite-plugin-fake-server/client";
import type { LanguagesResponse } from "@/api/i18n";

const languages: LanguagesResponse = {
  languages: [
    {
      code: "zh_CN",
      name: "Chinese (Simplified)",
      native_name: "简体中文"
    },
    {
      code: "en_US",
      name: "English (US)",
      native_name: "English"
    },
    {
      code: "ja_JP",
      name: "Japanese",
      native_name: "日本語"
    }
  ],
  current_language: "zh_CN"
};

const getMessage = (lang?: string) => {
  const messages = {
    zh_CN: {
      languages_success: "获取语言列表成功",
      language_success: "获取当前语言成功",
      set_language_success: "语言设置成功",
      missing_language: "缺少语言参数",
      unsupported_language: "不支持的语言"
    },
    en_US: {
      languages_success: "Language list retrieved successfully",
      language_success: "Current language retrieved successfully",
      set_language_success: "Language set successfully",
      missing_language: "Missing language parameter",
      unsupported_language: "Unsupported language"
    },
    ja_JP: {
      languages_success: "言語リストの取得が成功しました",
      language_success: "現在の言語の取得が成功しました",
      set_language_success: "言語設定が成功しました",
      missing_language: "言語パラメータがありません",
      unsupported_language: "サポートされていない言語"
    }
  };

  return messages[lang as keyof typeof messages] || messages.zh_CN;
};

export default defineFakeRoute([
  // 获取支持的语言列表
  {
    url: "/i18n/languages",
    method: "get",
    response: ({ query }) => {
      const lang = query.lang || "zh_CN";
      const messages = getMessage(lang);

      return {
        code: "200",
        message: messages.languages_success,
        data: {
          languages: languages.languages,
          current_language: lang
        }
      };
    }
  },

  // 获取当前语言
  {
    url: "/i18n/language",
    method: "get",
    response: ({ query }) => {
      const lang = query.lang || "zh_CN";
      const messages = getMessage(lang);

      return {
        code: "200",
        message: messages.language_success,
        data: {
          language: lang
        }
      };
    }
  },

  // 设置当前语言
  {
    url: "/i18n/language",
    method: "post",
    response: ({ body, query }) => {
      const lang = query.lang || "zh_CN";
      const messages = getMessage(lang);

      if (!body.language) {
        return {
          code: "400",
          message: messages.missing_language
        };
      }

      const supportedLanguages = ["zh_CN", "en_US", "ja_JP"];
      if (!supportedLanguages.includes(body.language)) {
        return {
          code: "400",
          message: messages.unsupported_language
        };
      }

      return {
        code: "200",
        message: messages.set_language_success,
        data: {
          language: body.language
        }
      };
    }
  }
]);
