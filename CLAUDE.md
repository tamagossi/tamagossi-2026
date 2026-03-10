# Project Guide

## Commands

- **Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Start:** `npm run start`
- **Lint:** `npm run lint`
- **Fix Lint:** `npm run lint:fix`
- **Format:** `npm run format`

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion, GSAP
- **Icons:** Lucide React

## Project Structure

- `src/app`: App Router pages and layouts
- `src/modules`: Feature-specific components
- `src/shared`: Shared components, utilities, and constants
- `src/content`: Markdown content
- `public`: Static assets

## Code Style

- **Components:** PascalCase (e.g., `HeroSection.tsx`)
- **Files:** kebab-case for utilities/configs, PascalCase for components
- **Imports:** Use `@/` alias for `src/` directory
- **Styling:** Use Tailwind utility classes; `cn()` utility for class merging
- **Types:** strict TypeScript mode enabled
