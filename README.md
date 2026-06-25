# Atzomx Coworking & Café

Marketing site and admin panel for [Atzomx Coworking & Café](https://atzomx.com.mx/) in Oaxaca, Mexico.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + locked design system (`DESIGN.md`, `tokens.css`)
- `next-intl` for i18n (`es`, `en`, `fr`, `de`) — locale is cookie-driven
- **PostgreSQL + Prisma** — product prices and metadata
- **JWT + refresh token** — admin authentication
- Copy for product names/descriptions stays in `messages/{locale}/*.json` (keyed by slug)

## Getting started

```bash
yarn install
cp .env.example .env   # set JWT secrets + DATABASE_URL
docker compose up -d
yarn db:push           # or yarn db:migrate
yarn db:seed           # imports mocks + creates admin user
yarn dev               # http://localhost:3000
```

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Default seed credentials (override in `.env`):

- Email: `admin@atzomx.com.mx`
- Password: value of `ADMIN_SEED_PASSWORD` (default `ChangeMe123!`)

## Scripts

| Script | What it does |
| --- | --- |
| `yarn dev` | Next.js dev server |
| `yarn build` | Production build |
| `yarn db:push` | Push Prisma schema to PostgreSQL |
| `yarn db:migrate` | Create/apply migrations |
| `yarn db:seed` | Seed categories, products, admin user |
| `yarn db:studio` | Prisma Studio |

## API

| Route | Auth | Description |
| --- | --- | --- |
| `POST /api/v1/auth/login` | — | Login + refresh cookie |
| `POST /api/v1/auth/refresh` | cookie | New access token |
| `POST /api/v1/auth/logout` | cookie | Revoke session |
| `GET /api/v1/auth/me` | Bearer | Current user |
| `GET /api/v1/public/menu` | — | Menu products (prices only) |
| `GET /api/v1/public/plans` | — | Plan products (prices only) |
| `GET/POST /api/v1/products` | Bearer | Admin CRUD |
| `GET/POST /api/v1/categories` | Bearer | Categories |
| `GET/POST /api/v1/users` | Bearer (ADMIN) | User management |

Public pages merge API prices with `next-intl` copy from JSON files.

If `DATABASE_URL` is unset (e.g. CI), the site falls back to static mocks for prices.

## Project layout

```
prisma/              # Schema, seed, migrations
src/app/admin/       # Admin UI (/admin/*)
src/app/api/v1/      # REST API
src/lib/auth/        # JWT, cookies, rate limit
src/lib/products/    # Public menu/plans fetch + fallback
src/mocks/           # Fallback static data + seed source
messages/{locale}/   # i18n copy (product names/descriptions)
```

Path alias: `@/*` → `./src/*`.
