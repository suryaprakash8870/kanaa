# Skills / Runbook — Kanaa

Step-by-step recipes for the common tasks on this project. Copy-paste friendly.

---

## ▶ Run the site locally
```bash
npm install        # first time
npm run dev        # http://localhost:3000
```
Needs `.env.local` (DB + S3 + secret). If the DB is paused, resume it in Supabase first.

---

## 🖼 Add / change a product image
1. Go to **`/admin`** → **Products** → open a product.
2. **Hero Image** field → **Upload** (or choose existing) → pick the photo → **Save**.
   - Uploads land in the **Media** collection (stored in Supabase S3).
   - `Gallery` field takes multiple images (used on the product detail page).
3. The product card top fills with the image (`object-fit: cover`). Hard-refresh
   `/products` to bypass the 5-minute ISR cache.

---

## ➕ Add a product (manually)
`/admin` → **Products** → **Create New**. Fill `name`, `slug` (unique, kebab-case),
`tagline`, `color` (hex), optionally `ingredients`, set `featured`/`order`. Then create a
**Variant** (`/admin` → Variants): link the product, set `sku`, `weightGrams`, `price`,
`mrp`, `stock`, `active`. (Products without an active variant show "Soon" / no price.)

## 🌱 Reseed the catalog from code (destructive)
The 24-product catalog lives in `src/app/(site)/api/seed/route.ts`. `GET /api/seed` only
seeds when the table is empty. A full **wipe-and-replace** was done via a one-off
`/api/reseed-products` route (since removed). Re-add a similar route only if you must, and
**delete it afterward** — never leave a public reset/seed endpoint live.

---

## ✍ Add a blog post
`/admin` → **Posts** → **Create New**. Set `title`, `slug`, `excerpt`, `content` (rich text),
`status: published`, `publishedAt`, optional `featuredImage`, `tags`, `author`, `readTime`.
Published posts appear at `/blog` and `/blog/<slug>`.

---

## 🔑 Reset a forgotten admin password (local, offline)
```bash
node scripts/reset-admin.mjs                 # lists admin emails
node scripts/reset-admin.mjs you@email.com   # then type the new password at the prompt
```
- It talks straight to Postgres (reads `DATABASE_URL` from `.env.local`) and rewrites the
  user's `hash`/`salt` with Payload's exact algorithm.
- **Always use the prompt** (don't pass the password as an argument) — the shell mangles
  `$ ! # &` etc., which silently changes the saved password.
- After logging in, change it again in **`/admin` → Users**, then **delete this script**.

---

## ✏ Edit marketing copy
It's hardcoded in components, not the CMS:
| Section | File |
|---|---|
| Hero | `src/components/HeroSimple.tsx` |
| Our Story | `src/components/About.tsx` |
| What We Use | `src/components/AlternatingStory.tsx` |
| Why Kanaa | `src/components/Process.tsx` |
| Featured Products | `src/components/FeaturedProducts.tsx` |
| Testimonials | `src/components/Testimonials.tsx` |
| Footer | `src/components/Footer.tsx` |
| Nav links | `src/components/Navbar.tsx` |

User-supplied images live in `public/` (e.g. `public/story/story1.png`, `public/footer-scene.png`,
`public/blog/left.png`). Drop a file at the referenced path and refresh.

---

## 🚀 Deploy
```bash
# from a clean branch, open a PR and merge to main (Render auto-deploys main)
git checkout -b my-change
git add -A && git commit -m "..."
git push -u origin my-change
# → open the PR link GitHub prints, merge → Render builds & deploys
```
Before pushing, catch build errors locally:
```bash
npx tsc --noEmit        # next build runs this; fix type errors first
```
Then make sure Render's **Environment** has all the vars (see `todo.md`).

---

## 🧩 Add a new home section
1. Create `src/components/MySection.tsx` (inline styles, brand palette/fonts).
2. Import + place it in `src/app/(site)/page.tsx` in the right slot.
3. For scroll-linked motion, use a `requestAnimationFrame` loop reading
   `getBoundingClientRect()` (Lenis eats native scroll events).
4. Verify: `npm run dev`, scroll to it; or `npx tsc --noEmit`.

---

## 🐛 Quick debugging
- **"Tenant or user not found" / ENOTFOUND** → Supabase project paused; resume it.
- **Build fails type-check** → run `npx tsc --noEmit`, fix, re-push.
- **Login "Something went wrong"** on prod → Render env vars missing (DB unreachable).
- **Login "email or password incorrect"** after a reset → password got shell-mangled;
  reset again using the **prompt**.
- **Images don't show after upload** → 5-min ISR cache; hard-refresh.
