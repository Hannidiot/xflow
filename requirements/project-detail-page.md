# Project Detail Page

It contains the detail info of a certain project, which contains below tabs:

1. Project Info tab ('/src/views/project/index.vue')
2. Project Scan Configuration tab ('/src/views/project/configuration.vue')
3. Realtime Flow Monitoring tab ('/src/views/monitoring/index.vue')
4. API Analysis tab ('/src/views/project/api-analysis.vue')

## Requirements

- It cannot be accessed directly from the navigation bar. Instead, user needs to click a project in the project-list page to jump to this page. So this component takes a projectId parameter before being loaded.
- Implement this with a el-tab element, you can refer to '/src/views/test/multi-tabs.vue'
- Above the tab section, there is a header, left side is a back button to return to project-list page, then follows with title of this project. Right side is a status block to show if the scan is active or inactive.
- use tailwindcss instead of scoped css
