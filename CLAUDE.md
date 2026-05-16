# TRUE VISION PROJECT — CLAUDE INSTRUCTIONS
> This file is read automatically by Claude Code every session. Never delete it.

---

## THE PROJECT

Irish fashion brand and editorial store. Live at **truevisionproject.com**.
GitHub: `richardmuodilim-droid/true-vision-project`
Auto-deploys to Vercel on every push to `main`.

Richard (user) is the co-founder and builds everything with Claude. His partner handles social media.
Move fast. Build clean. Push after every change.

---

## COMMANDS

```bash
npm run dev          # local dev server
npm run build        # production build check
git add [files] && git commit -m "..." && git push   # deploy to Vercel
```

Always push specific files, never `git add .` blindly — avoid committing .env or secrets.
Always push after completing a task. Vercel deploys automatically.

---

## TECH STACK

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + TailwindCSS + Framer Motion |
| Routing | React Router v6 — BrowserRouter + Routes |
| Hosting | Vercel (auto-deploy) |
| Database | Vercel KV (Redis) |
| Email | Resend — FROM archive@truevisionproject.com |
| Payments | Stripe live |
| DNS | Namecheap — all records verified |

---

## ROUTING

| Route | File | Notes |
|---|---|---|
| `/` | `src/pages/Landing.jsx` | NO Navbar — standalone cinematic entrance |
| `/store` | `src/pages/Home.jsx` | StoreShell |
| `/product/:id` | `src/pages/Product.jsx` | StoreShell |
| `/category/:slug` | `src/pages/Category.jsx` | StoreShell |
| `/checkout` | `src/pages/Checkout.jsx` | StoreShell |
| `/order-success` | `src/pages/OrderSuccess.jsx` | StoreShell |
| `/archive` | ArchiveFlow in App.jsx | Screen-based state — NOT React Router |
| `/archive-admin` | `src/components/AdminPage.jsx` | Password protected |

**StoreShell** = Navbar + Cart drawer + Outlet with `{ onCartOpen }` context.

---

## API ENDPOINTS

All in `/api/` — Vercel serverless functions.

| File | Method | Does |
|---|---|---|
| `submit.js` | POST | Register member, send welcome email (plain text) |
| `lookup.js` | POST | Check if email already exists |
| `ping.js` | POST | Log member last-seen timestamp |
| `count.js` | GET | Return total member count |
| `admin.js` | POST | Return all members + lastseen (password protected) |
| `delete.js` | DELETE | Remove a member |
| `create-checkout-session.js` | POST | Create Stripe checkout session |
| `send-welcome-all.js` | POST | Bulk resend welcome email |

**Vercel KV keys:** `tvp:emails`, `tvp:members`, `tvp:count`, `tvp:lastseen`

**Env vars (never hardcode):** `RESEND_API_KEY`, `STRIPE_SECRET_KEY`, `ADMIN_PASSWORD`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`

---

## DESIGN SYSTEM — NEVER DEVIATE FROM THESE

**Fonts:**
- `'Space Mono', monospace` — technical labels, metadata, buttons, IDs
- `'Cormorant Garamond', serif` — narrative headings, quotes, story copy

**Shorthand used in files:**
```js
const mono = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }
```

**Colors:** Pure black `#000000` bg. White text with opacity layers (/85 /60 /40 /25 /15).
**No colour accents.** No gradients except atmospheric radial black/white.

**Images:** Cap photos always desaturated — `filter: saturate(0.12) brightness(0.88)`

**Corner marks pattern:**
```jsx
<span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/25" />
<span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/25" />
```

**Animation easing:** Always `[0.16, 1, 0.3, 1]` — never use default ease
**Grain overlay:** `<div className="grain" aria-hidden="true" />` — always present on full pages

**Currency:** Always `€` — never `$`

---

## ABSOLUTE RULES — NEVER BREAK THESE

- Never use `$` dollar signs anywhere — always `€`
- Never show unit counts ("20 units", "only X left" on landing)
- Never say "No restock" or "No compromise" anywhere on the site
- Never add Navbar to the `/` Landing route
- Never send HTML welcome emails — plain text only (deliverability fix)
- Never commit `.env` files or secrets
- Never add features not explicitly requested
- Never add comments explaining what code does — only add comments for non-obvious WHY
- Never use: "authentic", "artisan", "craft", "elevated", "bespoke" in copy
- Always push to GitHub after changes so Vercel deploys

---

## BRAND VOICE

**Two founders.** One from Wexford, Ireland. One from Bergamo, Italy. Both from working families. No money, no backing, no connections. Built from nothing.

**The Archive** = member area. Members are not customers — they are the foundation. People who believed early.

**Core statement:** "Built from nothing. Worn by those who understand."

**Copy rules:**
- Specific and honest — real details, real numbers, real places
- Never generic marketing language
- Monospace text = technical/archive language
- Serif text = emotional/human language
- Both together = the brand

---

## WHAT'S BUILT (STATUS)

- [x] Landing page — cinematic two-door entrance
- [x] Editorial store home — Foundation Cap with add-to-cart
- [x] Product detail page — full color/size/qty/accordion
- [x] Cart drawer
- [x] Checkout — 3-step form
- [x] Stripe live payments
- [x] Order success page
- [x] Archive member system — registration, returning member, localStorage
- [x] Vault — email → lookup → name → confirmation screen → archive
- [x] Welcome email — plain text, spam-safe
- [x] Resend domain verified on Namecheap (DKIM + SPF + DMARC)
- [x] Admin panel — members, last seen, financials
- [x] Navbar simplified — logo + Archive link + cart only
- [x] All prices €32, shipping €6

## WHAT'S NOT BUILT YET (NEXT UP)

- [ ] Order confirmation email after Stripe payment
- [ ] Discount / promo code system (for rappers / influencers)
- [ ] Stock tracking — decrement on order, show in admin
- [ ] Admin order log — full order history
- [ ] "Notify me" for Drop 002 — email capture

---

## HOW TO WORK WITH RICHARD

- Read intent, not just literal words — he types fast
- When he says "go ahead" — build it immediately
- When he says "do this" — do it, don't plan out loud first
- Always check if something already exists in the code before building it
- Report back in 1–2 sentences after completing a task
- If unclear, do the most obvious thing and state what you did
- Never ask about optional parameters — make a sensible choice and move on
