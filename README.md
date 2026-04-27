# Atzomx Coworking & Café

Marketing/landing site for [Atzomx Coworking & Café](https://atzomx.com.mx/) in Oaxaca, Mexico. Static Next.js App Router site with two routes: `/` (landing) and `/menu`.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS (custom theme tokens in `tailwind.config.js`)
- `next-intl` for i18n (`es` default, `en`) — locale is cookie-driven, no `[locale]` route segment
- `framer-motion` + `gsap` (with `ScrollTrigger`) for animations
- `next-sitemap` for sitemap/robots generation at build time
- Google Tag Manager + Google Analytics wired in `src/app/layout.tsx`

There is no backend, database, or authentication. All content (plans, reviews, menu items) is static mock data under `src/mocks/`.

## Getting started

Package manager is **yarn** (a `yarn.lock` is committed).

```bash
yarn install
yarn dev          # http://localhost:3000
```

## Scripts

| Script         | What it does                                                            |
| -------------- | ----------------------------------------------------------------------- |
| `yarn dev`     | Next.js dev server                                                      |
| `yarn build`   | Production build (runs `next-sitemap` automatically via `postbuild`)    |
| `yarn start`   | Serve the production build                                              |
| `yarn lint`    | `next lint`                                                             |
| `yarn format`  | Typecheck (`tsc --noEmit`) **and** `prettier --check src` — use as CI gate |

There is no test runner configured.

## Project layout

```
src/
  app/             # App Router routes (`/`, `/menu`) + root layout
  components/      # One component per folder (PascalCase)
  common/types/    # Shared TS types
  mocks/           # Static content: plans, reviews, menu items
  i18n/            # next-intl config + request handler
  services/        # Server actions (currently just locale cookie)
  hooks/
messages/{en,es}/  # Translation namespaces (home, menu)
public/            # Static assets (images, fonts, favicon, sitemap output)
```

Path alias: `@/*` → `./src/*`.

## Legacy / unused

The following are present in the repo but **not used** by the current source — leave them alone unless you're intentionally cleaning up:

- `package.json` deps: `@prisma/client`, `@stripe/stripe-js`, `jsonwebtoken` (and their `@types/*`).
- `.gitmodules` declares submodules at `src/lib/common` and `src/lib/authkitty` (from `clewup/*`). The directories are not present in the working tree and nothing imports from them.
