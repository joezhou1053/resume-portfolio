## Joe 个人简历 & 作品集（joe-portfolio）

### 项目简介

这是周永祥（Joe Zhou）的个人在线简历与作品集网站，基于 **Vite + React + TypeScript** 构建，使用 **Tailwind CSS** 与 **Recharts** 实现现代化 UI 和技能可视化。网站支持 **中英文切换**，并内置一个文档 / 证书管理区，用于集中展示简历、作品、学位证书和 Coursera 等职业证书。

### 主要特性

- **中英文双语切换**：一键在中文 / 英文页面之间切换（导航栏右上角按钮）。  
- **职业经历时间线**：展示在中国电信福富科技的需求分析工作经历及多个项目亮点。  
- **教育背景卡片**：展示 OSU 金融学本科学位及相关课程、荣誉。  
- **技能可视化**：通过雷达图 + 横向柱状图展示金融、数据分析、工具熟练度等维度。  
- **文档与证书管理**：
  - 分类展示：简历、作品集、OSU 学位、Coursera 证书等；
  - **作品集项目探索器**（Portfolio Project Explorer）：
    - 双栏布局设计：左侧 HR 视角（项目摘要、核心价值/产出），右侧技术证明（项目资源文件库）；
    - 支持项目包含多个子资产（BRD 文档、Visio 流程图、Python 脚本、Tableau 工作簿、React 原型代码、设计稿等）；
    - 每个子文件支持独立预览、下载，文件类型图标系统（PDF、Excel、Python、Tableau、Image、Code 等）。
  - 通过本地存储（localStorage）记录文档信息。
- **“仅本人可编辑”模式（Admin 模式）**：
  - 页脚有一个隐蔽的 `π` 按钮可切换管理员模式；
  - 管理员模式下可以为文档上传新的版本（仅保存在当前浏览器，方便演示“版本管理”概念）。

### 技术栈

- **前端框架**：React 19 + TypeScript  
- **构建工具**：Vite  
- **样式**：Tailwind CSS，自定义 `corporate-*`、`accent-*` 等主题色  
- **数据可视化**：Recharts（雷达图、柱状图）  
- **状态与存储**：React Hooks（`useState` / `useEffect`）+ 本地存储封装 `storageService.ts`

### 目录结构（简化）

```bash
joe-portfolio/
  ├─ public/                 # 静态资源（OSU logo、证书 PDF、静态图片等）
  ├─ src/
  │   ├─ assets/             # 额外图片、图标
  │   ├─ components/
  │   │   ├─ DocumentManager.tsx   # 文档/证书管理 UI 与分页、搜索等
  │   │   └─ SkillsChart.tsx       # 技能可视化图表
  │   ├─ services/
  │   │   └─ storageService.ts     # 基于 localStorage 的数据读写与版本管理
  │   ├─ constants.ts        # 中英文文案、经历、教育、文档初始数据
  │   ├─ App.tsx             # 页面整体布局 / 导航 / 各个 Section
  │   ├─ main.tsx
  │   └─ index.css
  ├─ index.html
  ├─ package.json
  ├─ vite.config.ts
  ├─ tailwind.config.js
  └─ tsconfig*.json
```

### 本地运行与构建

在 `joe-portfolio` 目录下：

```bash
npm install          # 安装依赖
npm run dev          # 启动开发环境（含 HMR）
npm run build        # 生产构建（先 tsc，再 vite build）
npm run preview      # 本地预览构建结果
```

脚本定义可在 `package.json` 的 `scripts` 中查看和修改。

### 如何修改为你自己的简历

- **文字内容 / 经历 / 项目**：
  - 集中定义在 `src/constants.ts` 中的 `CONTENT_ZH` 和 `CONTENT_EN`；
  - 修改其中的 `hero`（抬头、自我介绍）、`experience`（工作经历）、`education`（教育背景）、`skills`（硬技能 / 软技能 / 语言）即可。
- **文档和证书列表**：
  - 在 `constants.ts` 的 `INITIAL_DOCUMENTS` 中维护；
  - 每个分类（简历、作品集、证书等）以及其下 `versions` 数组可按你自己的文件名与日期调整。
- **作品集项目配置**（新增）：
  - 作品集类型（`type: 'portfolio'`）的文档支持多子文件结构；
  - 配置 `projectSummary`（项目摘要，给 HR 快速了解价值）；
  - 配置 `highlights`（核心成就/量化产出）；
  - 配置 `assets` 数组：每个子文件包含 `id`、`name`（中英文）、`type`（文件类型）、`size`、`description`（中英文说明）。
- **联系信息 / Footer**：  
  - 在 `App.tsx` 底部 Footer 中，可以替换姓名、邮箱、LinkedIn 链接等。
- **配色与样式**：  
  - Tailwind 配色主要集中在 `tailwind.config.js` 中的自定义颜色；
  - 想要更“商务”或“科技”风格，可以在该文件中统一调整色值，再运行 `npm run dev` 查看效果。

### 部署建议

- 可以将 `npm run build` 生成的 `dist/` 目录部署到任意静态托管平台，例如：  
  - GitHub Pages  
  - Netlify  
  - Vercel  
- 若放在子路径下（如 GitHub Pages 仓库名路径），记得按需调整 `vite.config.ts` 中的 `base` 配置。

如需把本项目进一步改造成在线可编辑的“简历 CMS”、接入后端或缩减为“只展示简历的一页式 Landing Page”，可以在此基础上继续扩展。
