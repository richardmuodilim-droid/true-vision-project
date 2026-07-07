# True Vision Project — Full Briefing
*Paste this at the start of any Claude session to get full context.*

---

## What This Is

True Vision Project (TVP) is an Irish streetwear / editorial brand launched in 2026.
Co-founded by two people: one from Wexford, Ireland — one from Bergamo, Italy.
Built from nothing. No investors, no connections, no industry background.
The brand is as much a mindset and a story as it is a clothing label.

**Live site:** https://truevisionproject.com
**GitHub:** https://github.com/richardmuodilim-droid/true-vision-project
**Deployed on:** Vercel (auto-deploys from GitHub main branch)
**Contact / from email:** archive@truevisionproject.com

---

## Brand Identity

**Core statement:** "Built from nothing. Worn by those who understand."
**Origin:** Wexford, Ireland × Bergamo, Italy
**Founded:** 2026
**Mission:** Not a brand — a documented mission. Proof that ordinary beginnings can produce extraordinary things.
**Target audience:** People who work in silence, build without applause, refuse to let where they started define where they finish.

**Design system:**
- Background: `#F5F3EE` (warm off-white)
- Primary text: `#111111`
- Text scale: `rgba(0,0,0,0.x)` for hierarchy
- Fonts: Space Mono (technical labels) + Cormorant Garamond (editorial/serif) + Inter (body)
- Aesthetic: clean, minimal, cinematic, editorial — NOT loud streetwear
- Cap images: desaturation filter `saturate(0.18) brightness(0.93)`
- Corner marks on image containers
- Grain overlay on all pages

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React 18 + Vite |
| Styling | TailwindCSS + inline styles |
| Animation | Framer Motion |
| Routing | React Router v6 |
| Backend (API) | Vercel Serverless Functions (`/api/` directory) |
| Payments | Stripe (hosted checkout, promotion codes) |
| Email | Resend (from: archive@truevisionproject.com) |
| Storage | Vercel KV (members, orders) |
| Hosting | Vercel |

---

## Site Structure

```
/ → Home (store + editorial hero)
/intro → Landing (cinematic entrance page)
/our-story → Brand story (8-section cinematic scroll)
/archive → Archive vault (member sign-up / early access)
/archive-admin → Password-protected admin panel
/product/:id → Product detail page
/checkout → Multi-step checkout (email → shipping → review)
/order-success → Post-payment confirmation
```

---

## What's Been Built

### Drop 001 — The Foundation Cap
- One product: Foundation Cap
- Two colours: Black + White
- Price: €32 + €6 shipping per hat
- 24 units total, limited by design
- Data in: `src/data/products.js`

### Payments (Stripe)
- Full Stripe hosted checkout
- Promo/discount codes supported (`allow_promotion_codes: true`)
- Shipping: €6 × quantity (per hat, not flat rate)
- 80+ countries supported
- Files: `api/create-checkout-session.js`

### Order Confirmation Emails (Resend)
- Customer email: order ref, items, colour/size, shipping address, what happens next
- Internal email: same info + full customer address for fulfilment
- Files: `api/order-confirm.js`

### Archive (Member System)
- Email sign-up with decryption animation
- Members stored in Vercel KV
- Members get early access to future drops
- Files: `src/components/Vault.jsx`, `src/components/DecryptionScreen.jsx`
- APIs: `api/register.js`, `api/verify.js`

### Promo Code System (Stripe-backed)
- Admin can create personalised codes per promoter
- Each code: name, discount %, max uses, tracked redemptions
- Built on Stripe Coupons + Promotion Codes API
- Files: `api/create-promo.js`, `api/list-promos.js`

### Admin Panel (`/archive-admin`)
- Password: `[rotated — set in Vercel env]`
- Shows: member count, revenue, break-even progress, financial model
- Member registry with delete
- Promo code generator + usage tracker
- File: `src/components/AdminPage.jsx`

### Our Story Page (`/our-story`)
- 8 sections, cinematic scroll experience
- Dark/light alternating sections
- Line-by-line text reveal animations (slide up from below)
- Clip-path wipe animations on images
- 3 photo placeholder slots (waiting for founder photos)
- File: `src/pages/OurStory.jsx`

---

## Key API Files

```
api/create-checkout-session.js  → Stripe session creation
api/order-confirm.js            → Sends confirmation emails via Resend
api/create-promo.js             → Creates Stripe promo codes (admin only)
api/list-promos.js              → Lists all promo codes + redemption stats
api/admin.js                    → Admin dashboard data (members, financials)
api/register.js                 → Archive member sign-up
api/verify.js                   → Archive member email verification
api/delete.js                   → Delete member (admin only)
```

---

## Key Frontend Files

```
src/pages/Home.jsx          → Main store page (hero + product + manifesto)
src/pages/OurStory.jsx      → Brand story (8-section cinematic)
src/pages/Landing.jsx       → /intro entrance page
src/pages/Checkout.jsx      → 3-step checkout form
src/pages/OrderSuccess.jsx  → Post-payment page
src/components/AdminPage.jsx    → Full admin command center
src/components/Navbar.jsx       → Fixed top nav
src/components/Cart.jsx         → Slide-in cart sidebar
src/components/Vault.jsx        → Archive sign-up flow
src/data/products.js            → Product data (price, name, colours)
src/context/CartContext.jsx     → Global cart state
```

---

## Environment Variables (Vercel)

```
STRIPE_SECRET_KEY     → Stripe live secret key
RESEND_API_KEY        → Resend email API key (re_5VdShmMD_...)
KV_REST_API_URL       → Vercel KV URL
KV_REST_API_TOKEN     → Vercel KV token
ADMIN_PASSWORD        → Not set in Vercel (falls back to hardcoded value)
```

---

## What's Pending / Next

### Drop 002 — The Windbreaker Jacket
- Pre-order model (pay first, produce after 30+ orders)
- Price point: ~€85–95
- Oversized fit, S/M/L only
- Strategy: rappers reveal it before TVP announces publicly
- Archive members get 48h early access before public
- Needs: teaser page `/drop-002`, pre-order flow, archive gate

### Founder Photos (Our Story page)
Three slots waiting:
1. **Slot A** — One founder, portrait 3:4, outdoors, candid/natural
2. **Slot B** — Both founders, wide landscape (21:9), cinematic
3. **Slot C** — Other founder, portrait 3:4, same vibe
Drop in via `src` prop on the `<Photo>` component in `OurStory.jsx`

### Promoter Campaign
- Promo code system is live in admin
- Next: brief 2–3 rappers, send them Drop 001 caps + their unique codes
- Their audience gets discount, TVP tracks redemptions

---

## Brand Story (for copy / content)

Two co-founders. One from a small town in Wexford, Ireland. One from Bergamo, Italy. Different languages, different skies — same story.

Both came from ordinary families. People who worked hard, asked for little, gave everything. No silver spoons, no shortcuts, no connections.

That background does one of two things: it makes you accept less, or it makes you refuse to. They refused.

They didn't start True Vision because they had money or a blueprint. They started because they had nothing — and decided that was enough to begin.

Every product carries that. Every hat is physical proof that it is possible — to start from zero, build something real, with integrity and purpose.

**For:** the ones who work in silence. Who build without applause. Who carry their family's name as a responsibility, not just an identity.

**The statement:** "Built from nothing. Worn by those who understand."

---

## How to Work With This Project

- All code changes → push to GitHub main → Vercel auto-deploys in ~60 seconds
- Test payments in Stripe test mode before going live
- Admin panel at `/archive-admin` password: `[rotated — set in Vercel env]`
- Email sending via Resend — verified domain `truevisionproject.com`
- Stripe promotion codes are created in the admin panel, used at Stripe checkout

---
*Last updated: May 2026*
