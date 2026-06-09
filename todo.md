# TODO — Kanaa

Status: `[ ]` open · `[~]` in progress · `[x]` done. Newest priorities at the top of each group.

## 🔴 Launch blockers
- [ ] **Set env vars on Render** (Environment tab): `DATABASE_URL`, `PAYLOAD_SECRET`,
      `NEXT_PUBLIC_SERVER_URL` (= live URL, not localhost), `NODE_TLS_REJECT_UNAUTHORIZED=0`,
      `S3_BUCKET`, `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`.
      Without these the deployed app can't reach the DB.
- [ ] **Confirm the production deploy is green** on Render after the latest push.
- [ ] **Upload product hero images** for the 24 products (Admin → Products → Hero Image).
      Cards currently show a colored initial placeholder.

## 🟡 Content & data
- [ ] Replace placeholder **contact details** if needed (currently `kanaafoods@gmail.com`,
      `+91 89398 74391`) — appears in footer + contact page.
- [ ] Fill in real **ingredients** per product (Products collection has an `ingredients`
      field) so product cards can show real chips instead of `Category · Homemade · Natural`.
- [ ] Write/confirm real **blog posts** (4 seeded samples exist).
- [ ] Optional: add the handwritten **callout labels** (Sun-dried Mangoes, Stone Ground
      Spices, etc.) around the Our Story image — either baked into `story2.png` or as live text.
- [ ] Consider moving **testimonials** into the CMS (currently hardcoded in `Testimonials.tsx`).

## 🟢 Admin / ops
- [ ] **Change admin password** in the UI to a permanent one (Users → kanaa@gmail.com).
- [ ] **Delete `scripts/reset-admin.mjs`** once you no longer need it (it can rewrite the
      admin password from a local machine).
- [ ] Review Payload `/admin` for any field/access tweaks (the active task).

## 🔵 Housekeeping
- [ ] Decide whether to **delete the 3 unused components** removed from home
      (`ProductSpotlight` + `ProductSpotlightClient`, `AtOurTable`, `CTABanner`) or keep them.
- [ ] Commit the image assets (`public/story/*`, `public/footer-scene.png`, `public/blog/*`)
      — already committed in the revamp; verify on the live build.
- [ ] Tidy `git`: the work shipped via branch `kanaa-site-revamp` → merged to `main`.

## ✅ Recently done
- [x] Full content rebrand to homemade-health positioning across all pages.
- [x] Custom `/dashboard` (login, overview, orders, blog) + middleware auth.
- [x] Public blog (`/blog`, `/blog/[slug]`) + Posts collection + rich-text renderer.
- [x] New `/about` and `/recipes` pages.
- [x] Redesigned Our Story (layered rotating artwork) + footer (shop illustration).
- [x] Product cards restyled (flash-message look) with working category filter.
- [x] Featured Products scroll-parallax section.
- [x] Reseeded 24-product catalog; product images pending.
- [x] Home section order locked to the intended 6.
- [x] Admin password reset flow (local script).
