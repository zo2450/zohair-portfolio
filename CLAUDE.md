# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio for Zohair Syed (product manager who builds AI agents), built on the Once UI **Magic Portfolio** template v2.3: Next.js 16 (App Router, Turbopack), React 19, TypeScript, SCSS modules, `@once-ui-system/core` 2.x. Deployed on Vercel. Template license is CC BY-NC 4.0: keep the "Build your portfolio with Once UI" credit in `src/components/Footer.tsx`.

## Commands

```bash
npm run dev         # dev server, http://localhost:3000
npm run build       # production build (what Vercel and CI run)
npm start           # serve the production build
npm run typecheck   # tsc --noEmit
npm run lint        # biome lint src (has ~90 pre-existing warnings from template code; not run in CI)
npm run biome-write # format everything with Biome
```

There is no test suite. Verification = `npm run typecheck` + `npm run build`, which is exactly what `.github/workflows/ci.yml` runs. For visual checks, the project-scoped Playwright MCP in `.mcp.json` drives Microsoft Edge.

Next.js 16 differs from older versions (async `params`, `proxy.ts` instead of middleware, no `next lint`). Check `node_modules/next/dist/docs/` before using unfamiliar Next APIs.

## Architecture

**Content and config are data, pages are thin renderers.** Almost every visible change belongs in one of two files, not in page code:

- `src/resources/content.tsx` holds `person`, `social`, `home` (headline, subline, featured badge, `metrics`), `about` (intro, `work.experiences` with `logo`/`caseStudy`, `work.earlier`, `studies`, `technical`), plus `blog`/`work`/`gallery` page metadata. Shapes are defined in `src/types/content.types.ts`. Extend the type there first when adding a field.
- `src/resources/once-ui.config.ts` holds `baseURL` (still a placeholder until the real domain exists), `routes` (enables pages; blog and gallery are currently `false`), `protectedRoutes`, fonts, the `style` theme tokens (dark, emerald brand, orange accent, playful borders, translucent surfaces), and background `effects` (cursor mask, gradient, dots).
- `src/resources/index.ts` re-exports both. Import from `@/resources`.

**Case studies are MDX files** in `src/app/work/projects/*.mdx`, read at build time by `getPosts()` in `src/utils/utils.ts` (gray-matter). The filename is the slug. `publishedAt` controls ordering (newest first). The extra frontmatter fields `role`, `timeframe`, `tools[]` and `outcomes[]` render the summary card in `src/app/work/[slug]/page.tsx`. Cover images live in `public/images/projects/` and render via the Once UI `Carousel` in `ProjectCard`. `getPosts()` returns `[]` for a missing folder, so the empty blog folder is fine.

**Routing and access:** `RouteGuard` (client) renders the 404 page for routes disabled in `routes`, and handles password-protected pages. `src/proxy.ts` rewrites protected routes to `/locked` unless a signed cookie from `/api/authenticate` is present (`PAGE_ACCESS_PASSWORD` / `PAGE_ACCESS_SECRET` in `.env`, see `.env.example`).

**Layout:** `src/app/layout.tsx` sets theme `data-*` attributes from `style` with an inline script (falling back to `style.theme`, then saved localStorage values), mounts the `Background` effects, `Header` (location label, nav built from `routes`, live clock, theme toggle) and `Footer` (socials, Konami-code easter egg via `KonamiEgg`, which uses the Once UI toast).

**Custom components** (beyond the template): `components/home/` (`HomeHero` with floating badges, `MetricsStrip`, `ContactCard` with the neon glow), `components/about/CompanyLogo` (logo or initials tile), and `components/TypingPill` (the "Experienced in…" pill, imported directly by `content.tsx`; keep it free of `@/resources` imports to avoid a cycle). Decorative motion is CSS keyframes with `prefers-reduced-motion` fallbacks; there is no framer-motion.

**Icons:** add react-icons to `src/resources/icons.ts`. The module augmentation there makes the names valid for every Once UI `icon`/`prefixIcon` prop.

## Conventions

Follow `.agents` (the Once UI agent rules shipped with the template). The key points:

- Use Once UI primitives (`Row`, `Column`, `Grid`, `Heading`, `Text`) with token props (`gap="16"`, `padding="l"`, `background`/`onBackground` pairs) instead of raw `div`s, hex colors or utility classes. Use responsive overrides via `s={{ ... }}` breakpoint objects.
- Use SCSS modules only when props can't express it (selectors, keyframes). Use the `@use "../breakpoints.scss"` mixin values for media queries.
- `align="center"` sets text-align. Use `horizontal`/`vertical` for flex alignment.

Content rules: facts come from the owner's resume. Don't invent metrics or claims. Work at AMD and Microsoft stays high level (confidentiality). `TODO(Zohair)` comments in the MDX files mark sections waiting for the owner's own words or photos.
