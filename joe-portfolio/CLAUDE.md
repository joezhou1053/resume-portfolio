# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual (English/Chinese) portfolio website for Joe Zhou, a Business Analyst/Financial Data Specialist. The site showcases professional experience, education, skills, and provides a document management system for resumes, certificates, and portfolio pieces.

**Tech Stack:**
- React 19 + TypeScript
- Vite (build tool & dev server)
- Tailwind CSS (styling with custom corporate theme)
- Recharts (data visualization for skills)
- LocalStorage (document metadata persistence)

## Development Commands

```bash
# Start development server (HMR enabled)
npm run dev

# Build for production (TypeScript compilation + Vite bundling)
npm run build

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Architecture & Key Patterns

### Bilingual Content System
The app supports English (`en`) and Chinese (`zh`) languages through a centralized content system:

- **Type definitions**: `src/types.ts` - Defines all content structures (Experience, Education, Skills, Documents)
- **Content constants**: `src/constants.ts` - Contains `CONTENT_EN` and `CONTENT_ZH` with all translatable strings
- **Language state**: Managed in `App.tsx`, passed down to components via props

**Language toggle pattern**: When language changes in `App.tsx:17`, a `useEffect` updates the content state. All child components receive the current language as a prop and use it to select the appropriate translated strings (e.g., `title[language]`).

**When adding new content**: Always update both `CONTENT_EN` and `CONTENT_ZH` to maintain bilingual support.

### Document Management System

The document system is a key feature with version control and category-based organization:

**Data Flow:**
1. Initial documents defined in `constants.ts` → `INITIAL_DOCUMENTS`
2. On first load, `storageService.ts` initializes LocalStorage with initial data
3. User interactions (upload new version) update LocalStorage
4. Components re-render from LocalStorage state

**Key Files:**
- `src/services/storageService.ts` - Handles all LocalStorage operations (get, upload, version management)
- `src/components/DocumentManager.tsx` - Three-view hierarchy:
  - Category view (grid of document categories)
  - Detail view (paginated items within a category)
  - Preview modal (iframe-based document preview)

**Storage Key**: `joe_zhou_portfolio_v5_categories` (versioned to allow data migration)

**Version Control Pattern:**
- Each document has multiple versions with `isCurrent` flag
- New versions increment version number, mark old as non-current
- Uploads create metadata only - actual file serving handled from `/public` directory

### Admin Mode

A simple client-side admin system for document updates:
- Toggle via hidden π button in footer
- State stored in LocalStorage (`is_admin` key)
- When enabled: shows "Update Version" upload controls on document cards
- Used to upload new document versions without backend

**Note**: This is a demo/prototyping feature. In production, file uploads would require a backend.

### Custom Color Theme

Tailwind extended theme in `tailwind.config.js`:
- `corporate-*`: Navy blue scale (#061729, #102a43, #334e68)
- `accent-*`: Bright blue (#007aff, #0062cc)
- Used consistently across components for professional aesthetic

### Component Structure

```
App.tsx (main layout + routing)
├── SkillsChart.tsx (Recharts visualizations)
└── DocumentManager.tsx (document browser)
```

**App.tsx Sections:**
- Navigation (sticky header with language toggle)
- Hero (gradient background with CTAs)
- Experience (timeline with project cards)
- Skills (education column + charts)
- Documents (category browser)

**DocumentManager View Hierarchy:**
The component uses conditional rendering to show three distinct views:
1. **Category View** (default): Grid of document categories with cover images
2. **Detail View**: Paginated grid (6 items per page) within a selected category with search
3. **Preview Modal**: Full-screen iframe-based document preview

Search is selectively disabled for certain categories: `['cat-resume', 'cat-degree']` (DocumentManager.tsx:139)

State in DocumentManager is local but synchronized with LocalStorage via `StorageService` methods. When a new version is uploaded, both `categories` and `activeCategory` states are updated to reflect changes immediately.

## Important Implementation Details

### Degree Certificate Display
The Education card dynamically fetches the OSU degree thumbnail from the document storage system:
```typescript
// App.tsx lines 22-31
const degreeCat = cats.find(c => c.id === 'cat-degree');
const doc = degreeCat?.items.find(i => i.id === 'doc-degree-osu');
```
This demonstrates coupling between content sections and the document system.

### Error Handling for Images
All `<img>` tags include `onError` handlers that fallback to Unsplash placeholders. This ensures the UI remains intact even if local assets are missing:
```typescript
onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/...'; }}
```

### File URL Resolution
Document downloads reference files in the `/public` directory:
```typescript
const getFileUrl = (doc: DocumentItem) => {
  const currentVersion = doc.versions.find(v => v.isCurrent);
  return `/${currentVersion.name}`;
};
```
Files must be placed in `/public` to be accessible.

## TypeScript Configuration

- Project references: `tsconfig.json` → `tsconfig.app.json` (source) + `tsconfig.node.json` (build config)
- Strict mode enabled
- No additional type-aware linting configured (basic ESLint setup)

## Common Modifications

### Adding a New Document Category
1. Add to `INITIAL_DOCUMENTS` in `constants.ts` with unique `id`
2. Place cover image in `/public` or use Unsplash URL
3. Update app - document data auto-migrates on next load via storage versioning

### Updating Experience/Content
Edit `constants.ts` directly. Both English and Chinese versions must be updated to maintain consistency.

### Styling Changes
- Global styles: `src/index.css` (Tailwind imports + scrollbar styling)
- Component styles: Utility classes in JSX
- Theme colors: Modify `tailwind.config.js`

## Build Artifacts

- Output directory: `/dist`
- Built files are static and can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages)
- No build-time API calls or external dependencies
