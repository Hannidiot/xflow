# Project List Page

Here’s a **professional design document (layout specification)** for the UI shown in your screenshot — written for a **frontend engineer** to begin implementation efficiently.

---

## 🎨 Design Document: 项目管理页面 (Project Management Page)

### 1. Overview

This page is the main interface for managing and monitoring traffic analysis projects.
It includes:

- A header area for title and page description.
- A search/filter bar for querying projects.
- A table area listing all existing projects with actions and pagination.
- A button to create new projects and batch operations.

---

### 2. Layout Structure

| Section                   | Description                                         | Notes                                  |
| ------------------------- | --------------------------------------------------- | -------------------------------------- |
| **Header Section**        | Displays page title and description                 | Fixed top within page container        |
| **Search Bar Section**    | Contains project filters and search/reset buttons   | Aligned horizontally                   |
| **Project Table Section** | Main data list with actions, badges, and pagination | Scrollable if content exceeds viewport |
| **Create Project Button** | Located at top-right of search area                 | Primary CTA button                     |

---

### 3. Detailed Layout Specification

#### 3.1 Header Area

| Item              | Details                                       |
| ----------------- | --------------------------------------------- |
| **Title**         | `项目管理`                                    |
| **Subtitle**      | `管理和监控您的流量分析项目`                  |
| **Font**          | Title: 20–24px bold; Subtitle: 14–16px normal |
| **Padding**       | Top 24px / Left 24px                          |
| **Background**    | White (`#fff`)                                |
| **Border Bottom** | Light gray divider (`#eee`)                   |

---

#### 3.2 Search / Filter Area

| Item         | Type             | Description                            |
| ------------ | ---------------- | -------------------------------------- |
| 项目名称     | Input box        | Placeholder: `请输入项目名称`          |
| 产品类型     | Dropdown         | Placeholder: `请选择产品`              |
| 状态         | Dropdown         | Placeholder: `请选择状态`              |
| 搜索按钮     | Primary button   | Color: Blue (`#409EFF`), label: `搜索` |
| 重置按钮     | Secondary button | Light border, label: `重置`            |
| 创建项目按钮 | Primary button   | Top-right aligned; label: `+ 创建项目` |

**Layout**

- Horizontal alignment (`display: flex; align-items: center; gap: 12px;`)
- Margin top: 16px
- Padding: 16px 24px
- Background: `#fff`
- Border-radius: 8px
- Box-shadow (optional): `0 1px 4px rgba(0,0,0,0.05)`

---

#### 3.3 Table Area

**Table Columns**

| Column   | Description                         | Example                      |
| -------- | ----------------------------------- | ---------------------------- |
| 选择框   | Checkbox for batch operations       | —                            |
| 项目名称 | Project name with clickable link    | 电商平台V1                   |
| 状态标签 | Badge showing "活跃"/"非活跃"       | Green or gray pill           |
| 产品类型 | e.g. 电商平台 / 移动应用 / 企业系统 | Text only                    |
| 描述     | Project brief                       | 电商平台第一版本             |
| 流量抓取 | Switch component                    | ON = active / OFF = inactive |
| 代理状态 | Badge                               | Green: 运行中 / Red: 已停止  |
| API数量  | Numeric                             | e.g., 156                    |
| 总流量   | e.g., 1.3M                          | Unit M, GB                   |
| 磁盘占用 | e.g., 2.3GB                         | —                            |
| 更新时间 | e.g., 2024-01-20                    | YYYY-MM-DD                   |
| 操作     | Links: `详情`, `编辑`, `删除`       | Use icons + text             |

**Table Styling**

- Background: `#fff`
- Border-radius: 8px
- Header row: bold font, light background `#f8f8f8`
- Row hover: `background-color: #f5f7fa`
- Font size: 14px
- Padding: 12px per cell
- Border: `1px solid #ebeef5`
- Column alignment:
  - Text left: 项目名称, 描述, 产品类型
  - Center: 状态, 流量抓取, 操作

---

#### 3.4 Pagination Area

| Element            | Description                                |
| ------------------ | ------------------------------------------ |
| Total count        | e.g. `Total 3`                             |
| Page size selector | Dropdown: `10 / 20 / 50`                   |
| Page navigation    | Standard pagination with page number input |
| Layout             | Right-aligned under table                  |

---

### 4. Responsive Behavior

| Breakpoint | Behavior                                             |
| ---------- | ---------------------------------------------------- |
| ≥1200px    | Full layout as shown                                 |
| 768–1199px | Filters wrap into 2 rows                             |
| ≤767px     | Table scrolls horizontally; buttons stack vertically |

---

### 5. Component Suggestions

| Component                                                   | Recommended UI library (if applicable)         |
| ----------------------------------------------------------- | ---------------------------------------------- |
| Input / Select / Button / Table / Pagination / Switch / Tag | [Element Plus](https://element-plus.org/)      |
| Layout Container                                            | `<el-card>` or `<div>` with custom class       |
| Icons                                                       | Element Plus or custom SVG (eye, edit, delete) |

---

### 6. Color / Theme

| Purpose          | Color     | Note                 |
| ---------------- | --------- | -------------------- |
| Primary          | `#409EFF` | Buttons / highlights |
| Success          | `#67C23A` | Active tags          |
| Danger           | `#F56C6C` | Error / stop         |
| Text main        | `#303133` | Title                |
| Text secondary   | `#606266` | Subtitle             |
| Border / Divider | `#E4E7ED` | Table lines          |

---

### 7. Interaction Logic

| Action                | Description                                      |
| --------------------- | ------------------------------------------------ |
| 点击“搜索”            | Trigger query with filters                       |
| 点击“重置”            | Clear filters                                    |
| 点击“创建项目”        | Opens creation modal or navigates to create page |
| 开关流量抓取          | Toggle project data capture                      |
| 点击“详情/编辑/删除”  | Perform respective actions                       |
| 勾选复选框 + 批量删除 | Enables batch delete button                      |

---

### 8. Changelog

#### 1. Inital Version

#### 2. Implement API changes

- new api for projects are placed under '/src/api/projects.ts', pls do changes accordingly. It should include model definition, column defintion.
- The product type is dynamically loaded via api call in onMount hook, and current filter logic on product type is not correct.
- Implement the Create Project button, it opens a dialog which contains a form. After submitting the form, it will call web api and create the project. You can refer to below files
  - '/src/views/test/dialog.vue'
  - '/src/views/test/dialog-form.vue'
  - '/src/views/test/utils/rule.ts'
  - '/src/views/test/utils/type.ts'
- Instead of using scoped css, use tailwindcss instead.
