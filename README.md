# Editorial — Basement Studio Frontend Dev Challenge 2026

Production-quality editorial blog built for the [Basement Studio Frontend Dev Challenge](https://basementstudio.notion.site/Frontend-Dev-Challenge-da2967c579374fb4969e475dc15fb552).

## Challenge references

| Resource | Link |
|---|---|
| Brief (Notion) | [Frontend Dev Challenge](https://basementstudio.notion.site/Frontend-Dev-Challenge-da2967c579374fb4969e475dc15fb552) |
| Design (Figma) | [Dev Challenge 2026](https://www.figma.com/design/08IEpisAbbDCHJhd1VIajs/Dev-Challenge-2026?node-id=0-1&p=f&t=W6ryT238yZcsMxY5-0) |
| Repository | [speedbuild98/Challenge-basementstudio](https://github.com/speedbuild98/Challenge-basementstudio) |
| Deployment | [challenge-basementstudio.vercel.app](https://challenge-basementstudio.vercel.app) |
| CMS (Sanity Studio) | [/studio](https://challenge-basementstudio.vercel.app/studio) |

## Status

- Architecture and Next.js/Sanity scaffold are in place
- Site is deployed to Vercel
- Sanity project connected: `basementstudio-challenge` (`1yrc1zg3`, dataset `production`)
- Studio is **embedded** at `/studio` (not a separate `studio/` + `web/` monorepo)
- Next: extract Figma tokens, seed content, implement homepage + article fidelity

## Stack

- Next.js 16 (App Router, Server Components by default)
- TypeScript
- Tailwind CSS v4 + CSS design tokens
- Motion (client islands only)
- Sanity CMS + embedded Studio at `/studio`
- Vercel

## Local setup (~5 min)

1. Copy env file:

```bash
cp .env.example .env.local
```

2. Create a Sanity project at [sanity.io/manage](https://www.sanity.io/manage) and set:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (usually `production`)

3. Install and run:

```bash
npm install
npm run dev
```

4. Open:

- Site: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

5. Add CORS origins in Sanity (Credentials allowed):

- `http://localhost:3000`
- `https://challenge-basementstudio.vercel.app`

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typegen` | Extract schema + Sanity TypeGen |

## Architecture

### Boundaries

- `components/ui` — design-system primitives (no Sanity imports)
- `components/sections` — page sections fed by view models
- `lib/sanity` — client, image helper, GROQ, fetch
- `sanity/schemaTypes` — CMS model only

### Rendering

- Server Components by default
- `"use client"` only for Studio, Motion, and interactive chrome

## Submission checklist (from brief)

When the challenge is ready, reply with links to:

1. GitHub repo
2. Vercel deployment
3. Sanity CMS

Invite:

- GitHub: `valebearzotti`
- Sanity: `valentina@basement.studio`

## Implemented features / decisions

_To be filled as implementation progresses._

### Technical decisions

- Embedded Sanity Studio for a single Vercel deploy
- Motion over GSAP unless the design requires complex timeline scrubbing
- Design tokens via CSS variables mapped into Tailwind `@theme`
- URL-driven filters preferred over client-only filter state

### Trade-offs / caveats

- Sanity project ID is still a placeholder until the CMS project is created
- Visual tokens are provisional until Figma extraction
