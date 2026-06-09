# Decision Log — Kanaa

Key technical and product decisions for the Kanaa homemade-food e-commerce site.
Newest at the top. Each entry: **what** was decided and **why**.

---

## Product positioning
- **Kanaa = homemade healthy South Indian food**, not just pickles. Range: thokkus,
  kulambu mixes, soup mixes, dried/powdered products, healthy snacks.
- Voice: *Healthy. Simple. Comforting.* Modern convenience + traditional authenticity.
- Tagline used across CTAs: "Taste homemade health."

## Stack & hosting
- **Next.js 16.2.3 (App Router) + React 19.2.4.** ⚠️ This Next version has breaking
  changes vs. older docs — always check `node_modules/next/dist/docs/` before writing
  Next-specific code (see `AGENTS.md`).
- **Payload CMS 3.83** for content (products, posts, orders, media, users).
- **Postgres on Supabase** (Supavisor pooler) via `@payloadcms/db-postgres`.
- **Media storage: Supabase S3** via `@payloadcms/storage-s3` (path-style, `forcePathStyle: true`).
- **Deploy: Render.com**, auto-deploys from `main`. Repo: `github.com/suryaprakash8870/kanaa`.

## Architecture
- **Route groups isolate concerns**, each with its own root layout / `<html>`:
  - `(site)` — public storefront (Lenis smooth-scroll, Cart, fonts).
  - `(dashboard)` — custom admin (no Lenis/Cart). Auth via `payload-token` cookie.
  - `(payload)` — Payload's own admin at `/admin`.
- **Two admin surfaces, on purpose:**
  - `/admin` — Payload CMS (manage products, media, posts, orders).
  - `/dashboard` — lightweight custom ops UI we built (overview, orders, blog).
- **Auth model:** single `users` collection (`auth: true`, roles admin/editor). The
  custom dashboard logs in via Payload's local API, stores the JWT in an httpOnly
  `payload-token` cookie, and `src/middleware.ts` gates `/dashboard/*`.

## Database / connection gotchas
- `DATABASE_URL` must **not** contain `uselibpqcompat=true` — it breaks the node `pg` driver.
- Supabase pooler uses a self-signed cert → need **both** `ssl: { rejectUnauthorized: false }`
  in the pg pool **and** `NODE_TLS_REJECT_UNAUTHORIZED=0` in env (dev).
- Supabase **free tier auto-pauses** after ~1 week idle → "Tenant or user not found" /
  `ENOTFOUND`. Resume the project in the Supabase dashboard. Pages that read the DB
  (`/blog`, `/products`, spotlight) degrade gracefully (try/catch → empty state) rather
  than crashing.

## Content strategy
- **Marketing copy is hardcoded in components** (Hero, About/Our Story, AlternatingStory
  = "What We Use", Process = "Why Kanaa", FeaturedProducts, Testimonials). Edit the
  component to change copy.
- **Products & blog posts live in the CMS** (Payload). The storefront reads them at
  request time with ISR (`revalidate = 300`).
- **Testimonials are currently hardcoded** in `Testimonials.tsx` (not CMS).
- Product catalog (24 items) is defined in `src/app/(site)/api/seed/route.ts` and was
  loaded into the DB via a one-off reseed.

## Payments
- **Primary: UPI QR with manual verification.** Customer uploads a payment screenshot;
  admin verifies UTR/amount and flips order status to Paid (`verifiedAt` auto-stamped).
- **Razorpay** wired as an option (keys via env).
- Order statuses: awaiting_verification → pending → paid → shipped → delivered (plus
  rejected/cancelled/refunded).

## Styling conventions
- **Inline styles + scoped `<style>` blocks**, not Tailwind utility classes on components
  (Tailwind is installed but used minimally). Keep this consistent.
- **Brand palette:** ink green `#1F4A33`, cream `#FAF7F2` / `#FFF4D8`, mint `#DFF0D8`,
  terracotta `#C0301F`, accent green `#4FB83A`, gold `#C9A24A`.
- **Fonts (CSS vars):** `--font-playfair`, `--font-cormorant`, `--font-fraunces`,
  `--font-dm-sans`, `--font-caveat`, `--font-bricolage`, `--font-dm-serif`.

## Animation note (important)
- The storefront uses **Lenis smooth-scroll**, which does **not** emit native `window`
  scroll events. Scroll-linked effects must use a **`requestAnimationFrame` loop reading
  `getBoundingClientRect()`** (see `FeaturedProducts.tsx`), not `window.addEventListener('scroll')`.

## Home page section order (locked)
1. Hero → 2. Our Story → 3. What We Use → 4. Why Kanaa → 5. Featured Products → 6. Testimonials.
- Removed from home: Product Spotlight, At Our Table, CTA Banner (component files kept,
  just not rendered).

## Server-action patterns (learned the hard way)
- `redirect()` from `next/navigation` throws `NEXT_REDIRECT` — call it **outside** try/catch
  or it gets swallowed.
- Do **not** import `isRedirectError` from `next/navigation` in RSC — it isn't exported there.
- `payload.login()` returns `token?` (optional) — guard with `if (!result.token)` before
  setting the cookie.
