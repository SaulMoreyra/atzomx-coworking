# Atzomx Coworking & Café

Marketing site for [Atzomx Coworking & Café](https://atzomx.com.mx/) in Oaxaca, Mexico.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + locked design system (`DESIGN.md`, `tokens.css`)
- `next-intl` for i18n (`es`, `en`, `fr`, `de`) — locale is cookie-driven
- Menu and plan prices live in static mocks (`src/mocks`)
- Copy for product names/descriptions stays in `messages/{locale}/*.json` (keyed by slug)

## Getting started

```bash
yarn install
cp .env.example .env   # optional: Google Places key for reviews
yarn dev               # http://localhost:3000
```

## Scripts

| Script | What it does |
| --- | --- |
| `yarn dev` | Next.js dev server |
| `yarn build` | Production build (+ sitemap) |
| `yarn lint` | ESLint |
| `yarn format` | Type check + Prettier check |

## Project layout

```
src/app/             # Routes
src/components/      # Page/section components
src/lib/products/    # Public menu/plans (reads mocks)
src/mocks/           # Static menu, plans, blog, events
messages/{locale}/   # i18n copy (product names/descriptions)
```

Path alias: `@/*` → `./src/*`.
