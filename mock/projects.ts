import { defineFakeRoute } from "vite-plugin-fake-server/client";
import type { Project, ProjectType } from "@/api/projects";

// Mock data
const projectTypes: ProjectType[] = [
  {
    _id: "507f1f77bcf86cd799439011",
    name: "Web应用",
    code: "web",
    description: "基于Web的应用程序"
  },
  {
    _id: "507f1f77bcf86cd799439012",
    name: "移动应用",
    code: "mobile",
    description: "移动端应用程序"
  },
  {
    _id: "507f1f77bcf86cd799439013",
    name: "桌面应用",
    code: "desktop",
    description: "桌面端应用程序"
  },
  {
    _id: "507f1f77bcf86cd799439014",
    name: "API服务",
    code: "api",
    description: "API服务和后端系统"
  }
];

const generateProjects = (count: number): Project[] => {
  const projects: Project[] = [];
  const types = ["web", "mobile", "desktop", "api"];
  const names = [
    "电商平台",
    "社交应用",
    "管理系统",
    "数据分析平台",
    "移动端APP",
    "Web门户",
    "API网关",
    "微服务架构"
  ];

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const name = names[Math.floor(Math.random() * names.length)] + ` ${i + 1}`;

    projects.push({
      _id: `project_${i}`,
      name,
      description: `这是一个${projectTypes.find(t => t.code === type)?.name}项目，专注于提供优质的用户体验和功能`,
      type,
      user_id: "507f1f77bcf86cd799439011",
      created_at: new Date(
        Date.now() - Math.random() * 86400000 * 365
      ).toISOString(),
      updated_at: new Date(
        Date.now() - Math.random() * 86400000 * 30
      ).toISOString()
    });
  }

  return projects;
};

const allProjects = generateProjects(50);

export default defineFakeRoute([
  // 获取用户的项目列表
  {
    url: "/projects/",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page) || 1;
      const per_page = parseInt(query.per_page) || 20;
      const type = query.type;

      // 筛选项目
      let filteredProjects = allProjects;
      if (type) {
        filteredProjects = allProjects.filter(project => project.type === type);
      }

      // 分页
      const startIndex = (page - 1) * per_page;
      const endIndex = startIndex + per_page;
      const projects = filteredProjects.slice(startIndex, endIndex);

      return {
        code: "200",
        data: {
          projects,
          pagination: {
            page,
            per_page,
            total: filteredProjects.length,
            pages: Math.ceil(filteredProjects.length / per_page)
          }
        }
      };
    }
  },

  // 创建新项目
  {
    url: "/projects/",
    method: "post",
    response: ({ body }) => {
      if (!body.name) {
        return {
          code: "400",
          message: "缺少必填字段: name"
        };
      }

      // 检查项目名是否已存在
      const existingProject = allProjects.find(p => p.name === body.name);
      if (existingProject) {
        return {
          code: "400",
          message: "项目名已存在"
        };
      }

      const newProject: Project = {
        _id: `project_${allProjects.length}`,
        name: body.name,
        description: body.description,
        type: body.type,
        user_id: "507f1f77bcf86cd799439011",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      allProjects.unshift(newProject);

      return {
        code: "200",
        data: newProject,
        message: "项目创建成功"
      };
    }
  },

  // 获取项目详情
  {
    url: "/projects/:project_id",
    method: "get",
    response: ({ params }) => {
      const project = allProjects.find(p => p._id === params.project_id);

      if (!project) {
        return {
          code: "400",
          message: "项目不存在"
        };
      }

      return {
        code: "200",
        data: project
      };
    }
  },

  // 更新项目
  {
    url: "/projects/:project_id",
    method: "put",
    response: ({ params, body }) => {
      const projectIndex = allProjects.findIndex(
        p => p._id === params.project_id
      );

      if (projectIndex === -1) {
        return {
          code: "400",
          message: "项目不存在"
        };
      }

      // 检查项目名是否与其他项目冲突
      if (body.name) {
        const nameExists = allProjects.some(
          (p, index) => index !== projectIndex && p.name === body.name
        );
        if (nameExists) {
          return {
            code: "400",
            message: "项目名已存在"
          };
        }
      }

      // 更新项目
      allProjects[projectIndex] = {
        ...allProjects[projectIndex],
        ...body,
        updated_at: new Date().toISOString()
      };

      return {
        code: "200",
        data: null,
        message: "项目更新成功"
      };
    }
  },

  // 删除项目
  {
    url: "/projects/:project_id",
    method: "delete",
    response: ({ params }) => {
      const projectIndex = allProjects.findIndex(
        p => p._id === params.project_id
      );

      if (projectIndex === -1) {
        return {
          code: "400",
          message: "项目不存在"
        };
      }

      allProjects.splice(projectIndex, 1);

      return {
        code: "200",
        data: null,
        message: "项目删除成功"
      };
    }
  },

  // 获取项目类型列表
  {
    url: "/projects/project/types",
    method: "get",
    response: () => {
      return {
        code: "200",
        data: projectTypes
      };
    }
  }
]);
