# Joe 作品集（joe-portfolio）

## 项目简介
这是一个基于 Vite + React + TypeScript 的个人作品集/简历项目模版，用于在线展示个人信息和技能图表。项目使用 Tailwind CSS 做样式，结构清晰，便于扩展和部署。

## 主要功能
- 静态前端展示个人简历与项目作品
- 技能可视化（饼图/雷达或自定义图表）
- 文档/资源管理组件（上传/浏览/下载）

## 目录结构（简化视图）

```
joe-portfolio/
  ├─ public/                 # 静态资源（favicon、静态图片等）
  ├─ src/
  │   ├─ assets/             # 图片、字体等静态资源
  │   ├─ components/         # React 组件
  │   │   ├─ DocumentManager.tsx
  │   │   └─ SkillsChart.tsx
  │   ├─ services/           # 封装的服务（如本地存储）
  │   │   └─ storageService.ts
  │   ├─ App.tsx
  │   ├─ main.tsx
  │   └─ index.css
  ├─ index.html
  ├─ package.json
  ├─ vite.config.ts
  ├─ tailwind.config.js
  └─ tsconfig.json
```

## 关键文件说明
- `index.html`：应用入口页面。  
- `package.json`：依赖与脚本（运行、构建等）。  
- `vite.config.ts`：Vite 配置。  
- `src/main.tsx`：React 应用挂载入口。  
- `src/App.tsx`：主视图容器。  
- `src/components/DocumentManager.tsx`：文档/资源管理相关组件。  
- `src/components/SkillsChart.tsx`：技能图表组件。  
- `src/services/storageService.ts`：本地存储封装（例如保存设置或上传记录）。

## 本地运行（常用步骤）

1. 安装依赖：

```bash
npm install
```

2. 启动开发服务器（热重载）：

```bash
npm run dev
```

3. 本地预览构建产物：

```bash
npm run build
npm run preview
```

（如果脚本名不同，请检查 `package.json` 中的 `scripts`）

## 开发建议
- 组件划分：将独立功能拆成更小的组件，方便复用与测试。  
- 样式：项目已使用 Tailwind，建议通过 `tailwind.config.js` 统一颜色与间距。  
- 数据：若未来需要持久化或多人协作，考虑加入轻量后端或使用第三方托管（如 GitHub Pages / Netlify / Vercel）。

## 如何定制简历内容
- 个人信息/项目数据通常在 `src` 下某个常量文件（如 `constants.ts`）或组件的 props 中维护，直接替换或扩展数组即可。  
- 图片与静态资源放到 `public/` 或 `src/assets/`，组件中按需引用。

## 其他/联系方式
如需我帮你：
- 将 README 翻成英文版；
- 增加部署脚本（GitHub Actions）；
- 改造为可编辑的简历 CMS；
请告诉我你想做的下一步。
