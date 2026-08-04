# Editorial — Basement Studio Frontend Dev Challenge 2026

Experiencia editorial / blog de calidad producción para el [Basement Studio Frontend Dev Challenge](https://basementstudio.notion.site/Frontend-Dev-Challenge-da2967c579374fb4969e475dc15fb552).

> **Español primero** · English version below ↓

<p align="center">
  <img src="public/demo/Screenshot%202026-08-04%20at%2013.58.02.png" alt="Homepage — featured post y hero" width="480" />
</p>

<p align="center">
  <img src="public/demo/Screenshot%202026-08-04%20at%2013.40.34.png" alt="Lighthouse 100/100/100/100" width="340" />
  &nbsp;&nbsp;
  <img src="public/demo/Screenshot%202026-08-04%20at%2013.41.29.png" alt="Storybook — Button docs" width="340" />
</p>

<p align="center"><sub>Homepage · Lighthouse 100 · Storybook</sub></p>

---

# Español

## Enlaces del challenge

| Recurso | Link |
|---|---|
| Brief (Notion) | [Frontend Dev Challenge](https://basementstudio.notion.site/Frontend-Dev-Challenge-da2967c579374fb4969e475dc15fb552) |
| Diseño (Figma) | [Dev Challenge 2026](https://www.figma.com/design/08IEpisAbbDCHJhd1VIajs/Dev-Challenge-2026) |
| Repositorio | [speedbuild98/Challenge-basementstudio](https://github.com/speedbuild98/Challenge-basementstudio) |
| Producción | [challenge-basementstudio.vercel.app](https://challenge-basementstudio.vercel.app) |
| Sanity Studio | [/studio](https://challenge-basementstudio.vercel.app/studio) |

## Resultados Lighthouse

Medición en producción (`challenge-basementstudio.vercel.app`) con Chrome Guest / sin extensiones:

| Categoría | Score |
|---|---|
| Performance | **100** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

Métricas clave (mobile, Navigation): FCP ~0.3s · LCP ~0.6s · TBT 0 ms · CLS 0 · Speed Index ~0.6s.

Captura al inicio del README.  
> **Nota:** si medís con extensiones (AdBlock, React DevTools, live reload), Best Practices puede bajar a ~92 por errores de consola/`chrome-extension://` y violaciones CSP. Eso **no es del sitio**. Usá perfil **Guest** o Incógnito sin “Allow in Incognito”.

## Storybook

Catálogo de componentes UI, secciones, motion, skeletons y Portable Text.

```bash
npm run storybook
# → http://localhost:6006
```

Captura al inicio del README.

## Qué es este proyecto

Sitio editorial oscuro (estilo basement.studio) con:

- Homepage con hero tipográfico, featured post, knowledge grid, filtros por categoría y Load more
- Detalle de artículo con Portable Text, prev/next, related content y JSON-LD
- Archivos por categoría y tag con filtrado real vía GROQ
- Chrome de navegación glass + footer wordmark + glow naranja
- Cursor custom de marca (desktop / pointer fino; respeta `prefers-reduced-motion`)
- CMS Sanity con Studio embebido en `/studio`
- Deploy en Vercel con ISR + revalidación por tags

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, RSC por defecto) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 + tokens CSS (`styles/tokens.css` → `@theme`) |
| Motion | GSAP (+ helpers Motion) para reveals, nav, cursor, glow |
| CMS | Sanity + `next-sanity` + Portable Text |
| Studio | Embebido en `/studio` (un solo deploy) |
| Hosting | Vercel |
| Tests | Vitest + Testing Library |
| Docs UI | Storybook 10 (`@storybook/nextjs-vite`) |
| Calidad | ESLint, Prettier |

## Criterios de evaluación cubiertos

- Alta fidelidad a Figma (desktop + mobile)
- Arquitectura modular y escalable
- Componentes reutilizables / design-system thinking (`components/ui` sin Sanity)
- Accesibilidad y navegación por teclado
- Lighthouse cercano a 100/100/100/100 (ver captura)
- Microinteracciones y UX (motion, cursor, Load more, menú móvil)
- Contenido CMS-driven (no hardcode de posts en producción)
- Código production-ready + decisiones documentadas (este README)

## Setup local (~5 min)

1. `cp .env.example .env.local`
2. Completá las vars públicas de Sanity (y token de escritura solo si vas a seedear)
3. `npm install && npm run dev`
4. Abrí `/` y `/studio`
5. En Sanity → API → CORS Origins (Credentials allowed):
   - `http://localhost:3000`
   - `https://challenge-basementstudio.vercel.app`

### Variables de entorno

| Variable | Obligatoria | Uso |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sí | Canonical, OG, sitemap |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sí | Proyecto Sanity (`1yrc1zg3`) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sí | Dataset (`production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sí | API version (`2025-01-01`) |
| `SANITY_REVALIDATE_SECRET` | Sí (prod) | Webhook `/api/revalidate` |
| `SANITY_API_WRITE_TOKEN` | Solo seed | `npm run seed:basement` |
| `SANITY_API_READ_TOKEN` | Opcional | Draft/preview |
| `ALLOW_DEMO_CONTENT` | Opcional | Forzar on/off del fallback demo |

**Proyecto Sanity de este challenge:** `basementstudio-challenge` · projectId `1yrc1zg3` · dataset `production`.

## Scripts

| Script | Para qué |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` / `npm start` | Build y serve producción |
| `npm run lint` | ESLint |
| `npm run format` / `format:check` | Prettier |
| `npm test` / `test:watch` | Vitest |
| `npm run storybook` | Storybook en `:6006` |
| `npm run build-storybook` | Build estático de Storybook |
| `npm run typegen` | Extract schema Sanity + TypeGen |
| `npm run seed:basement` | Importa posts públicos de basement.studio a nuestro dataset |

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Homepage (hero, featured, grid, filtros) |
| `/blog/[slug]` | Artículo: body Portable Text, prev/next, related, SEO/JSON-LD |
| `/category/[slug]` | Archivo por categoría (GROQ real) |
| `/tag/[slug]` | Archivo por tag |
| `/studio` | Sanity Studio embebido |
| `/api/revalidate` | Revalidación on-demand (secret + allowlist) |
| `/sitemap.xml` · `/robots.txt` | SEO técnico |

## Arquitectura de carpetas

```
app/
  (site)/          # Rutas públicas del journal
  studio/          # Studio embebido
  api/revalidate/  # Webhook
components/
  ui/              # Primitivos (Button, Text, CategoryPill…) — SIN Sanity
  sections/        # Secciones de página (HomeHero, KnowledgeGrid…)
  layout/          # Header, footer, MobileNav, SkipLink…
  motion/          # Reveal, Stagger, CustomCursor, Magnetic…
  blog/            # Piezas del detalle de artículo
  skeleton/        # Estados de carga
  sanity/          # PortableBody y adapters CMS
lib/
  content/         # Loaders / view-models + política demo
  sanity/          # client, env, fetch, image, GROQ
  seo.ts           # Metadata helpers + JSON-LD seguro
sanity/schemaTypes/
  documents/       # post, author, category, tag, siteSettings, homePage
  objects/         # bloques Portable Text, etc.
styles/tokens.css  # Design tokens → Tailwind @theme
scripts/           # seed-from-basement.mjs
.storybook/        # Config Storybook + alias @
```

### Flujo de datos

1. GROQ centralizado en `lib/sanity/queries`
2. Fetch tipado con cache tags de Next (`posts`, `post:slug`, `categories`, …)
3. `lib/content/*` arma view-models para las pages/sections
4. UI “tonta”: recibe props tipadas, no habla con Sanity directo (salvo adapters)

### Caching y revalidación

- Fetches Sanity con tags de Next cache
- Webhook `POST /api/revalidate` con header `x-revalidate-secret`
- Cliente server usa `useCdn: false` para frescura post-webhook
- ISR + revalidación por tag (no rebuild completo)

### Política de contenido demo

| Entorno | Comportamiento |
|---|---|
| `development` | Si CMS vacío/falla → demo local |
| `production` | Sin demo silencioso; empty/error states (salvo `ALLOW_DEMO_CONTENT=true`) |

## Features implementadas

### Homepage
- Hero tipográfico con intro motion (LCP sin opacity-0 bloqueante)
- Featured post + glow naranja
- Knowledge grid + filtros URL (`/category/[slug]`)
- Load more con re-bind de stagger (`watch`) para cards nuevas
- Filtros mobile en scroll horizontal (fidelidad Figma)

### Artículo
- Header, meta, categorías
- Portable Text (imágenes Sanity vía `next/image`)
- Prev/next (mobile: botones Previous/Next; desktop: + títulos)
- Related content
- SEO metadata + JSON-LD

### Chrome / UX
- Nav glass desktop + MobileNav animado (GSAP)
- Footer wordmark + links con touch targets
- Custom cursor (naranja + anillo glass) solo desktop / fine pointer
- Skip link, landmarks, focus states
- `prefers-reduced-motion` respetado

### Calidad
- Vitest (componentes + utils)
- Storybook (UI, sections, motion, skeletons…)
- CSP endurecida en `next.config.ts` (Studio con política separada)
- Headers de seguridad (nosniff, referrer, frame-ancestors, etc.)

## Motion (cómo está pensado)

- El **CSS** oculta el estado inicial (`.motion-reveal` / items sin `.motion-shown`)
- **GSAP** solo anima hacia adelante una vez (evita “desaparece y reaparece”)
- `Stagger` acepta `watch` para re-bindear nodos nuevos (Load more)
- Hero LCP permanece estático / montaje controlado
- Cursor custom desactivado en touch, coarse pointer y reduced motion

## Sanity CMS

### Modelos
`post` · `author` · `category` · `tag` · `siteSettings` · `homePage` (+ objects Portable Text)

### Seed
```bash
# Requiere SANITY_API_WRITE_TOKEN en .env.local
npm run seed:basement
```
Lee el dataset público de basement.studio y escribe en nuestro proyecto.

### Studio
Disponible en local y prod en `/studio`. Un solo proyecto Vercel (sin monorepo studio/web).

## SEO

- Metadata por página + Open Graph / Twitter
- Canonical vía `NEXT_PUBLIC_SITE_URL`
- JSON-LD seguro (strings del CMS serializados con cuidado)
- `sitemap.xml` y `robots.txt` generados

## Accesibilidad

- Skip link al main
- Landmarks semánticos y jerarquía de headings
- Nav móvil con Escape, focus trap y `aria-expanded`
- Contraste revisado (pills de categoría, footer)
- Touch targets mínimos en footer / CTAs
- Reduced motion corta animaciones

## Performance (decisiones)

- RSC por defecto; `use client` solo donde hace falta
- Imágenes vía `next/image` + Sanity CDN (`quality`/`sizes` ajustados)
- Sin preconnect inútil a `cdn.sanity.io` (las imágenes van por `/_next/image`)
- JS de motion aislado en islas client
- CSP sin `unsafe-eval` en producción

## Decisiones técnicas clave

1. **Studio embebido** → un deploy, menos ops para el challenge
2. **GSAP para motion complejo** (nav, stagger, cursor); CSS dueño del hide inicial
3. **Tokens CSS → Tailwind `@theme`** → una sola fuente de verdad visual
4. **Filtros por URL** (`/category/[slug]`) → shareable + SSR-friendly
5. **`components/ui` sin Sanity** → design system reutilizable / testeable / Storybook-first
6. **Demo fallback solo en dev** → producción no miente con contenido fake
7. **Revalidate webhook** → editores ven cambios sin redeploy

## Cómo medir Lighthouse (100 real)

1. Deploy del commit actual en Vercel
2. Chrome → perfil **Guest** (mejor que Incógnito)
3. Confirmá `chrome://extensions` vacío
4. DevTools → Lighthouse → Navigation → Mobile/Desktop
5. No tengas React DevTools / AdBlock / live reload activos

## Criterios de entrega

| Entregable | URL |
|---|---|
| GitHub | https://github.com/speedbuild98/Challenge-basementstudio |
| Vercel | https://challenge-basementstudio.vercel.app |
| Sanity Studio | https://challenge-basementstudio.vercel.app/studio |

Reviewers sugeridos por el brief: GitHub `valebearzotti` · Sanity `valentina@basement.studio`.

---

# English

## Challenge links

| Resource | Link |
|---|---|
| Brief (Notion) | [Frontend Dev Challenge](https://basementstudio.notion.site/Frontend-Dev-Challenge-da2967c579374fb4969e475dc15fb552) |
| Design (Figma) | [Dev Challenge 2026](https://www.figma.com/design/08IEpisAbbDCHJhd1VIajs/Dev-Challenge-2026) |
| Repository | [speedbuild98/Challenge-basementstudio](https://github.com/speedbuild98/Challenge-basementstudio) |
| Production | [challenge-basementstudio.vercel.app](https://challenge-basementstudio.vercel.app) |
| Sanity Studio | [/studio](https://challenge-basementstudio.vercel.app/studio) |

## Lighthouse

Production audit (Chrome Guest / no extensions): **100 / 100 / 100 / 100** (Performance · Accessibility · Best Practices · SEO). Screenshot at the top of this README.

> Tip: browser extensions can drop Best Practices (~92) via console/`chrome-extension://` noise and CSP violations. Measure in a **Guest** profile.

## Storybook

```bash
npm run storybook
# → http://localhost:6006
```

Screenshot at the top of this README.

## Stack

Next.js 16 App Router · TypeScript · Tailwind CSS v4 · GSAP / Motion · Sanity (embedded Studio) · Vercel · Vitest · Storybook 10.

## Local setup (~5 min)

1. `cp .env.example .env.local`
2. Fill Sanity public env vars (+ write token only for seeding)
3. `npm install && npm run dev`
4. Open `/` and `/studio`
5. Add CORS origins in Sanity (Credentials allowed): `http://localhost:3000` and the Vercel URL

See `.env.example` for the full variable list. Project: `basementstudio-challenge` · `1yrc1zg3` · `production`.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest |
| `npm run storybook` | Component docs on `:6006` |
| `npm run typegen` | Sanity schema extract + TypeGen |
| `npm run seed:basement` | Import public Basement posts into our dataset |

## Routes

`/` · `/blog/[slug]` · `/category/[slug]` · `/tag/[slug]` · `/studio` · `/api/revalidate` · `/sitemap.xml` · `/robots.txt`

## Architecture

- `components/ui` — primitives (no Sanity imports)
- `components/sections` — page sections / view-models
- `lib/content` — loaders + demo fallback policy
- `lib/sanity` — client, GROQ, image helper, env hardening
- `sanity/schemaTypes` — CMS models
- CSS owns initial motion hide; GSAP only animates forward once
- ISR + tagged revalidation via webhook (`x-revalidate-secret`)
- Demo content allowed in development; disabled in production unless `ALLOW_DEMO_CONTENT=true`

## Technical decisions

- Embedded Studio for a single Vercel deploy
- URL-driven category filters
- Design tokens via CSS variables → Tailwind `@theme`
- Safe JSON-LD serialization for CMS-controlled strings
- Hardened CSP (`unsafe-eval` only in development; separate Studio policy)
- Custom brand cursor on fine pointers only; respects reduced motion

## Delivery

GitHub · Vercel production · Sanity Studio at `/studio` — links in the Spanish section above.
