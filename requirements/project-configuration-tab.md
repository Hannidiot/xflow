# Project Configuraiton Tab

## UI Design Document: Proxy Settings and Device Management Interface

### 1. Overall Layout Structure

- **Vertical Split Layout**: Two main sections
- **One-Screen Design**: All components visible without scrolling

### 2. Main Page Components

#### 2.1 Proxy Settings Section (Top)

- **Position**: Top section of the page
- **Functionality**: Configure proxy and certificate settings
- **Layout**: Form-based configuration panel

**Form Elements:**

- **Proxy Mode**: Dropdown selection
  - Options: [Direct, HTTP, HTTPS, SOCKS]
  - Default: Direct
- **DNS Filter**: Input field
  - Placeholder: "Enter DNS filter rules..."
- **Auto Encrypt/Decrypt**: Toggle switch
  - Label: "Enable Auto Encrypt/Decrypt"
  - Default: Off
- **Certificate Actions**: Button group
  - "Download Certificate" button

#### 2.2 Device List Section (Bottom)

- **Position**: Bottom section, below proxy settings
- **Component**: PureTable
- **Key Features**:
  - Virtual scroll for large device lists
  - Single device selection (radio buttons)
  - Test connection functionality

**Table Structure:**

```
| Selection | Device Name | IP Address | Status | Last Seen | Operations      |
|-----------|-------------|------------|--------|-----------|-----------------|
```

In the operations column, there is a "test connectivity" button.

### 3. Technical Specifications

#### 3.1 Proxy Settings Component

**Elements:**

- `el-select` for proxy mode dropdown
- `el-input` for DNS filter
- `el-switch` for auto encrypt/decrypt toggle
- `el-button` for certificate download

**Layout:**

- Form layout using `el-form` with label positioning
- Responsive grid for form items
- Action buttons aligned to the right

#### 3.2 Device List Component

**Using PureTable:**

**Table Columns Configuration:**

- **Selection Column**: Radio button type, single selection only
- **Device Info Columns**: Name, IP, Status, Last Seen
- **Action Column**: "Test Connection" button per row

### 4. Data Structure & Interactions

#### 4.1 Proxy Settings Data Model

```typescript
interface ProxySettings {
  mode: "direct" | "http" | "https" | "socks";
  dnsFilter: string;
  autoEncrypt: boolean;
}
```

#### 4.2 Device Data Model

```typescript
interface Device {
  id: string;
  name: string;
  ipAddress: string;
  status: "online" | "offline" | "unknown";
  lastSeen: Date;
  selected: boolean;
}
```

#### 4.3 Key Interactions

- Proxy settings form validation and submission
- Single device selection via radio buttons
- "Test Connection" button triggers device connectivity test
- "Add Device" button opens device addition workflow
- Splitter allows resizing between proxy settings and device list

### 5. Styling Requirements

- **Form Styling**: Clean, aligned form elements using TailwindCSS
- **Table Styling**: Clear visual hierarchy with selected row highlighting
- **Button States**: Distinct styles for primary actions and secondary buttons
- **Splitter Handle**: Visible and accessible splitter handle

### 6. Responsive Behavior

- **Minimum Sizes**: Proxy panel (30%), Device panel (50%)
- **Mobile Adaptation**: Stack layout on small screens
- **Table Responsiveness**: Horizontal scroll for many columns

### 7. Implementation Notes

- Use Element Plus form validation for proxy settings
- Implement radio button selection with VXE table radio column type
- Ensure "Test Connection" button has loading state during operation
- "Add Device" button should integrate with existing device management system

This design maintains the functional requirements while ensuring all components are visible in a single screen with adjustable sections for optimal user experience.

### 8. Implement Requirements

1. put model definition under @src/api folder, remember to check if similar model exists before
2. for all mock data, fetch them from api, you can refer to @/src/api/device.ts
3. for return value of mock data, mock them in @/mock folder, you can refer to @/mock/device.ts
4. for table columns, create a new ts file under @/src/views/project folder, and use columns from there.

### 9. Changelog

#### 1. Initial Version

#### 2. v2

1. for device management, use DeviceSelection component instead, refer to content under @/src\components\DeviceSelection folder. You can keep the header.
