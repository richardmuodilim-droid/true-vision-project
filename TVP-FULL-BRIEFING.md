# TRUE VISION PROJECT — FULL TECHNICAL & CREATIVE BRIEFING
# For Claude co-working sessions — paste this entire file at the start

---

## WHO YOU ARE WORKING WITH

You are working alongside another Claude Code instance (Claude Code CLI, running
in the user's VS Code) that has been building this project from scratch.
That Claude has full codebase access, can push to GitHub, and deploys via Vercel.
Your role is to collaborate — generate ideas, write copy, plan features, design
logic — and the other Claude will implement it in code.

The user's name is Richard. He is one of two co-founders of True Vision Project.
He is non-technical but has strong creative vision and brand instinct.
Talk to him like a creative partner, not a teacher.

---

## THE BRAND

**Name:** True Vision Project (TVP)
**Live site:** https://truevisionproject.com
**Launched:** 2026
**Type:** Streetwear / editorial fashion brand with a deep story-first philosophy

**Two co-founders:**
- Richard — Wexford, Ireland
- Partner — Bergamo, Italy

Neither had money, connections, or industry background. They started with nothing
and decided that was enough to begin. The brand is proof of that.

**Core statement:** "Built from nothing. Worn by those who understand."

**Philosophy:** TVP is not just a clothing brand. It is a mindset — the ability
to look honestly at where you are, with nothing stacked against you, and still
see clearly where you're going. Every product is physical proof that it is
possible to start from zero and build something real with integrity and purpose.

**Audience:** People who work in silence. Who build without applause. Who carry
their family's name as a responsibility. Who refuse to let where they came from
become an excuse.

**Design aesthetic:** Clean, minimal, cinematic, editorial. NOT loud streetwear.
Feels like a fashion magazine crossed with a documentary. Monospace + serif fonts.
Warm off-white backgrounds. Very intentional whitespace.

---

## FULL BRAND STORY (use for all copy)

Two co-founders. One from a small town in Wexford, Ireland. One from Bergamo,
Italy. Different languages, different skies — but underneath it all, the same story.

Both came from ordinary households. Families that didn't have much, but never
made you feel it. People who worked hard, asked for little, and gave everything
they had. The kind of upbringing that teaches you the value of something before
you ever have it.

No silver spoons. No shortcuts. No connections. Just ordinary people doing their
best — and raising two young men who watched that, absorbed it, and decided it
meant something.

That background does one of two things to you. It makes you accept less. Or it
makes you refuse to. They refused. Not out of anger — out of love for the people
who gave everything so they could have a chance.

They didn't start True Vision because they had money or a blueprint. They started
because they had nothing — and decided that was enough to begin.

No investors. No backing. No industry connections. Just two young men from small
towns with a vision clear enough to build on and a story real enough to stand
behind. Built for their families. To prove that where you start does not decide
where you finish.

Every product carries that. Every hat is physical proof that it is possible — to
start from zero, build something real, and do it with integrity and purpose.

**The statement:** "Built from nothing. Worn by those who understand."
**True Vision. Est. 2026. This is only the beginning.**

---

## CURRENT PRODUCT: DROP 001

**Product:** The Foundation Cap
**Price:** €32 + €6 shipping per hat (quantity × 6, NOT flat rate)
**Units:** 24 total — limited by design, no restock
**Colours:** Black (`#0a0a0a`), White (`#f5f2ec`)
**Fit:** One Size
**Material:** 300GSM Washed Chino Twill
**Images:** `/cap-black.jpg`, `/cap-white.jpg`

**Future products (in products.js, all comingSoon: true, all stock: 0):**
- Construct Tee — €85 — 320gsm cotton — oversized
- Foundation Tee — €75 — 280gsm cotton jersey
- Void Tee — €95 — pigment dyed, raw edge
- Structure Cap — €65 — heavy canvas, tonal embroidery

These are placeholders. Nothing is for sale except the Foundation Cap.

---

## TECHNICAL STACK — EXACT VERSIONS

```json
"react": "^18.3.1"
"react-dom": "^18.3.1"
"react-router-dom": "^6.24.1"
"framer-motion": "^11.0.0"
"@vercel/kv": "^3.0.0"
"@vercel/og": "^0.11.1"
"resend": "^6.10.0"
"stripe": "^22.1.0"
"tailwindcss": "^3.4.6"
"vite": "^5.3.4"
```

**Type:** ES Modules (`"type": "module"` in package.json)
**Build:** Vite
**Deploy:** Vercel — auto-deploys when pushed to GitHub main branch
**Repo:** https://github.com/richardmuodilim-droid/true-vision-project

---

## DESIGN SYSTEM

```
Background:     #F5F3EE  (warm off-white — used everywhere)
Primary text:   #111111
Text hierarchy: rgba(0,0,0,0.72) → 0.60 → 0.50 → 0.38 → 0.28 → 0.18
Borders:        rgba(0,0,0,0.08) standard / rgba(0,0,0,0.06) subtle
CTA background: #111111 text #F5F3EE hover #2a2a2a
Green (success):#16a34a
Red (error):    #dc2626
Dark sections:  bg-[#111111] — used for cinematic contrast

Fonts:
  mono  = { fontFamily: "'Space Mono', monospace" }        ← labels, codes, UI
  serif = { fontFamily: "'Cormorant Garamond', serif" }    ← headlines, editorial
  inter = { fontFamily: "'Inter', sans-serif" }            ← body text, prices

Image treatment: filter: saturate(0.18) brightness(0.93)  ← all cap photos
Corner marks: absolute positioned spans, border-black/12
Grain overlay: <div className="grain" aria-hidden="true" />
Marquee: className="marquee-track" (CSS animation defined in index.css)
```

---

## FULL SITE STRUCTURE (ROUTING)

```
src/App.jsx controls all routing via React Router v6 BrowserRouter

STANDALONE (no navbar):
  /intro          → Landing.jsx     (cinematic entrance, optional gateway)
  /archive        → ArchiveFlow     (member sign-up flow — Vault → Decrypt → ArchiveEntry)
  /archive-admin  → AdminPage.jsx   (password-protected command center)

STORE SHELL (with Navbar + Cart sidebar):
  /               → Home.jsx        (editorial hero + product + manifesto)
  /store          → redirect to /   (legacy URL kept alive)
  /product/:id    → Product.jsx     (product detail page)
  /category/:slug → Category.jsx    (category filter page)
  /checkout       → Checkout.jsx    (3-step: contact → shipping → review)
  /order-success  → OrderSuccess.jsx (post-payment confirmation page)
  /our-story      → OurStory.jsx    (8-section cinematic story page)

StoreShell provides: <Navbar onCartOpen={openCart} /> + <Cart /> + <Outlet context={{ onCartOpen }} />
Home, Product, Category use: const { onCartOpen } = useOutletContext()
```

---

## ALL SOURCE FILES — PURPOSE & STATUS

### Pages

**`src/pages/Home.jsx`** — MAIN STORE PAGE
- Section 1: Full-screen hero — "We Are Not Building A Brand. / We Are Documenting A Mission."
  - Headline: `clamp(46px, 9vw, 78px)` serif
  - Animation: all elements enter fast (0.4-0.55s, max 0.34s stagger)
  - Animated scroll indicator (pulsing line)
- Section 2: Product section — portrait `aspect-[4/5]` image + spec table + colour dots + price + Add to Cart
  - Colour dots switch the AnimatePresence image
  - Add to Cart dispatches to CartContext and opens cart sidebar
- Section 3: Quote — "Built from nothing. Worn by those who understand." + Our Story link
- Section 4: Marquee strip
- Section 5: Footer (© + Archive link + Instagram icon)

**`src/pages/OurStory.jsx`** — 8-SECTION CINEMATIC STORY PAGE
```
Section 01: Full-screen opening — "Two towns. / One road." — huge serif, line reveal
Section 02: Dark — opening quote block, line by line reveal
Section 03: Chapter 01 — two-col: Photo placeholder A (portrait 3:4) + origin text
Section 04: Pull quote — "That background does one of two things... We refused."
Section 05: Full-bleed dark band — Photo placeholder B (wide 21:9, both founders)
Section 06: Chapter 02 — reversed two-col: text + Photo placeholder C
Section 07: Dark — Chapter 03, "This is for the ones who work in silence..."
Section 08: Closing — "Built from nothing. / Worn by those who understand." + CTAs
```
**IMPORTANT:** Three photo slots are placeholders. When Richard sends photos:
- Slot A (Section 03): Add `src="/photo-name.jpg"` to `<Photo>` component
- Slot B (Section 05): Replace the `<motion.div>` with `<img src="..." />`
- Slot C (Section 06): Add `src="/photo-name.jpg"` to `<Photo>` component

**`src/pages/Landing.jsx`** — `/intro` ENTRANCE PAGE
- Cinematic full-screen entrance with TVP logo, tagline
- "Enter" button navigates to `/` (main store)
- Separate from main store — no navbar

**`src/pages/Checkout.jsx`** — 3-STEP CHECKOUT
- Step 0: Email (pre-fills from localStorage `TrueVisionMember` if logged in)
- Step 1: Shipping (first name, last name, address, city, state, zip, country — 50+ countries)
- Step 2: Review (summary of contact + shipping + promo code notice + secure badge)
- On submit: saves pending order to `sessionStorage`, creates Stripe session, redirects
- Back to Store link: `/` (fixed from old broken `/store`)
- Promo code notice on Step 2: "Have a promo code? Enter it on the next screen."
- Shipping cost: `items.reduce((s, i) => s + i.qty, 0) * 6`

**`src/pages/OrderSuccess.jsx`** — POST-PAYMENT PAGE
- Calls `POST /api/order-confirm` with `session_id` from URL params
- Shows: order ref, confirmation email address, items, total, shipping address, what happens next
- Falls back to sessionStorage pending data if API call fails
- Back to Store: `/` (fixed)

**`src/pages/Product.jsx`** — PRODUCT DETAIL PAGE
- Reads `useParams id`, calls `getProduct(id)`
- Shows images, specs, colour selector, size selector, Add to Cart

**`src/pages/Category.jsx`** — CATEGORY PAGE
- Filters products by `category` param

### Components

**`src/components/Navbar.jsx`**
- Fixed top, transparent on home (`location.pathname === '/'`)
- TVP logo left, cart icon + [ARC] archive link right
- `isHome` check was previously broken (was checking `/store`), now correctly checks `/`
- Has [Our Story] link

**`src/components/Cart.jsx`**
- Slide-in sidebar from right
- Shows items with colour/size, qty controls, remove button
- Shipping: `items.reduce((s, i) => s + i.qty, 0) * 6` (per hat)
- Checkout button → `/checkout`

**`src/components/AdminPage.jsx`** — FULL COMMAND CENTER
- Password: `[rotated — set in Vercel env]`
- Light mode: `bg-[#F5F3EE]` matching rest of site
- Login form → calls `POST /api/admin`
- Dashboard sections:
  - Stat cards: Total Members, Current Revenue, Net Position
  - Break-even progress bar (animated)
  - Financial model table (investment, unit cost, retail price, break-even, projected profit)
  - Member registry with delete (2-click confirm)
  - Promo code generator (create + list with redemption stats)
- Promo code section:
  - Form: promoter name (auto-suggests code), code, discount %, max uses
  - Auto-suggests code = name.toUpperCase().slice(0,8) + percentOff
  - On success: shows code with copy button
  - Load Codes button fetches all existing codes with usage

**`src/components/Vault.jsx`** — ARCHIVE SIGN-UP
- Email input with animated reveal
- Submits to `POST /api/submit`
- On success → triggers `onSuccess(userId, memberName)` → DecryptionScreen

**`src/components/DecryptionScreen.jsx`** — CINEMATIC TRANSITION
- Animated "decrypting" sequence after sign-up
- Triggers `onComplete()` → ArchiveEntry

**`src/components/ArchiveEntry.jsx`** — ARCHIVE INTERIOR
- Shown after sign-up/login
- Links: Shop Drop 001 → `/` (Link, not href — SPA nav)
- Links: Our Story → `/our-story`
- Links: Exit Archive

**`src/components/Footer.jsx`**
- Drop 001 link → `/`
- Our Story link → `/our-story`

**`src/components/ProductCard.jsx`** — product card for grid views

**`src/context/CartContext.jsx`**
- Global cart state via React Context + useReducer
- Actions: ADD, REMOVE, UPDATE_QTY, CLEAR
- Cart stored in localStorage `tvp_cart`
- `subtotal` computed from items

**`src/data/products.js`**
- Array of product objects, exported
- Helpers: `getProduct(id)`, `getFeatured()`, `getBestSellers()`, `getByCategory(cat)`

**`src/App.jsx`** — ROUTING ROOT (see FULL SITE STRUCTURE above)

---

## ALL API FILES — EXACT BEHAVIOUR

**`api/admin.js`** — ADMIN DATA
```
POST { password }
Password hardcoded: '[rotated — set in Vercel env]'
Returns: { count, members: [{name, email, userId, memberNumber, timestamp, lastSeen}], financials }
Financials hardcoded: initialInvestment:500, unitCost:25, totalUnits:20, retailPrice:55, breakEvenUnits:10, projectedProfit:600
Uses: Vercel KV — kv.get('tvp:count'), kv.lrange('tvp:members',0,-1), kv.hgetall('tvp:lastseen')
```

**`api/create-checkout-session.js`** — STRIPE SESSION
```
POST { items: [{name, color, size, qty, price}], email }
Creates Stripe hosted checkout session
Shipping: €6 per hat (unit_amount:600, quantity:totalQty)
allow_promotion_codes: true (promo field shown on Stripe checkout)
shipping_address_collection: 80+ countries
success_url: origin/order-success?session_id={CHECKOUT_SESSION_ID}
cancel_url: origin/checkout
Returns: { url } — redirect to Stripe
```

**`api/order-confirm.js`** — EMAIL SENDING
```
POST { session_id }
Retrieves Stripe session with expand: ['line_items', 'line_items.data.price.product']
Checks payment_status === 'paid'
Sends two emails via Resend:
  1. Customer email (to: customer) — light mode HTML, anti-dark-mode meta, anti-translate meta
     - Subject: "Your order is confirmed — TVP-{ref}"
     - Shows: ref, items with variant (colour/size from product.description), shipping address, total, next steps
     - Ships To always shown — fallback text if shipping null
  2. Internal email (to: truevisionstore2@gmail.com) — dark mode HTML
     - Subject: "New order TVP-{ref} — €{total} — {customer name}"
     - Shows: customer email, name, full address, items, total, Stripe session ID
FROM: 'True Vision Project <archive@truevisionproject.com>'
Plain text fallback included (key for spam avoidance)
```

**`api/create-promo.js`** — CREATE PROMO CODE
```
POST { password, promoterName, code, percentOff, maxRedemptions }
Password: process.env.ADMIN_PASSWORD || '[rotated — set in Vercel env]'
Stripe apiVersion: '2023-10-16' (IMPORTANT: pinned — v22 SDK defaults to 2025 API where coupon is deprecated)
Creates: stripe.coupons.create({ percent_off, duration:'once', name, metadata:{promoter} })
Then: stripe.promotionCodes.create({ coupon: coupon.id, code: code.toUpperCase(), max_redemptions, metadata:{promoter} })
Returns: { id, code, promoter, percentOff, maxRedemptions, timesRedeemed:0 }
Error handling: 409 if code already exists
```

**`api/list-promos.js`** — LIST ALL PROMO CODES
```
POST { password }
Password: process.env.ADMIN_PASSWORD || '[rotated — set in Vercel env]'
Stripe apiVersion: '2023-10-16' (same reason — pinned)
stripe.promotionCodes.list({ limit: 100, expand: ['data.coupon'] })
Returns: { promos: [{id, code, promoter, percentOff, active, maxRedemptions, timesRedeemed, created}] }
```

**`api/submit.js`** — ARCHIVE MEMBER SIGN-UP
```
POST { email, name? }
Saves to Vercel KV
Sends welcome email via Resend
Returns: { userId, memberNumber }
```

**`api/delete.js`** — DELETE MEMBER (admin)
```
POST { email }
Removes from Vercel KV
```

**`api/count.js`** — MEMBER COUNT
```
GET — returns { count }
```

**`api/lookup.js`** — MEMBER LOOKUP
```
POST { email } — checks if email is registered member
```

**`api/ping.js`** — HEALTH CHECK
```
GET — returns { ok: true }
```

---

## ENVIRONMENT VARIABLES

```
STRIPE_SECRET_KEY     → Stripe live secret key (set in Vercel)
RESEND_API_KEY        → re_5VdShmMD_3mXR6Y2FDMrzSDGaRS7k9gBc (set in Vercel)
KV_REST_API_URL       → Vercel KV connection URL (set in Vercel)
KV_REST_API_TOKEN     → Vercel KV token (set in Vercel)
ADMIN_PASSWORD        → NOT set in Vercel — falls back to hardcoded '[rotated — set in Vercel env]'
```

**Email infrastructure:**
- Domain: truevisionproject.com — VERIFIED in Resend
- FROM address: archive@truevisionproject.com
- Business notification goes to: truevisionstore2@gmail.com

---

## BUGS FIXED IN THIS SESSION (important context)

1. **Email not sending at all** — Resend API key had been rotated. Updated to new key.
2. **order-confirm 500 error** — `expand: ['shipping_details']` is invalid. Removed it.
   `shipping_details` is a regular field, not expandable. Access directly.
3. **No colour/size in emails** — Was hardcoded `variant: ''`. Fixed by expanding
   `line_items.data.price.product` and reading `li.price?.product?.description`
4. **Emails going to spam** — Added `text` plain-text fallback alongside HTML
5. **Gmail auto-translating email to Italian** — Added `<meta name="google" content="notranslate">`
6. **Email dark mode inversion** — Added `<meta name="color-scheme" content="light">` + CSS
7. **Shipping address not showing** — Ships To section was `${shipping ? ... : ''}` — if Stripe
   returns null shipping, section was hidden. Now always shown with fallback text.
8. **Promo codes returning 401 Unauthorized** — `api/admin.js` has password hardcoded but
   `create-promo.js` and `list-promos.js` were using `process.env.ADMIN_PASSWORD` (not set).
   Fixed with `|| '[rotated — set in Vercel env]'` fallback.
9. **Promo "Received unknown parameter: coupon"** — Stripe v22 SDK defaults to 2025 API
   where coupon parameter syntax changed. Fixed by pinning `apiVersion: '2023-10-16'`
   in both promo API files.
10. **SPA navigation breaking on archive** — ArchiveEntry used `<a href="/store">` causing
    full page reload. Fixed to `<Link to="/">`.
11. **Navbar isHome check broken** — Was checking `pathname === '/store'`. Fixed to `=== '/'`
12. **Back to Store links pointing to /store** — Fixed in Checkout.jsx and OrderSuccess.jsx

---

## WHAT'S BEEN BUILT — CHRONOLOGICAL

1. ✅ Full Stripe payment flow (create session → hosted checkout → order success)
2. ✅ Resend transactional emails (customer confirmation + internal notification)
3. ✅ Archive member system (sign-up → decryption animation → archive interior)
4. ✅ Admin command center (members, financials, break-even, promo codes)
5. ✅ Promoter promo code system (Stripe-backed, tracked redemptions)
6. ✅ Per-quantity shipping (€6 × total hats)
7. ✅ Site architecture unified (store at `/`, landing at `/intro`)
8. ✅ Our Story page — 8-section cinematic scroll with line reveals + wipe animations
9. ✅ Homepage redesigned — fast animations, product visible on scroll
10. ✅ Checkout promo code guidance + broken link fixes

---

## WHAT'S NEXT — DROP 002 PLAN

**Product:** Windbreaker Jacket
**Price:** ~€85-95 + €8 shipping
**Model:** Pre-order ONLY — pay first, produce after 30+ orders (no dead stock risk)
**Sizing:** Oversized cut — S/M/L only (reduce size gamble vs T-shirts)
**Strategy:**
  1. Send jacket to 2-3 rappers BEFORE any public announcement
  2. THEIR post is the reveal — TVP stays silent until then
  3. Archive members get 48h early access before public pre-order opens
  4. All existing promoter codes work for Drop 002

**Website needs for Drop 002:**
- `/drop-002` — teaser page (countdown + email capture)
- Pre-order checkout flow (`pre_order: true` metadata in Stripe session)
- Archive member gate (check localStorage `TrueVisionMember`, restrict access)
- Admin pre-order tracker (count vs production minimum)

---

## OUR STORY — PHOTO SLOTS WAITING

Three image slots in `src/pages/OurStory.jsx`:

**Slot A** (Section 03 — Chapter 01, left column, `aspect-[3/4]` portrait)
```jsx
// Find this in OurStory.jsx:
<Photo label={'Founder photo\nReplace: add src="/your-image.jpg"'} aspect="aspect-[3/4]" />
// Replace with:
<Photo src="/richard.jpg" label="Richard" aspect="aspect-[3/4]" />
```
What to shoot: one founder, portrait ratio, outdoors, candid/natural, wearing cap ideally.

**Slot B** (Section 05 — full-bleed band, `21:9` wide landscape)
```jsx
// Find the motion.div with the placeholder text in Section 05
// Replace the inner content with:
<img src="/both-founders.jpg" className="absolute inset-0 w-full h-full object-cover"
  style={{ filter: 'saturate(0.18) brightness(0.88)' }} alt="Founders" />
```
What to shoot: BOTH founders together, wide/landscape, serious, candid, outdoors.

**Slot C** (Section 06 — Chapter 02, right column, `aspect-[3/4]` portrait)
```jsx
<Photo src="/partner.jpg" label="Partner" aspect="aspect-[3/4]" />
```
What to shoot: second founder, same vibe as Slot A.

**Photo filter applied automatically:** `saturate(0.20) brightness(0.92)` — no need to edit
photos before using them. Send full quality originals from phone camera.

---

## HOW DEPLOYMENT WORKS

1. All code lives in: `C:\Users\muodi\Desktop\Antigravity Project\true-vision-project`
2. Push to GitHub main → Vercel auto-builds and deploys in ~60 seconds
3. API files in `/api/` folder become Vercel Serverless Functions automatically
4. No server config needed — Vercel handles everything
5. Environment variables set in Vercel dashboard (not in code)

**To make any change:**
- Edit file → `git add` → `git commit` → `git push origin main` → live in 60s

---

## ADMIN ACCESS

**URL:** https://truevisionproject.com/archive-admin
**Password:** `[rotated — set in Vercel env]`
**What you can do:**
- See all archive members + when they joined + last access
- Delete members
- See revenue, net position, break-even progress
- Create personalised promo codes for promoters
- See all promo codes + how many times each has been used

---

## PROMOTER CODES — HOW THEY WORK

1. Go to `/archive-admin` → log in → scroll to "Promo Codes" section
2. Enter promoter name (e.g. "Jake") → code auto-suggests "JAKE15"
3. Set discount % and max uses → click Generate
4. Code is created in Stripe — copy it and send to the promoter
5. Promoter shares with their audience — used at Stripe checkout
6. You see redemption count update in the admin panel
7. When max uses hit, code deactivates automatically

---

## KEY CONSTANTS TO KNOW

```js
// products.js
Foundation Cap price: 32 (€)
Shipping: 6 (€ per hat, NOT flat rate — multiplied by quantity)

// Admin password (hardcoded in admin.js)
'[rotated — set in Vercel env]'

// Email addresses
FROM:     'True Vision Project <archive@truevisionproject.com>'
BUSINESS: 'truevisionstore2@gmail.com'  (receives internal order notifications)

// Stripe API version (MUST stay pinned for promo endpoints)
apiVersion: '2023-10-16'

// localStorage keys
'TrueVisionMember' → JSON { email, name, userId, memberNumber }
'tvp_cart'         → cart items array

// sessionStorage keys
'tvp_pending_order' → { email, items } — set before Stripe redirect, read on success page
```

---

## IMPORTANT RULES WHEN WRITING CODE FOR THIS PROJECT

1. **Routing:** Always use `<Link to="...">` from react-router-dom for internal links.
   NEVER use `<a href="...">` for internal navigation — it causes full page reload.

2. **Back to Store links:** Always point to `/` not `/store`

3. **Stripe API version:** Any file that uses coupons or promotionCodes MUST include
   `{ apiVersion: '2023-10-16' }` in the Stripe constructor.

4. **Admin password:** `api/admin.js` has it hardcoded. Other admin endpoints use
   `process.env.ADMIN_PASSWORD || '[rotated — set in Vercel env]'`

5. **Shipping calculation:** Always `qty * 6` — never a flat rate.

6. **Image imports:** Images are in `/public/` folder, referenced as `/cap-black.jpg` etc.
   No import needed — just use string paths.

7. **Font variables:** Always use `mono`, `serif`, `inter` objects for inline styles.
   Define them at top of each file:
   ```js
   const mono  = { fontFamily: "'Space Mono', monospace" }
   const serif = { fontFamily: "'Cormorant Garamond', serif" }
   const inter = { fontFamily: "'Inter', sans-serif" }
   ```

8. **Animations:** Use `whileInView` with `viewport: { once: true, margin: '-40px' }`
   for scroll-triggered animations. Keep durations 0.4-0.7s. Max stagger 0.1s.
   Never use delays longer than 0.4s on initial page load elements.

9. **Cart dispatch:** Use `dispatch({ type: 'ADD', item: { id, name, price, size, color, imgSrc, qty } })`

10. **ES Modules:** All files use `import/export` syntax. No `require()`.

---

*Briefing prepared: May 2026 — True Vision Project*
*Claude Code instance: claude-sonnet-4-6*
