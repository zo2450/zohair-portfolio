# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio for Zohair Syed (product manager who builds AI agents), built on the Once UI **Magic Portfolio** template v2.3: Next.js 16 (App Router, Turbopack), React 19, TypeScript, SCSS modules, `@once-ui-system/core` 2.x. Deployed on Vercel. Template license is CC BY-NC 4.0, which requires a Once UI credit unless you have a Pro license. The owner removed the footer credit and is getting a Once UI Pro license, so don't re-add it unasked.

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

**Layout:** `src/app/layout.tsx` sets theme `data-*` attributes from `style` with an inline script (falling back to `style.theme`, then saved localStorage values), mounts the `Background` effects, `Header` (nav built from `routes` and the theme toggle; the location label and clock are switched off in `display`) and `Footer` (socials, Konami-code easter egg via `KonamiEgg`, which uses the Once UI toast).

**Custom components** (beyond the template):
- `components/home/`:
  - `HomeHero` (server) renders the status badge, the headline and the CTAs, and includes `HeroVisual`.
  - `HeroVisual` (client) has the photo plus the floating controller, Halo image and headphones. The mouse parallax and tilt set the CSS vars `--mx`/`--my`, fine pointers only. The controller is a `<button>`: "+1 XP" pops, and 10 presses fire an achievement toast.
  - `MetricsStrip` + `CountUp` (one-time count-up; the server HTML holds the final value).
  - `ContactCard` (neon glow).
- `components/about/`: the About page. `AboutPage` is a bento: hero, the Pocket island card, the GameCraft card (its button opens the Alien Defender game via the `open-alien-defender` window event), `HowIWork` (each principle opens to its proof and case study; data in `aboutExtras.principles`) and the inbox agent card. Below that, a solid `.sheet` with `ExperienceTimeline` (logos, expandable details, case study links), "Also work with", `EarlierRoles` and wins, then `ContactCard`. Copy lives in `about/data.ts` (built from `about` and `aboutExtras`). A role with `hiddenInProduction: true` only shows in dev.
- Mini projects: `ProjectEmbed` iframes two separate repos that live next to this one, `inbox-agent` (/embed) and `pocket-island` (?embed). Their deployed URLs come from `NEXT_PUBLIC_INBOX_AGENT_URL` and `NEXT_PUBLIC_POCKET_ISLAND_URL`; in dev they fall back to localhost:3003 and :3004, and in production without a URL the card shows a text fallback.
- `components/work/`: `WorkBento` + `WorkCard` (text-only bento cards: the result as the headline, plus tilt and glow), used on Home, /work and "More projects". Case study layout styles are in `CaseStudy.module.scss`. MDX `<Draft>` blocks show only in dev.
- `components/StatusDot` and `components/FlipWords` are imported directly by `content.tsx`, so keep them free of `@/resources` imports to avoid a cycle.

Design rules: Impeccable's quality floor applies (`.claude/skills/impeccable/reference/craft-floor.md`). Never put an eyebrow or kicker label above a heading. Avoid gradient text, icon-tile card grids, decorative glows and halos, and text glyphs as icons. Keep the game voice to a few deliberate spots.

Decorative motion is CSS keyframes plus small client hooks, always with `prefers-reduced-motion` fallbacks. There is no framer-motion. For vivid accent color, use `var(--function-accent-600)`: the `accent-on-background-*` tokens are pale tints in dark mode.

**Icons:** add react-icons to `src/resources/icons.ts`. The module augmentation there makes the names valid for every Once UI `icon`/`prefixIcon` prop.

## Conventions

Follow `.agents` (the Once UI agent rules shipped with the template). The key points:

- Use Once UI primitives (`Row`, `Column`, `Grid`, `Heading`, `Text`) with token props (`gap="16"`, `padding="l"`, `background`/`onBackground` pairs) instead of raw `div`s, hex colors or utility classes. Use responsive overrides via `s={{ ... }}` breakpoint objects.
- Use SCSS modules only when props can't express it (selectors, keyframes). Use the `@use "../breakpoints.scss"` mixin values for media queries.
- `align="center"` sets text-align. Use `horizontal`/`vertical` for flex alignment.

Content rules: facts come from the owner's resume. Don't invent metrics or claims. Work at AMD and Microsoft stays high level (confidentiality). `TODO(Zohair)` comments in the MDX files mark sections waiting for the owner's own words or photos.
