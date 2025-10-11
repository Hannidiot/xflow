# 🧩 Design Document: Project Comparison Page (项目对比页面)

### 1. Overview

This page allows users to **compare two existing projects** side by side and analyze their differences in APIs and vulnerabilities.
The layout style, typography, and color scheme should remain consistent with the **Project Management Page**, ensuring a unified user experience across the system.

---

### 2. Layout Structure

| Section                       | Description                                             | Notes                                                                      |
| ----------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Header Section**            | Displays page title and description                     | Consistent top spacing and typography                                      |
| **Project Selection Section** | Allows user to choose two projects and start comparison | Includes dropdowns and “Compare” button                                    |
| **Comparison Result Section** | Displays differences once the backend responds          | Contains two `DiffTable` components: one for APIs, one for vulnerabilities |

---

### 3. Detailed Layout Specification

#### 3.1 Header Area

| Item              | Details                                                   |
| ----------------- | --------------------------------------------------------- |
| **Title**         | `Project Comparison` (项目对比)                           |
| **Subtitle**      | `Compare details and configurations between two projects` |
| **Font**          | Title: 20–24px bold; Subtitle: 14–16px regular            |
| **Padding**       | `24px 24px 16px 24px`                                     |
| **Background**    | White (`#fff`)                                            |
| **Border Bottom** | `1px solid #eee`                                          |

---

#### 3.2 Project Selection Section

| Element            | Type           | Description                                       | Example                         |
| ------------------ | -------------- | ------------------------------------------------- | ------------------------------- |
| Project A Dropdown | Select         | Dropdown list of existing projects                | Placeholder: “Select Project A” |
| Project B Dropdown | Select         | Dropdown list of existing projects                | Placeholder: “Select Project B” |
| Compare Button     | Primary Button | Initiates server request to fetch comparison data | Label: `Compare`                |

**Layout**

- Display horizontally (`display: flex; align-items: center; gap: 12px;`)
- Right-aligned “Compare” button
- Padding: `16px 24px`
- Background: `#fff`
- Border-radius: `8px`
- Box-shadow (optional): `0 1px 4px rgba(0,0,0,0.05)`

**Validation**

- “Compare” button disabled until both projects are selected
- Tooltip message if same project selected twice: “Please select two different projects”

---

#### 3.3 Comparison Result Section

Shown **after** a successful API response.
The section is divided into two main sub-panels — one for API comparison, one for vulnerability comparison.

##### (1) API Comparison

| Element   | Type                   | Description                                                |
| --------- | ---------------------- | ---------------------------------------------------------- |
| Title     | Section header         | “API Comparison”                                           |
| DiffTable | Custom table component | Highlights additions, deletions, and modifications in APIs |

**Styling**

- Title font: 16–18px bold
- Margin top: 24px
- DiffTable background: `#fff`
- Row highlight colors:
  - Added: green background (`#f0f9eb`)
  - Removed: red background (`#fef0f0`)
  - Changed: yellow background (`#fdf6ec`)

##### (2) Vulnerability Comparison

| Element   | Type                   | Description                                |
| --------- | ---------------------- | ------------------------------------------ |
| Title     | Section header         | “Vulnerability Comparison”                 |
| DiffTable | Custom table component | Displays differences in vulnerability data |

**Styling**

- Same as API Comparison
- Optional “Collapse” toggle to hide/show details

---

### 4. Interaction Flow

| Step | User Action                          | System Behavior                         |
| ---- | ------------------------------------ | --------------------------------------- |
| 1    | User selects Project A and Project B | Dropdowns update bound values           |
| 2    | User clicks “Compare”                | Trigger API request to server           |
| 3    | Server returns diff result           | Render API and vulnerability DiffTables |
| 4    | User reviews differences             | Rows visually highlight changed fields  |

---

### 5. Component Layout Summary

| Component         | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| `HeaderBar`       | Reused component for title/subtitle                                  |
| `ProjectSelector` | Includes two `<el-select>` and one `<el-button>`                     |
| `DiffTable`       | Custom component showing key differences with color-coded highlights |
| `ResultPanel`     | Wraps two DiffTables with section titles                             |

---

### 6. Example Visual Hierarchy (Simplified)

```

┌────────────────────────────────────────────┐
│ Project Comparison                         │
│ Compare details and configurations         │
├────────────────────────────────────────────┤
│ [Project A ▼]  [Project B ▼]   [Compare]   │
├────────────────────────────────────────────┤
│ API Comparison                             │
│ ┌───────────────────────────────────────┐  │
│ │ DiffTable(API changes)                │  │
│ └───────────────────────────────────────┘  │
│                                            │
│ Vulnerability Comparison                   │
│ ┌───────────────────────────────────────┐  │
│ │ DiffTable(Vulnerability changes)      │  │
│ └───────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

---

### 7. Color / Theme Consistency

| Purpose        | Color                    | Note                                  |
| -------------- | ------------------------ | ------------------------------------- |
| Primary Button | `#409EFF`                | Same as “Search” and “Create Project” |
| Added Row      | `#f0f9eb` (light green)  | Added content                         |
| Removed Row    | `#fef0f0` (light red)    | Deleted content                       |
| Modified Row   | `#fdf6ec` (light yellow) | Changed content                       |
| Text main      | `#303133`                |                                       |
| Text secondary | `#606266`                |                                       |
| Border         | `#E4E7ED`                |                                       |

---

### 8. Implement Requirements

1. put model definition under @src/api folder, remember to check if similar model exists before
2. for all mock data, fetch them from api, you can refer to @/src/api/device.ts
3. for return value of mock data, mock them in @/mock folder, you can refer to @/mock/device.ts
4. for table columns, create a new ts file under @/src/views/project folder, and use columns from there.

### 9. Changelog

#### 1. Initial Version

#### 2. v2

1. for table implementation, use pure-table instead of el-table, you can refer to @/src/components/DeviceSelection/src/index.tsx or @/src\views\test\data-intensity-table.vue. Also remember to modify the column definition tsx file to follow the type definition
2. use tailwindcss instead of these scoped css statement.
