# House of Gaming FG — Storefront

Premium curated gaming gear storefront built from the **House of Gaming FG** design system.

## Stack

- **Next.js 15** (App Router)
- **React 19** + TypeScript
- Design tokens from `colors_and_type.css` (noir + voltage accent)

## Run locally

```bash
npm install
cp .env.example .env   # if you don't have .env yet
npm run db:setup       # creates SQLite DB + seeds catalog
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Admin (product catalog)

| URL | Purpose |
|-----|---------|
| [http://localhost:3000/admin](http://localhost:3000/admin) | Product list — add, edit, delete |
| [http://localhost:3000/admin/login](http://localhost:3000/admin/login) | Sign in |

Default password is in `.env` as `ADMIN_PASSWORD` (change it before deploying).

**Database:** SQLite file at `prisma/dev.db`. Browse data with `npm run db:studio`.

```bash
npm run db:seed    # re-import from src/lib/data.ts
npm run db:studio  # Prisma Studio GUI
```

## Pages

| Route | Screen |
|-------|--------|
| `/` | Home — hero, categories, FG-verified rail |
| `/catalog/[cat]` | Product listing with filters |
| `/product/[id]` | Product detail + specs |
| `/checkout` | Checkout (address + payment) |
| `/order/confirmed` | Order confirmation |
| `/account` | Account dashboard |

Cart drawer opens from the header cart icon. Add-to-cart shows a toast (4s).

## Design system

Tokens and brand rules live in `src/styles/tokens.css`. Assets are in `public/assets/`.

Source kit: `House of Gaming FG — Design System` (ui_kits/webapp).

## Stack

- **Next.js 15** storefront
- **Prisma 5** + **SQLite** for products (swap to PostgreSQL in production by changing `DATABASE_URL` and `provider` in `prisma/schema.prisma`)

## Next steps (real commerce)

- Stripe Checkout or Payment Element
- PostgreSQL on Vercel/Railway/Supabase for production DB
- Customer auth (NextAuth / Clerk)
- Persistent cart (cookies / DB)
