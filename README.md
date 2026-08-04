# Editorial — Basement Studio Frontend Dev Challenge 2026

Production-quality editorial journal for the [Basement Studio Frontend Dev Challenge](https://basementstudio.notion.site/Frontend-Dev-Challenge-da2967c579374fb4969e475dc15fb552).

## Challenge references

| Resource | Link |
|---|---|
| Brief (Notion) | [Frontend Dev Challenge](https://basementstudio.notion.site/Frontend-Dev-Challenge-da2967c579374fb4969e475dc15fb552) |
| Design (Figma) | [Dev Challenge 2026](https://www.figma.com/design/08IEpisAbbDCHJhd1VIajs/Dev-Challenge-2026) |
| Repository | [speedbuild98/Challenge-basementstudio](https://github.com/speedbuild98/Challenge-basementstudio) |
| Deployment | [challenge-basementstudio.vercel.app](https://challenge-basementstudio.vercel.app) |
| CMS (Sanity Studio) | [/studio](https://challenge-basementstudio.vercel.app/studio) |

## Status

- Homepage + article detail aligned to desktop Figma
- Category/tag archives with real GROQ filtering
- Sanity project: `basementstudio-challenge` (`1yrc1zg3` / `production`)
- Embedded Studio at `/studio`
- Demo fallback **disabled in production** unless `ALLOW_DEMO_CONTENT=true`
- Seed importer from basement.studio public dataset: `npm run seed:basement`

## Stack

- Next.js 16 App Router (RSC default)
- TypeScript
- Tailwind CSS v4 + CSS design tokens
- Motion (non-LCP islands only)
- Sanity CMS + embedded Studio
- Vercel (ISR + tag revalidation webhook)

## Local setup (~5 min)

1. `cp .env.example .env.local`
2. Set Sanity public vars + optional write token for seeding
3. `npm install && npm run dev`
4. Open `/` and `/studio`
5. Add CORS origins in Sanity (Credentials allowed):
   - `http://localhost:3000`
   - `https://challenge-basementstudio.vercel.app`

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typegen` | Sanity schema extract + TypeGen |
| `npm run seed:basement` | Import public Basement posts into our dataset |

## Implemented routes

- `/` — journal homepage (hero, featured, knowledge grid, filters)
- `/blog/[slug]` — article detail, Portable Text, prev/next, related, JSON-LD
- `/category/[slug]` — category archive
- `/tag/[slug]` — tag archive
- `/studio` — embedded Sanity Studio
- `/api/revalidate` — tagged on-demand revalidation (secret + allowlist)
- `/sitemap.xml`, `/robots.txt`

## Architecture

- `components/ui` — primitives (no Sanity imports)
- `components/sections` — page sections
- `lib/content` — view-model loaders + fallback policy
- `lib/sanity` — client, GROQ, image helper
- `sanity/schemaTypes` — CMS model

### Caching

- Sanity fetches use Next cache tags (`posts`, `post:slug`, `categories`, …)
- Webhook `POST /api/revalidate` with `x-revalidate-secret`
- Server client uses `useCdn: false` for post-webhook freshness

### Demo fallback policy

| Environment | Behavior |
|---|---|
| `development` | Demo content if CMS empty/fails |
| `production` | No silent demo; empty/error states unless `ALLOW_DEMO_CONTENT=true` |

## Technical decisions

- Embedded Studio for single Vercel deploy
- Motion over GSAP; hero LCP kept static (no opacity-0 entrance)
- Design tokens via CSS variables → Tailwind `@theme`
- URL-driven category filters (`/category/[slug]`)
- Safe JSON-LD serialization for CMS-controlled strings

## Known limitations

- Preview/draft mode not implemented
- No automated test suite yet
- Mobile fidelity continues to be refined against Figma frames `155:4213` / `158:4873`
- Rotate any Sanity write token that was shared outside a secrets manager

## Submission checklist

1. GitHub repo
2. Vercel deployment
3. Sanity CMS access

Invite:

- GitHub: `valebearzotti`
- Sanity: `valentina@basement.studio`
