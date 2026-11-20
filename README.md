# Zohair Syed – Portfolio

Personal portfolio: product manager who builds AI agents.

Built on [Magic Portfolio](https://once-ui.com/products/magic-portfolio) by Once UI (v2.3, Next.js 16, React 19).
The template is licensed CC BY-NC 4.0, so keep the Once UI credit in the footer.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things live

| What | File |
| --- | --- |
| Text content (hero, about, experience, certifications) | `src/resources/content.tsx` |
| Colors, effects, fonts, enabled pages, domain | `src/resources/once-ui.config.ts` |
| Case studies | `src/app/work/projects/*.mdx` |
| Case study cover images | `public/images/projects/` |
| Company logos | `public/images/logos/` |
| Resume | `public/resume.pdf` |

## Adding a case study

Create `src/app/work/projects/<slug>.mdx` with this frontmatter:

```yaml
---
title: "Project name"
publishedAt: "2026-01-01"   # controls order (newest first)
summary: "One sentence outcome."
role: "Your role, Company"
timeframe: "Jan 2026 – Mar 2026"
tools: ["Tool A", "Tool B"]
outcomes: ["Headline result", "Another result"]
images: ["/images/projects/<slug>.png"]
team: []
---
```
