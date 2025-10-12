import { defineFakeRoute } from "vite-plugin-fake-server/client";
import type { UserInfo, TokenInfo, AdminTokenInfo } from "@/api/auth";

// Mock data
const mockUser: UserInfo = {
  _id: "507f1f77bcf86cd799439011",
  username: "john_doe",
  email: "john@example.com",
  role: "user",
  is_active: true,
  created_at: "2024-01-01T10:00:00Z",
  last_login: "2024-01-02T15:30:00Z"
};

const mockAdminUser: UserInfo = {
  _id: "507f1f77bcf86cd799439012",
  username: "admin",
  email: "admin@example.com",
  role: "admin",
  is_active: true,
  created_at: "2024-01-01T09:00:00Z",
  last_login: "2024-01-02T16:00:00Z"
};

const generateTokens = (count: number): TokenInfo[] => {
  const tokens: TokenInfo[] = [];
  for (let i = 0; i < count; i++) {
    tokens.push({
      id: `token_${i}`,
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
      expires_at: new Date(Date.now() + (7 - i) * 86400000).toISOString(),
      is_active: i < 3
    });
  }
  return tokens;
};

const generateAdminTokens = (): AdminTokenInfo[] => {
  const users = [
    {
      _id: "507f1f77bcf86cd799439011",
      username: "john_doe",
      email: "john@example.com",
      role: "user" as const
    },
    {
      _id: "507f1f77bcf86cd799439012",
      username: "admin",
      email: "admin@example.com",
      role: "admin" as const
    },
    {
      _id: "507f1f77bcf86cd799439013",
      username: "alice",
      email: "alice@example.com",
      role: "user" as const
    }
  ];

  const tokens: AdminTokenInfo[] = [];
  let tokenId = 1;

  users.forEach(user => {
    for (let i = 0; i < 3; i++) {
      tokens.push({
        id: `token_${tokenId++}`,
        created_at: new Date(Date.now() - i * 86400000).toISOString(),
        expires_at: new Date(Date.now() + (7 - i) * 86400000).toISOString(),
        is_active: i < 2,
        user_id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        last_used: new Date(Date.now() - i * 3600000).toISOString(),
        revoked_at:
          i === 2 ? new Date(Date.now() - 3600000).toISOString() : undefined
      });
    }
  });

  return tokens;
};

export default defineFakeRoute([
  // 用户注册
  {
    url: "/auth/register",
    method: "post",
    response: ({ body }) => {
      if (!body.username || !body.email || !body.password) {
        return {
          success: false,
          message: "缺少必填字段"
        };
      }

      if (body.username === "admin") {
        return {
          success: false,
          message: "用户名已存在"
        };
      }

      return {
        success: true,
        data: {
          _id: "507f1f77bcf86cd799439011",
          username: body.username,
          email: body.email,
          role: "user",
          is_active: true
        },
        message: "注册成功"
      };
    }
  },

  // 用户登录
  {
    url: "/auth/login",
    method: "post",
    response: ({ body }) => {
      if (!body.email || !body.password) {
        return {
          success: false,
          message: "邮箱和密码不能为空"
        };
      }

      if (body.email === "admin@example.com" && body.password === "admin123") {
        return {
          success: true,
          data: {
            user_id: "507f1f77bcf86cd799439012",
            username: "admin",
            email: "admin@example.com",
            role: "admin",
            token: "eyJhbGciOiJIUzUxMiJ9.admin"
          },
          message: "登录成功"
        };
      }

      if (
        body.email === "john@example.com" &&
        body.password === "password123"
      ) {
        return {
          success: true,
          data: {
            user_id: "507f1f77bcf86cd799439011",
            username: "john_doe",
            email: "john@example.com",
            role: "user",
            token: "eyJhbGciOiJIUzUxMiJ9.user"
          },
          message: "登录成功"
        };
      }

      return {
        success: false,
        message: "邮箱或密码错误"
      };
    }
  },

  // 用户登出
  {
    url: "/auth/logout",
    method: "post",
    response: () => {
      return {
        success: true,
        data: null,
        message: "登出成功"
      };
    }
  },

  // 获取用户信息
  {
    url: "/auth/profile",
    method: "get",
    response: ({ headers }) => {
      const authHeader = headers.authorization;
      if (!authHeader || !authHeader.includes("Bearer ")) {
        return {
          success: false,
          message: "未认证"
        };
      }

      const token = authHeader.replace("Bearer ", "");
      if (token === "eyJhbGciOiJIUzUxMiJ9.admin") {
        return {
          success: true,
          data: mockAdminUser
        };
      }

      return {
        success: true,
        data: mockUser
      };
    }
  },

  // 更新用户信息
  {
    url: "/auth/profile",
    method: "put",
    response: ({ _ }) => {
      return {
        success: true,
        data: null,
        message: "更新成功"
      };
    }
  },

  // 获取用户令牌列表
  {
    url: "/auth/tokens",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          tokens: generateTokens(3)
        }
      };
    }
  },

  // 撤销所有令牌
  {
    url: "/auth/tokens/revoke-all",
    method: "post",
    response: () => {
      return {
        success: true,
        data: {
          revoked_count: 3
        },
        message: "已撤销所有令牌"
      };
    }
  },

  // 获取所有令牌（管理员）
  {
    url: "/auth/admin/tokens",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page) || 1;
      const per_page = parseInt(query.per_page) || 20;
      const allTokens = generateAdminTokens();

      // 简单的分页逻辑
      const startIndex = (page - 1) * per_page;
      const endIndex = startIndex + per_page;
      const tokens = allTokens.slice(startIndex, endIndex);

      return {
        success: true,
        data: {
          tokens,
          pagination: {
            page,
            per_page,
            total: allTokens.length,
            pages: Math.ceil(allTokens.length / per_page)
          }
        }
      };
    }
  },

  // 清理过期令牌（管理员）
  {
    url: "/auth/admin/tokens/cleanup",
    method: "post",
    response: () => {
      return {
        success: true,
        data: {
          cleaned_count: 5
        },
        message: "已清理 5 个过期令牌"
      };
    }
  },

  // 获取令牌统计（管理员）
  {
    url: "/auth/admin/tokens/stats",
    method: "get",
    response: () => {
      return {
        success: true,
        data: {
          total_tokens: 150,
          active_tokens: 120,
          expired_tokens: 30,
          today_tokens: 5,
          top_users: [
            {
              _id: "507f1f77bcf86cd799439011",
              token_count: 3,
              username: "john_doe",
              email: "john@example.com"
            },
            {
              _id: "507f1f77bcf86cd799439012",
              token_count: 2,
              username: "admin",
              email: "admin@example.com"
            }
          ]
        }
      };
    }
  }
]);
