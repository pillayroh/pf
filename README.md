# Rohan Kumar Pillay - Portfolio

A polished, dark-first portfolio that positions Rohan Kumar Pillay as a product-minded AI builder who works from customer problem through prototyping, deployment, iteration, and measurable business impact.

## Tech stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [React Router](https://reactrouter.com/) for the two pages (`/` and `/thoughts`)
- [Tailwind CSS v4](https://tailwindcss.com/) - dark, red-on-near-black theme
- [Framer Motion](https://www.framer.com/motion/) for refined, purposeful motion
- [Lucide React](https://lucide.dev/) icons (brand glyphs inlined in `src/components/BrandIcons.tsx`)
- [Inter](https://rsms.me/inter/) via `@fontsource/inter` (self-hosted, Latin subset)
- Web Audio API for the optional, opt-in UI click sound

## Navigation

- The top bar keeps only page links (**Home**, **My Thoughts**) plus status,
  sound toggle, and the "Let's Build" CTA.
- A floating **radial navigator** (bottom-right) is the primary way to jump
  between sections (Home, Projects, Journey, My Thoughts, Contact). It works
  across both pages and via keyboard.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build locally
npm run lint     # oxlint
```

## Editing content

All personal content lives in a single file: [`src/data/content.ts`](src/data/content.ts).

Update the exported objects/arrays to change copy, metrics, products, case
studies, principles, experience, education, skills, and contact details. No JSX
or styling lives in that file.

- Replace the placeholder `linkedin`, `github`, and `resumeUrl` values in the
  `profile` object with real URLs.
- Design tokens (colors, radius, fonts) are defined in the `@theme` block in
  [`src/index.css`](src/index.css).

## Structure

```
src/
  data/content.ts        # single source of truth for all content
  hooks/                 # useSound, usePrefersReducedMotion,
                         # useActiveSection, useScrollProgress
  lib/                   # motion easing, smooth-scroll + site-nav helpers
  components/            # Navbar, RadialNav, Hero, ProductLaunchpad,
                         # AboutExperience, CaseStudySection, SkillsToolkit,
                         # ContactSection, Layout, etc.
  pages/                 # HomePage, ThoughtsPage
  App.tsx                # router: "/" (home) and "/thoughts" (writing)
```

## Accessibility & motion

- Semantic HTML, correct heading order, visible focus rings, skip link.
- Full keyboard support for the carousel, filters, modals, mobile drawer, and
  sound toggle. `Escape` closes modals and the drawer.
- Honors `prefers-reduced-motion` (non-essential animation is disabled).
- Sound is off by default, opt-in, and persisted to `localStorage`.

## Deploying to Vercel

This is a standard Vite app - Vercel auto-detects it.

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   output directory `dist`.

`vercel.json` rewrites all paths to `index.html` so the client-side
`/thoughts` route works on direct load / refresh. No environment variables or
backend are required.
