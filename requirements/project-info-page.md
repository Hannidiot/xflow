# Project Info Page

## UI Design Document: Project Information Interface

### 1. Overall Layout Structure

- **Single Page Layout**: All content visible in one screen
- **Vertical Splitter Layout**: Two main blocks with adjustable height
- **Responsive Design**: Optimized for desktop viewing

### 2. Main Page Components

#### 2.1 Project Information Block (Top Section)

- **Position**: Top section within first splitter panel
- **Functionality**: Display basic project metadata
- **Elements**:
  - Project Name (header style)
  - Project Description (text area)
  - Disk Usage (progress bar or metric display)
  - Additional project metadata fields

#### 2.2 API List Block (Bottom Section)

- **Position**: Bottom section within second splitter panel
- **Key Features**:
  - **Refresh Button**: Dynamically reload API list
  - **Virtualized Table**: Efficient handling of large API datasets
  - **API Information Columns**:
    - API Name
    - Endpoint URL
    - Method (GET/POST/PUT/DELETE)
    - Status (Active/Inactive)
    - Response Time
    - Last Updated
    - Usage Count

### 3. Technical Specifications

#### 3.1 Tech Stack Required

You need to implement required elements using:

- TailwindCSS
- Element-plus UI components
- RePureTableBar for table implementation

#### 3.2 Key Interactions

- Refresh button triggers API list reload
- Vertical splitter allows resizing between project info and API list
- Table supports sorting, filtering, and pagination
- Real-time updates for disk usage metrics

#### 3.3 Data Flow

```
Page Load → Load Project Info → Load API List
Refresh Click → Reload API List → Update Table
```

### 4. Styling Requirements

- Clean, minimal design with clear visual hierarchy
- Proper spacing and typography scale
- Consistent card shadows and borders
- Responsive table that adapts to container size
- Clear visual feedback for loading states and interactions

### 5. ChangeLog

#### Initial Version

- Implemented two-block layout using vertical splitter
- Project information block with name, description, and disk usage
- API list block with refresh functionality using ReVxeTableBar
- Optimized for single-screen desktop viewing
