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

**Vercel KV keys:**
- `tvp:emails` — Archive members (hset by email)
- `tvp:members` — Archive members (lpush)
- `tvp:count` — Archive member count
- `tvp:lastseen` — Last access timestamps
- `tvp:drop002:waitlist` — Drop 002 waitlist (set — auto-populated when Archive member joins)

**Env vars (never hardcode):**
`RESEND_API_KEY`, `STRIPE_SECRET_KEY`, `ADMIN_PASSWORD`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`

---

## CURRENT DROP STATUS

### DROP 001 — THE FOUNDATION CAP
- **Status: SOLD OUT**
- 24 units. Sold out in 24 hours. No restock.
- Price: €32 + €6 shipping per hat
- Colours: Black, White
- Stock in products.js: `{ 'One Size': 0 }` — shows as sold out on product page

### DROP 002 — THE TRACKSUIT
- **Status: COMING AUGUST 2026**
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

## CONVERSION FUNNEL

**Goal:** Every visitor → email captured → waitlist.

```
Homepage (/)
  ↓ Hero CTA: [ Join the Waitlist ] → /drop-002
  ↓ Drop 001 section CTA: [ Join Drop 002 Waitlist ] → /drop-002
  ↓ Section 05 CTA: [ Join the Waitlist ] → /drop-002

Drop 002 (/drop-002)
  ↓ Scroll through teaser (tracksuit, colourways, hidden pocket)
  ↓ Email → Name → Submit
  ↓ WaitlistConfirmScreen animation
  ↓ Confirmed state

Archive (/archive)
  ↓ Email → Name → Submit
  ↓ DecryptionScreen animation
  ↓ ArchiveEntry (sees Drop 002 as next drop, button → /drop-002)

Navbar (always visible on store pages)
  → Drop 002 button (bordered, prominent)
  → Our Story / Archive links
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

## WHAT'S NOT BUILT YET ❌

- Order confirmation email after Stripe payment (api/order-confirm.js exists but needs testing)
- Stock tracking in admin (decrement on order)
- Admin order log
- Drop 002 product page (tracksuit) with Stripe checkout
- TikTok Shop integration
- Stall location tracker page

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
**Password:** `BUILTFROMNOTHING2026`

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
