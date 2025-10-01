# Project Monitoring Page

## UI Design Document: Network Traffic Monitoring Interface

### 1. Overall Layout Structure

- **Tab-based Navigation**: Multiple tabs for different functional pages
- **Responsive Design**: Adjustable sections with splitters

### 2. Main Page Components

#### 2.1 Search Bar Section

- **Position**: Top section of the page
- **Functionality**: Filter and search through traffic records
- **Elements**:
  - Input field for search queries
  - Filter options (optional)
  - Search button/auto-search functionality

#### 2.2 Virtualized Table Section

- **Position**: Middle section, below search bar
- **Key Features**:
  - **Virtual Scroll**: Handles 10,000+ records efficiently
  - **Adjustable Height**: Using Element Plus splitter component
  - **Columns**:
    - Method
    - URL
    - Protocol
    - Status Code
    - Status Text
    - Size
    - Time
    - Content Type
    - Timestamp
  - **Row Selection**: Click to view details in bottom panels

#### 2.3 Detail Panels Section (Bottom)

- **Layout**: Two vertical sub-blocks using splitter
- **Left Panel**: Request Details
- **Right Panel**: Response Details

##### Panel Structure (Both Request & Response)

- **Tab Navigation**:
  - **Pretty**: Formatted, readable view
  - **Raw**: Plain text view
  - **Hex**: Hexadecimal representation
- **Content Area**: Scrollable text/content display

### 3. Technical Specifications

#### 3.1 Tech Stack Required

You need to implement required elements using

- TailwindCss
- Element-plus UI

#### 3.2 Key Interactions

- Table row selection triggers detail panel updates
- Splitters allow resizing of:
  - Table height (vs detail panels)
  - Request/Response panel widths
- Tab switching within detail panels

#### 3.3 Data Flow

```
Search → Filtered Table → Row Selection → Detail Panels Update
```

### 4. Styling Requirements

- Clear visual separation between sections
- Highlight selected table row
- Distinct tab styles for active/inactive states
- Responsive splitters with visible handles

This layout maintains the functional hierarchy while improving usability through adjustable sections and efficient data handling for large datasets.

### 5. ChangeLog

#### Change 1

- instead of using the built-in virtualized table by element-plus, use customzied component ReVxeTableBar.
- make content can be shown in one screen under desktop.
- for the splitter, use el-splitter, here is a demo implementation

```vue
<template>
  <div
    style="height: 250px; box-shadow: var(--el-border-color-light) 0px 0px 10px"
  >
    <el-splitter layout="vertical">
      <el-splitter-panel>
        <div class="demo-panel">1</div>
      </el-splitter-panel>
      <el-splitter-panel>
        <div class="demo-panel">2</div>
      </el-splitter-panel>
    </el-splitter>
  </div>
</template>

<style scoped>
.demo-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
```

#### Change 2

- I want the search bar + monitoring table + request/response detail shown in a screen, instead of each component taking a screen
- currently, the Response Detail is not shown on the page, pls help debug
- instead of using RePureTableBar, use the ReVxeTableBar under src/components/ReVxeTableBar folder. below is an exmaple you can refer to

```vue
<template>
  <VxeTableBar
    :vxeTableRef="vxeTableRef"
    :columns="columns"
    title="分页表格"
    @refresh="onSearch"
  >
    <template v-slot="{ size, dynamicColumns }">
      <vxe-grid
        ref="vxeTableRef"
        v-loading="loading"
        show-overflow
        :height="getTableHeight(size)"
        :size="size"
        :column-config="{ resizable: true }"
        :columns="dynamicColumns"
        :pagerConfig="pagerConfig"
        :data="tableData"
        @page-change="handlePageChange"
      />
    </template>
  </VxeTableBar>
</template>
```
