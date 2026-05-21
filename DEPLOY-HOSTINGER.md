# Deploy House of Gaming FG on Hostinger

Your repo is already on GitHub: **https://github.com/taulantukimeri/house-of-gaming-fg**

You need a Hostinger plan with **Node.js Web Apps** (Business Web Hosting or Cloud Startup and above).

---

## Step 1 — Open Node.js apps in hPanel

1. Log in to [https://hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Go to **Websites** → **Add Website**
3. Choose **Node.js Apps** (or **Import Git Repository**)

---

## Step 2 — Connect GitHub

1. Select **Import Git Repository**
2. Authorize GitHub and pick: `taulantukimeri/house-of-gaming-fg`
3. Branch: `master`

---

## Step 3 — Build settings

Use these values exactly:

| Setting | Value |
|--------|--------|
| **Node.js version** | `20` |
| **Root directory** | `/` (leave empty if that means project root) |
| **Install command** | `npm ci` |
| **Build command** | `npm run build` |
| **Start command** | `npm run start -- -p $PORT` |
| **Output directory** | `.next` (if asked; some flows auto-detect Next.js) |

---

## Step 4 — Environment variables

In the Hostinger app **Environment variables** section, add:

| Name | Value |
|------|--------|
| `DATABASE_URL` | `file:./prisma/production.db` |
| `ADMIN_PASSWORD` | *choose a strong password* |
| `NODE_ENV` | `production` |

Do **not** upload your local `.env` file. Set variables only in hPanel.

---

## Step 5 — Deploy

1. Click **Deploy**
2. Wait for the build to finish (first deploy can take 3–8 minutes)
3. Open your assigned URL (e.g. `https://your-app.hostinger.site`)

**Store:** `/`  
**Admin:** `/admin/login` (use `ADMIN_PASSWORD` from step 4)

---

## After deploy

- **Products empty?** Redeploy once, or run **Rebuild** in hPanel (the build runs `ensure-seed` when the DB has no products).
- **Change admin password:** update `ADMIN_PASSWORD` in hPanel and redeploy.
- **Custom domain:** hPanel → your Node.js app → **Domains** → connect your domain and enable SSL.

---

## Troubleshooting

| Problem | Fix |
|--------|-----|
| Build fails on Prisma | Ensure `DATABASE_URL` is set before build |
| 500 / Prisma error | Redeploy after setting env vars; check build logs |
| Admin login fails | `ADMIN_PASSWORD` must match what you type (no extra spaces) |
| Old site on port 3000 locally | Production uses Hostinger’s `$PORT` automatically |

---

## VPS (optional)

If you use a **VPS** instead of managed Node.js apps, use PM2 + Nginx. See Hostinger’s VPS Node.js guides or ask for a VPS-specific setup.
