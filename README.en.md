## Joe Portfolio & Resume (joe-portfolio)

### Overview

This project is Joe Zhou’s personal **online resume and portfolio** site, built with **Vite + React + TypeScript** and styled with **Tailwind CSS**. It supports **English/Chinese bilingual content**, visualizes key skills with **Recharts**, and includes a document hub to showcase resumes, project work, degree certificates, and Coursera credentials.

### Main Features

- **Bilingual UI (EN / 中文)**: Toggle language via the button in the top-right of the navigation bar.  
- **Professional Experience Timeline**: Highlights Joe’s work as a Requirements Analysis Engineer at China Telecom Fujian, including several representative projects.  
- **Education Card**: Displays OSU Finance degree, key coursework, and academic highlights.  
- **Skills Visualization**:
  - Radar chart for core competencies (finance, analytics, communication, English, product, tech stack);
  - Horizontal bar chart for tools such as SQL, Excel, Tableau, Visio, Python.
- **Document & Certificate Management**:
  - Categories for resumes, portfolio artifacts, OSU degree, Coursera certificates, etc.;
  - Simulated online preview and download actions;
  - Backed by localStorage for storing metadata and version info in the browser.
- **“Only I can edit” Admin Mode**:
  - A subtle `π` button in the footer toggles admin mode;
  - In admin mode, you can upload new “versions” of documents (stored only in the current browser, suitable for demoing versioning).

### Tech Stack

- **Framework**: React 19 + TypeScript  
- **Build Tool**: Vite  
- **Styling**: Tailwind CSS with custom `corporate-*` and `accent-*` color tokens  
- **Charts**: Recharts (radar and bar charts)  
- **State & Storage**: React Hooks (`useState`, `useEffect`) + localStorage abstraction (`storageService.ts`)

### Simplified Structure

```bash
joe-portfolio/
  ├─ public/                 # Static assets (OSU logo, PDFs, images, etc.)
  ├─ src/
  │   ├─ assets/             # Additional icons / images
  │   ├─ components/
  │   │   ├─ DocumentManager.tsx   # Document/certificate UI, pagination, search
  │   │   └─ SkillsChart.tsx       # Radar + bar charts for skills
  │   ├─ services/
  │   │   └─ storageService.ts     # localStorage-based data and version management
  │   ├─ constants.ts        # EN/ZH content, experience, education, initial documents
  │   ├─ App.tsx             # Layout, navigation, sections (hero, experience, skills, docs)
  │   ├─ main.tsx
  │   └─ index.css
  ├─ index.html
  ├─ package.json
  ├─ vite.config.ts
  ├─ tailwind.config.js
  └─ tsconfig*.json
```

### Local Development & Build

From inside `joe-portfolio`:

```bash
npm install          # Install dependencies
npm run dev          # Start dev server with HMR
npm run build        # Type-check + production build
npm run preview      # Preview the built app locally
```

You can adjust or extend these commands in `package.json` under `scripts`.

### Customizing It for Yourself

- **Text content / experience / projects**:  
  - Defined in `src/constants.ts` as `CONTENT_EN` and `CONTENT_ZH`;  
  - Update sections like `hero`, `experience`, `education`, and `skills` to match your own background.
- **Documents and certificates**:  
  - Managed in the `INITIAL_DOCUMENTS` array in `constants.ts`;  
  - Each category and its `versions` list can be changed to your actual filenames, sizes, and dates.
- **Contact info / footer**:  
  - Update the footer in `App.tsx` (name, email, LinkedIn URL, etc.).
- **Branding & theme**:  
  - Tailwind color tokens live in `tailwind.config.js`;  
  - Tweak these colors to shift the look from “corporate” to “techy”, “minimal”, etc.

### Deployment

- Run `npm run build`, then deploy the `dist/` folder to any static hosting provider, such as:
  - GitHub Pages  
  - Netlify  
  - Vercel  
- If deploying under a sub-path (like a GitHub Pages project site), set the `base` option in `vite.config.ts` accordingly.

This project can also be extended into a small “resume CMS” (with editable content and a backend) or simplified into a single-page landing site depending on your needs.