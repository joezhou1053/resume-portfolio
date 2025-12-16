# Joe Portfolio (joe-portfolio)

## Project Overview
This is a personal portfolio/resume template built with Vite + React + TypeScript. It uses Tailwind CSS for styling and is organized for easy extension and deployment.

## Key Features
- Static front-end for presenting personal info and projects
- Skills visualization (charts such as radar or custom charts)
- Document/resource management component (upload/browse/download)

## Simplified Project Structure

```
joe-portfolio/
  ├─ public/                 # Static assets (favicon, static images, etc.)
  ├─ src/
  │   ├─ assets/             # Images, fonts, and other static assets
  │   ├─ components/         # React components
  │   │   ├─ DocumentManager.tsx
  │   │   └─ SkillsChart.tsx
  │   ├─ services/           # Encapsulated services (e.g., local storage)
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

## Important Files
- `index.html`: Application entry page.
- `package.json`: Dependencies and scripts (run, build, etc.).
- `vite.config.ts`: Vite configuration.
- `src/main.tsx`: React app mount entry.
- `src/App.tsx`: Main application container.
- `src/components/DocumentManager.tsx`: Document/resource management UI.
- `src/components/SkillsChart.tsx`: Skills visualization component.
- `src/services/storageService.ts`: Local storage wrapper (e.g., for settings or upload records).

## Local Development (common steps)

1. Install dependencies:

```bash
npm install
```

2. Start dev server (hot reload):

```bash
npm run dev
```

3. Build and preview production bundle:

```bash
npm run build
npm run preview
```

(If your script names differ, check `package.json` for exact `scripts`.)

## Recommendations for Development
- Componentization: Split independent features into smaller components for reuse and testing.
- Styling: The project uses Tailwind — keep shared colors and spacing in `tailwind.config.js`.
- Data persistence: If you need persistence or multi-user features later, consider adding a lightweight backend or using hosted services (GitHub Pages / Netlify / Vercel).

## How to Customize the Resume Content
- Personal info and project data are usually stored in a constants file (e.g., `src/constants.ts`) or passed as component props — update those arrays/objects directly.
- Put images and static assets in `public/` or `src/assets/` and reference them in components as needed.

## Next Steps / Offer
If you want, I can also:
- Translate this README back into Chinese or polish wording;
- Add deployment instructions for GitHub Pages or Vercel;
- Turn the portfolio into an editable CMS.

Tell me which you'd like next.