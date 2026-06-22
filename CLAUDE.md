@AGENTS.md

# Kanaa — project guide for AI agents

Kanaa is a homemade healthy South Indian food storefront. **Next.js 16.2.3 (App Router)
+ Payload CMS 3.83 + Postgres (Supabase) + S3 media + Render hosting.**

> Companion docs: `decision.md` (why things are the way they are), `todo.md` (what's left),
> `skill.md` (how to do common tasks). Read those before larger changes.

## Run & preview
- Dev: `npm run dev` (Next on port 3000, binds 0.0.0.0).
- The app reads env from **`.env.local`** (git-ignored — never commit it).
- DB must be reachable (Supabase project not paused) for `/admin`, `/dashboard`, products,
  and blog to work. Static pages render regardless; DB pages degrade to empty states.

## Directory map
```
src/app/(site)/        public storefront (home, products, blog, about, recipes, contact,
                       track, checkout, order-success) + /api routes (seed, checkout)
src/app/(dashboard)/   custom ops admin (/dashboard: login, overview, orders, blog)
src/app/(payload)/     Payload admin (/admin) — auto-generated importMap lives here
src/components/         all UI components (storefront + footer/hero/etc.)
src/payload/            payload.config.ts + collections/ (Users, Media, Products, Variants,
                       Posts, Orders, Offers, Testimonials)
src/middleware.ts       gates /dashboard/* on the payload-token cookie
public/                 static assets: hero-bg.jpg, blog/*, story/*, footer-scene.png, labels/
scripts/                seed.ts, reset-admin.mjs
```

## Conventions (match these)
- **Styling:** inline `style={{}}` + scoped `<style>{`...`}</style>` blocks. Don't introduce
  Tailwind utility classes on components. Use the brand palette + font CSS vars (see `decision.md`).
- **Copy:** marketing text is hardcoded in components; products/posts come from the CMS.
- **Images that the user supplies:** reference a path under `public/` and tell the user where
  to drop the file; prefer CSS `background-image` (a missing file shows nothing, no broken icon).
- **Scroll-linked animation:** use a rAF loop reading `getBoundingClientRect()` — Lenis
  swallows native scroll events.

## Home page order (do not reshuffle without asking)
Hero → Our Story (`About`) → What We Use (`AlternatingStory`) → Why Kanaa (`Process`) →
Featured Products (`FeaturedProducts`) → Testimonials.

## Hard rules
- **Never commit `.env.local`** or any secret (DB URL, `PAYLOAD_SECRET`, `S3_*` keys).
- **Don't push directly to `main`** unless the user explicitly says so — open a branch/PR.
- **No destructive DB ops** (mass deletes, password/credential rewrites) run by the agent —
  build the tool and have the **user** run it.
- After editing a file, verify with a typecheck/build rather than assuming.

## Deploy
- Push to `main` → Render auto-builds & deploys.
- Render needs the same env vars set in its dashboard (they're not in the repo):
  `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL` (the live URL),
  `NODE_TLS_REJECT_UNAUTHORIZED=0`, and all `S3_*`.
- `next build` runs `tsc` — fix type errors locally with `npx tsc --noEmit` before pushing.

## Known sharp edges
- Supabase free tier pauses when idle → DB errors; resume it in Supabase.
- `DATABASE_URL` must not include `uselibpqcompat=true`.
- Server actions: call `redirect()` outside try/catch; `payload.login()` token is optional.
- Standalone `tsx`/Payload scripts can hit a `@next/env` `loadEnvConfig` bug — prefer running
  logic inside the Next runtime, or talk to Postgres directly with `pg` for one-off scripts.
