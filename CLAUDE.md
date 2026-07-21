# TRUE VISION PROJECT — MASTER DOCUMENT
> This file is read automatically every session. It is the single source of truth. Always update it when something changes.

---

## THE PROJECT

**Brand:** True Vision Project (TVP)
**Live site:** truevisionproject.com
**GitHub:** richardmuodilim-droid/true-vision-project
**Deploy:** Auto-deploys via Vercel on every push to `main`
**Local path:** `C:\Users\muodi\Desktop\Antigravity Project\true-vision-project`

**Two founders:**
- Richard — Wexford, Ireland
- Partner — Bergamo, Italy

**Core statement:** "Built from nothing. Worn by those who understand."
**Est:** 2026

---

## ⚡ CURRENT DIRECTION — "THE INVITATION" (LOCKED JULY 2026)
> This section SUPERSEDES the "Conversion Funnel" section and any older strategy doc. No re-deciding for 60 days. If a request conflicts with this section, flag it before building.

**The idea:** TVP is not a shop. It is an invitation. You have to be let in.

**Four pillars:**
1. **Locked brand** — whole site behind an invite/password gate (built: `src/lib/gate.js`, `src/components/GateScreen.jsx`, see `GATE-NOTES.md`). Default code `UNDERSTOOD`, per-drop codes via `VITE_GATE_CODES` env.
2. **Numbered pieces** — every garment numbered; NFC tag planned (tap → its Vault record).
3. **Seeding, not ads** — gift numbered pieces to nano/micro creators + musicians (Ireland + Lombardy). Note: rising Wexford rapper Lil Skag = warm local target.
4. **Two-city editions** — Wexford Edition / Bergamo Edition per drop.

**ACTIVE DROP — THE HIDDEN-POCKET TRACKSUIT (founder decision, July 2026 — tracksuit ships FIRST):**
Full tracksuit (jacket + bottoms), 92% polyester / 8% elastane, ~300 GSM, four-way stretch, moisture-wicking. THE feature: hidden seamless zip pocket on the jacket + hidden zip pocket inside the waistband of the bottoms ("impossible to find" — secret only the owner knows; fits the vision/seeing lore). Three colorways: Pink/Black, Light Blue/Grey, Purple/Black. TV embroidered left chest + small back neck. Sizes S/M/L. €70/set. Numbered pieces per the Invitation system. Reference visuals generated in Claude Design (Richard has exports). Supplier: existing Pakistan contact, 3–4 wk lead. Quote pack: `TRACKSUIT-QUOTE-PACK.md`.
**QUEUED NEXT — EDITION 01 "THE VISION CHART" TEE (design final, do not reopen):** full package ready (`TEE-SAMPLE-ORDER-SPEC.docx` + `TVP-EDITION01-PRINT-ARTWORK.pdf` + `TVP-EDITION01-MOCKUP.png`). Ships as the drop after the tracksuit. The chart remains the brand's repeatable FORMAT.

**Who works where (two rooms, one brain):**
- **Claude Code** = code room: build, test (`npm run build`), commit, push, deploy.
- **Fable (Cowork)** = strategy room: research, plans, documents, design, outreach assets.
- Only ONE session edits the repo at a time. This file is the shared brain — both update it.

**Weekly rhythm (both founders work full-time — keep it small):**
- Richard: outreach DMs (Ireland) + one weekly 30-min call with partner. ~3–4 h/week.
- Partner (Bergamo): production line (supplier/sample/batch/shipping) + Italian outreach. ~3–4 h/week.
- AI: everything repeatable — scripts, copy, emails, research, tracking.

**60-day sequence:** gate live → sample ordered → seeding list + DMs (wk 2–3) → pre-order opens members-first, buyers get 2 invites (wk 4) → batch + fulfil + seed pieces ship (wk 5–6) → one small real-world pickup event in Wexford, filmed (wk 7–8).

**NEXT ACTIONS (July 2026 — tracksuit-first):**
1. Richard/Partner: send `TRACKSUIT-QUOTE-PACK.md` + Claude Design reference images to the Pakistan supplier → get sample-set cost, unit cost at 50/100, lead time IN WRITING. Fable checks margin before any payment.
2. Order ONE sample set (one colorway) on quote approval. No batch before sample in hand.
3. Richard + Partner: seeding DMs from `SEEDING-OUTREACH-PACK.md` continue unchanged (Lil Skag first) — seeded pieces become tracksuits.
4. Claude Code: adapt pre-order page plan to the tracksuit (reuse `/drop-002` teaser + waitlist, add Stripe checkout when sample approved).
5. Edition 01 tee: frozen, package complete, next drop after tracksuit.
DONE: gate live · seeding pack · tee package (queued) · tracksuit visuals · master plan repointed.

**Key docs:** `TVP-HONEST-BRIEF.md` (the honest diagnosis) · `GATE-NOTES.md` (gate handoff) · `TEE-SAMPLE-ORDER-SPEC.docx` (supplier spec) · `THE-STATEMENT-TEE-PACK.md` (superseded by Edition 01 spec above).
**Design lives in Figma:** https://www.figma.com/design/lY3xDW4oWf3uw8IDtAyNhk (file key `lY3xDW4oWf3uw8IDtAyNhk`) — Vision Chart artwork, editable. Workflow: Fable executes design changes there on request; founders comment in Figma; final export → print files for supplier.

**Drop 001 status:** closed / unavailable. (Candid internal history is kept privately in Claude's memory, not in this repo — do not restate it in committed files.)

---

## COMMANDS

```bash
npm run dev          # local dev server (localhost:5173)
npm run build        # production build check — always run before pushing
git add [files] && git commit -m "..." && git push   # deploys to Vercel in ~60s
```

Always push specific files. Never `git add .` blindly — avoid committing .env or secrets.

---

## TECH STACK

| Layer      | Tech                                              |
|------------|---------------------------------------------------|
| Frontend   | React 18 + Vite + TailwindCSS + Framer Motion    |
| Routing    | React Router v6 — BrowserRouter + Routes         |
| Hosting    | Vercel (auto-deploy on push to main)              |
| Database   | Vercel KV (Redis)                                 |
| Email      | Resend — FROM archive@truevisionproject.com       |
| Payments   | Stripe live                                       |
| DNS        | Namecheap — all records verified                  |

---

## DESIGN SYSTEM — NEVER DEVIATE

**Background:** `#F5F3EE` (warm off-white — everywhere)
**Dark sections:** `#111111`
**Drop 002 dark:** `#0a0909`

**Fonts (imported from src/lib/design.js):**
```js
import { mono, serif, inter, ease, reveal, lineGrow } from '../lib/design'

mono  = { fontFamily: "'Space Mono', monospace" }    // labels, buttons, UI
serif = { fontFamily: "'Cormorant Garamond', serif" } // headlines, editorial
inter = { fontFamily: "'Inter', sans-serif" }         // body text
ease  = [0.16, 1, 0.3, 1]
```

**Always import from `../lib/design` — never redefine locally.**

**Colors:** Black `#111111` text. Opacity layers: /80 /60 /50 /38 /28 /18
**No colour accents.** No gradients except atmospheric.
**Image treatment:** `filter: saturate(0.18) brightness(0.90)` on all cap/product photos
**Corner marks:** absolute spans with border-black/12
**Grain overlay:** `<div className="grain" aria-hidden="true" />` — always on full pages

---

## FULL ROUTING

| Route              | File                        | Notes                                    |
|--------------------|-----------------------------|------------------------------------------|
| `/`                | `src/pages/Home.jsx`        | Store + story + Drop 002 CTA             |
| `/our-story`       | `src/pages/OurStory.jsx`    | 8-section brand story                    |
| `/drop-002`        | `src/pages/Drop002.jsx`     | Tracksuit teaser + waitlist signup       |
| `/archive`         | App.jsx > ArchiveFlow       | TVP membership signup flow               |
| `/product/:id`     | `src/pages/Product.jsx`     | Product detail (cap is sold out)         |
| `/category/:slug`  | `src/pages/Category.jsx`    | Category filter                          |
| `/checkout`        | `src/pages/Checkout.jsx`    | 3-step checkout                          |
| `/order-success`   | `src/pages/OrderSuccess.jsx`| Post-payment confirmation                |
| `/intro`           | `src/pages/Landing.jsx`     | Cinematic entrance (optional)            |
| `/archive-admin`   | `src/components/AdminPage.jsx` | Password-protected command centre     |

**StoreShell** = Navbar + Cart drawer + Outlet  
**ArchiveFlow** = screen-based state (Vault → DecryptionScreen → ArchiveEntry)  
**No Navbar on:** `/intro`, `/drop-002`, `/archive`, `/archive-admin`

---

## ALL API ENDPOINTS

| File                        | Method | Does                                          |
|-----------------------------|--------|-----------------------------------------------|
| `submit.js`                 | POST   | Archive registration + welcome email + auto-adds to Drop 002 waitlist |
| `lookup.js`                 | POST   | Check if email is an Archive member           |
| `ping.js`                   | POST   | Log member last-seen timestamp                |
| `count.js`                  | GET    | Return total Archive member count             |
| `admin.js`                  | POST   | All members + financials + Drop 002 count     |
| `delete.js`                 | DELETE | Remove a member                               |
| `create-checkout-session.js`| POST   | Stripe checkout session                       |
| `order-confirm.js`          | POST   | Send order confirmation emails                |
| `create-promo.js`           | POST   | Create Stripe promo code                      |
| `list-promos.js`            | POST   | List all promo codes                          |
| `drop002-waitlist.js`       | POST   | Add email to Drop 002 waitlist                |
| `send-welcome-all.js`       | POST   | Bulk resend welcome emails                    |
| `unsubscribe.js`            | GET/POST | One-click unsubscribe (List-Unsubscribe header target). GET=page, POST=one-click. Adds to suppression, removes from lists |
| `send-update.js`            | POST   | Admin broadcast to all members — suppression-aware, `{NAME}` personalisation, `test` field for preview send |

**Vercel KV keys:**
- `tvp:emails` — Archive members (hset by email)
- `tvp:members` — Archive members (lpush)
- `tvp:count` — Archive member count
- `tvp:lastseen` — Last access timestamps
- `tvp:drop002:waitlist` — Drop 002 waitlist (set — auto-populated when Archive member joins)
- `tvp:unsubscribed` — Suppression set. Checked before every broadcast; cleared on explicit re-signup. NEVER email an address in this set.

**Email rules (deliverability — never break):**
- Every email MUST include `List-Unsubscribe` + `List-Unsubscribe-Post: List-Unsubscribe=One-Click` headers (Gmail/Yahoo reject bulk mail without them)
- Unsubscribe link = `https://truevisionproject.com/api/unsubscribe?email=<encoded>`
- Always check `tvp:unsubscribed` before sending to a list
- Plain text for confirmations/updates (best deliverability); HTML only for the rich welcome

**Env vars (never hardcode):**
`RESEND_API_KEY`, `STRIPE_SECRET_KEY`, `ADMIN_PASSWORD`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`

---

## CURRENT DROP STATUS

### DROP 001 — THE FOUNDATION CAP
- **Status: CLOSED** (honest: 24 units made — some sold, some gifted to a rapper/sponsors, some unsold. Public framing: unavailable. Do not cite as sellout proof.)
- Price: €32 + €6 shipping per hat
- Colours: Black, White
- Stock in products.js: `{ 'One Size': 0 }` — shows as sold out on product page

### DROP 002 — THE TRACKSUIT
- **Status: ACTIVE — ships FIRST (founder decision July 2026). See "ACTIVE DROP" section above for the current spec (hidden pockets, 3 colorways, €70).**
- Price: €70 full set
- Sizes: S / M / L
- Colourways: Purple/Black, Light Blue/Grey, Pink/Black
- Feature: Hidden zip pocket (jacket) + hidden waistband pocket (bottoms)
- Supplier: Pakistan — 3-4 week lead time
- Strategy: Pre-order after 40 orders, OR 100-unit stall run across Ireland + England
- Images in public/: `ts-blue.jpg`, `ts-all-front.png`, `ts-all-back.png`, `ts-pocket.jpg`, `ts-tags.png`
- Page: `/drop-002` — full teaser + 2-step signup form

---

## MEMBERSHIP / WAITLIST SYSTEM

**Archive = TVP membership. One system. Two entry points.**

| Entry | Route | Stores to |
|-------|-------|-----------|
| Archive Vault | `/archive` | `tvp:members` + `tvp:drop002:waitlist` |
| Drop 002 waitlist | `/drop-002` form | `tvp:drop002:waitlist` only |

Archive members have **48h early access** to every drop.
Both funnels lead to the same Drop 002 waitlist.

**Welcome email** (sent on Archive signup):
- Confirms membership number
- Mentions Drop 001 sold out
- Confirms Drop 002 priority access
- Links to `/drop-002`

---

## CONVERSION FUNNEL — MOVEMENT FIRST

**Core principle:** TVP is a movement, not a shop. The #1 action everywhere is **Join the Movement** (membership), NOT buy a product. Products are what members get access to. The member IS the point; the product is the consequence.

**Goal:** Every visitor → becomes a member → represents → buys/shares as a consequence.

```
Homepage (/)
  ↓ Hero CTA: [ Join the Movement ] → /archive   (primary action everywhere)
  ↓ Section 02: THE MISSION (representation / unity / built from nothing)
  ↓ Section 03 (Drop 001 proof) CTA: [ Join the Movement ] → /archive
  ↓ Section 04 (Drop 002 teaser) CTA: [ Join the Movement ] → /archive
       + secondary text link "See what's coming →" → /drop-002
  ↓ Floating mobile bar: "Be part of something real" → /archive

Archive (/archive) — THE membership entry (Vault)
  ↓ Email → Name → Submit  ("Join the Movement" / "Become a Member" / "You're In")
  ↓ DecryptionScreen animation
  ↓ ArchiveEntry — the MEMBER INTERIOR (movement, not product):
       Member Manifest (status, 48h access, what we stand for, origin, proof, next drop)
       Gallery: founders / community / Wexford / Bergamo
       "You're not a customer. You're part of this. You go first — always."

Drop 002 (/drop-002) — product teaser, still has its own signup
  ↓ Mission framing ("The Next Statement") → product → Email → Name → confirm

Navbar (store pages)
  → Prominent bordered button: "Join the Movement" → /archive
  → Our Story / Drop 002 as text links (secondary)
```

---

## WHAT'S BUILT ✅

- Landing / hero page
- Editorial store homepage
- Product detail page (cap shows as sold out)
- Cart drawer
- Checkout — 3-step
- Stripe live payments
- Order success page with email
- Archive member system (Vault → Decrypt → ArchiveEntry)
- Drop 002 waitlist page (teaser + 2-step form + animation)
- WaitlistConfirmScreen (scanning animation)
- Welcome email (updated for Drop 002)
- Admin panel (members, financials, promo codes)
- Promo / discount code system (Stripe-backed)
- Our Story — 8-section editorial
- Footer — consistent across all pages
- Shared design tokens (`src/lib/design.js`)
- Mobile hamburger nav
- Invitation gate (GateScreen + gate.js + GATE-NOTES.md) — **built, NOT yet deployed**
- Edition 01 tee supplier spec (TEE-SAMPLE-ORDER-SPEC.docx)

## WHAT'S NOT BUILT YET ❌

- Order confirmation email after Stripe payment (api/order-confirm.js exists but needs testing)
- Stock tracking in admin (decrement on order)
- Admin order log
- Drop 002 product page (tracksuit) with Stripe checkout
- TikTok Shop integration
- Stall location tracker page
- Gate deploy (build → commit → push — FIRST code task)
- Edition 01 pre-order page (tee, numbered, two city editions, members-first)
- Seeding target list + DM scripts (Fable, in progress)
- NFC tag integration (tap → Vault record) — later, not blocking

---

## ABSOLUTE RULES — NEVER BREAK

- Always `€` never `$`
- Never show unit counts on landing/hero
- Never say "No restock" or "No compromise"
- Never add Navbar to `/intro`, `/drop-002`, `/archive`, `/archive-admin`
- Welcome emails = plain text only (deliverability)
- Always run `npm run build` before pushing
- Always push after every change
- Never commit `.env` or secrets
- Never add features not explicitly requested
- No comments in code unless the WHY is non-obvious
- Never use: "authentic", "artisan", "craft", "elevated", "bespoke"
- Shipping = `qty × €6` — never a flat rate

---

## BRAND VOICE

| Use | Avoid |
|-----|-------|
| Specific + honest — real numbers, real places | Generic marketing language |
| "Built between Ireland and Italy" | "elevated", "curated", "bespoke" |
| Space Mono = technical/archive language | Over-explanation |
| Cormorant Garamond = emotional/human | Superlatives |
| "Built from nothing. Worn by those who understand." | |

---

## ADMIN ACCESS

**URL:** truevisionproject.com/archive-admin
**Password:** set via the `ADMIN_PASSWORD` env var in Vercel — NEVER write the value in this file (repo may be public). The old hardcoded password is burned and must be rotated.

Shows: Archive members, last seen, revenue, break-even, promo codes, Drop 002 waitlist count.

---

## HOW TO WORK WITH RICHARD

- Read intent, not just literal words — he types fast
- When he says "go" — build it immediately, don't plan out loud
- Always check if something already exists before building
- Report back in 1–2 sentences after completing a task
- If unclear, do the most obvious thing and state what you did
- Always update this CLAUDE.md when something significant changes
- Keep the whole ecosystem in mind — nothing is ever random
