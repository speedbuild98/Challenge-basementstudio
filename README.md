# Editorial

Production-quality editorial blog — Next.js, TypeScript, Tailwind CSS, Motion, Sanity, Vercel.

## Status

- Phase 1: architecture decided
- Phase 3: bootstrap + folder architecture + Sanity schemas scaffolded
- Next: connect real Sanity project → Figma tokens → homepage fidelity

## Stack

- Next.js 16 (App Router, Server Components by default)
- TypeScript
- Tailwind CSS v4 + CSS design tokens
- Motion (client islands only)
- Sanity CMS + embedded Studio at `/studio`
- Vercel (deploy target)

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

5. Add the local origin to Sanity CORS (Credentials allowed): `http://localhost:3000`

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typegen` | Extract schema + Sanity TypeGen |

## Architecture notes

See `docs/PHASE-1-ARCHITECTURE.md` and `docs/PHASE-3-BOOTSTRAP.md`.

### Boundaries

- `components/ui` — design-system primitives (no Sanity imports)
- `components/sections` — page sections fed by view models
- `lib/sanity` — client, image helper, GROQ, fetch
- `sanity/schemaTypes` — CMS model only

### Rendering

- Server Components by default
- `"use client"` only for Studio, Motion, and future interactive chrome

## Docs

- `docs/PHASE-1-ARCHITECTURE.md` — strategy
- `docs/PHASE-3-BOOTSTRAP.md` — what was installed and why
