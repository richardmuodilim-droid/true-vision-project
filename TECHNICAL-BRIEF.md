# TRUE VISION PROJECT — TECHNICAL BRIEF
**Updated: June 10, 2026**

---

## ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────┐
│         CLIENT (React 18 + Vite)                │
│  BrowserRouter → StoreShell + Standalone Routes │
└────────────────┬────────────────────────────────┘
                 │
                 ↓ HTTPS
┌─────────────────────────────────────────────────┐
│      VERCEL FUNCTIONS (Node.js API)             │
│  /api/* endpoints (submit, drop002-waitlist...)  │
└────────────────┬────────────────────────────────┘
                 │
     ┌───────────┼───────────┐
     ↓           ↓           ↓
  Vercel KV   Resend      Stripe
  (Redis)     (Email)    (Payments)
```

---

## FRONTEND STRUCTURE

### Project Layout
```
true-vision-project/
├── src/
│   ├── pages/                    # Full page components
│   │   ├── Home.jsx              # / — store homepage (hero + drops + story)
│   │   ├── Drop002.jsx           # /drop-002 — tracksuit teaser + waitlist form
│   │   ├── OurStory.jsx          # /our-story — 8-section brand narrative
│   │   ├── Product.jsx           # /product/:id — product detail (cap is sold out)
│   │   ├── Category.jsx          # /category/:slug — filter by category
│   │   ├── Checkout.jsx          # /checkout — 3-step payment flow
│   │   ├── OrderSuccess.jsx      # /order-success — post-payment confirmation
│   │   └── Landing.jsx           # /intro — cinematic entrance (optional)
│   │
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.jsx            # Top navigation (logo, links, hamburger mobile)
│   │   ├── Footer.jsx            # Bottom footer (links, socials, copyright)
│   │   ├── Cart.jsx              # Cart drawer (slides from right on desktop)
│   │   ├── Vault.jsx             # /archive screen 1 — email input for membership
│   │   ├── DecryptionScreen.jsx  # /archive screen 2 — scanning animation
│   │   ├── ArchiveEntry.jsx      # /archive screen 3 — member interior
│   │   ├── AdminPage.jsx         # /archive-admin — password protected admin panel
│   │   ├── WaitlistConfirmScreen.jsx # Drop 002 confirmation animation
│   │   └── Drop002Entry.jsx      # Drop 002 member interior (localStorage cached)
│   │
│   ├── context/
│   │   └── CartContext.jsx       # Global cart state (Redux-lite pattern)
│   │
│   ├── lib/
│   │   └── design.js             # Design tokens (mono, serif, inter, ease, reveal, lineGrow)
│   │
│   ├── data/
│   │   └── products.js           # Product data (cap, tees, etc. — mostly archived)
│   │
│   ├── App.jsx                   # Router setup (BrowserRouter + Routes)
│   └── index.css                 # Global styles (grain overlay, custom animations)
│
├── api/                          # Vercel serverless functions
│   ├── submit.js                 # POST /api/submit — Archive membership registration
│   ├── lookup.js                 # POST /api/lookup — Check if email is Archive member
│   ├── ping.js                   # POST /api/ping — Log member last-seen timestamp
│   ├── count.js                  # GET /api/count — Return total Archive member count
│   ├── admin.js                  # POST /api/admin — Admin panel data (members, revenue)
│   ├── delete.js                 # DELETE /api/delete — Remove a member
│   ├── create-checkout-session.js # POST — Stripe checkout session
│   ├── order-confirm.js          # POST — Send order confirmation emails
│   ├── create-promo.js           # POST — Create Stripe promo code
│   ├── list-promos.js            # POST — List all promo codes
│   ├── drop002-waitlist.js       # POST /api/drop002-waitlist — Add to Drop 002 waitlist
│   └── send-welcome-all.js       # POST — Bulk resend welcome emails
│
├── public/                       # Static assets
│   ├── logo.svg                  # TVP logo (inverted on light bg)
│   ├── cap-black.jpg             # Drop 001 — cap black variant
│   ├── cap-white.jpg             # Drop 001 — cap white variant
│   ├── ts-all-front.png          # Drop 002 — all 3 colourways in one shot
│   ├── ts-all-back.png           # Drop 002 — back view
│   ├── ts-blue.jpg               # Drop 002 — light blue detail
│   ├── ts-pocket.jpg             # Drop 002 — hidden pocket feature
│   ├── ts-tags.png               # Drop 002 — care tags / labels
│   ├── unbox-1.mp4               # Drop 001 unboxing video
│   ├── unbox-2.mp4               # Customer unboxing video
│   ├── customer-wearing.mp4      # Customer wearing cap
│   └── community-*.jpg           # Community photos (people wearing products)
│
├── CLAUDE.md                     # Project master document (always read first)
├── TVP-FULL-BRAND-BRIEF.md       # Brand overview + strategy
├── TECHNICAL-BRIEF.md            # This file
├── package.json                  # Dependencies
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # TailwindCSS setup
├── vercel.json                   # Vercel deployment config
└── .env.local                    # Secrets (NEVER commit)
```

---

## ROUTING MAP (React Router v6)

### Standalone Routes (No Navbar)
```
/intro              → Landing.jsx           # Cinematic entrance
/drop-002           → Drop002.jsx           # Tracksuit teaser + waitlist
/archive            → ArchiveFlow           # Membership signup (3-screen flow)
/archive-admin      → AdminPage.jsx         # Admin panel (pwd protected)
```

### Store Routes (With Navbar + Cart)
```
/                   → Home.jsx              # Homepage
/our-story          → OurStory.jsx          # Brand story
/product/:id        → Product.jsx           # Product detail
/category/:slug     → Category.jsx          # Category filter
/checkout           → Checkout.jsx          # Payment flow
/order-success      → OrderSuccess.jsx      # Order confirmation
```

### ArchiveFlow (State machine)
```
Vault (email input)
  ↓ onSuccess (email validated)
DecryptionScreen (scanning animation, 2.5s)
  ↓ onComplete
ArchiveEntry (member interior)
```

---

## COMPONENT HIERARCHY

### Pages
- **Home** — Renders Navbar + Footer. Sections: hero, Drop 001 proof, Drop 002 teaser, story, community, quote, marquee.
- **Drop002** — No navbar. Hero + countdown + product image + colourways + specs + hidden pocket feature + waitlist form (email → name → submit).
- **OurStory** — With navbar. 8 major sections with motion reveals. Heavy editorial.
- **Product** — Product detail. Images, colors, sizes, stock status, add-to-cart (disabled if sold out).
- **Checkout** — 3-step: shipping → payment → review.
- **OrderSuccess** — Post-payment. Shows order number, email confirmation, shipping date.

### Components (Reusable)
- **Navbar** — Fixed top. Logo + links (Our Story, Archive, Drop 002) + hamburger (mobile).
- **Footer** — Shared across pages. Logo + socials (TikTok, Instagram) + links (Drops, Project) + copyright.
- **Cart** — Drawer from right. Line items, quantity, subtotal, shipping, checkout button.
- **Vault** — Email input form (Archive signup screen 1). Monospace styling. Scanline hover effect on button.
- **DecryptionScreen** — Full-screen animated overlay. Scanning line + scrambled text → reveal.
- **ArchiveEntry** — Member interior. Shows Drop 001 manifest (sold out), Drop 002 as next. Image gallery, colourways, manifesto, footer.
- **WaitlistConfirmScreen** — Full-screen animation. Status log lines → phase 2 reveals (colour dots, message). Auto-redirects to Drop002Entry.
- **Drop002Entry** — Member-only view (cached in localStorage). Shows colourways, access status, countdown, manifesto.
- **AdminPage** — Password protected (`[rotated — set in Vercel env]`). Shows members, last-seen, revenue, break-even, promo codes, Drop 002 count.

---

## DESIGN SYSTEM (src/lib/design.js)

### Exported Objects
```javascript
mono = { fontFamily: "'Space Mono', monospace" }
serif = { fontFamily: "'Cormorant Garamond', serif" }
inter = { fontFamily: "'Inter', sans-serif" }
ease = [0.16, 1, 0.3, 1]  // Easing curve for animations

// Animation presets
reveal = (delay = 0, stagger = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease }
})

lineGrow = () => ({
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 0.8, ease }
})
```

**Usage in components:**
```javascript
import { mono, serif, ease, reveal } from '../lib/design'

<h1 style={{ ...serif, fontSize: '48px', color: '#111111' }}>Headline</h1>
<p style={{ ...mono, fontSize: '9px', letterSpacing: '0.28em' }}>Label</p>
<motion.div {...reveal(0.2)}>Content</motion.div>
```

### Color Palette
- **Light backgrounds:** `#F5F3EE` (warm off-white, everywhere)
- **Dark text:** `#111111` (pure black)
- **Drop 002 dark sections:** `#0a0909` (very dark grey)
- **Accent colors (used sparingly):**
  - Purple: `#7B2FBE` (colourway 1)
  - Light blue: `#7DD3DA` (colourway 2)
  - Pink: `#EC008C` (colourway 3)
- **Opacity hierarchy:** `rgba(0,0,0,0.80)` (bold) → `/0.60` → `/0.50` → `/0.38` → `/0.28` → `/0.18` (subtle)

### Typography
- **Headlines:** Cormorant Garamond, 400 weight, `fontSize: 'clamp(48px, 11vw, 88px)'` for hero
- **Labels:** Space Mono, 9-11px, `letterSpacing: '0.28em'` (uppercase)
- **Body:** Inter or Space Mono, 13-15px, `lineHeight: 1.8-1.9`
- **Button text:** Space Mono, 9-10px, `letterSpacing: '0.45em'`

### Shared Classes (global CSS)
```css
.grain {
  /* Noise overlay for all full-page sections */
  position: fixed;
  inset: 0;
  opacity: 0.3-0.6;
  background-image: url('data:image/svg+xml...');
  pointer-events: none;
  z-index: 0;
}

.btn-vault {
  /* Scanline hover effect on buttons */
  position: relative;
  overflow: hidden;
  border: 1px solid;
  cursor: pointer;
}

.btn-vault .scanline {
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  opacity: 0.3;
  animation: scan 0.6s ease-in-out;
}

.btn-vault.scanning .scanline {
  animation: scan 0.3s ease-in-out;
}

@keyframes scan {
  0% { top: -100%; }
  100% { top: 100%; }
}

.marquee-track {
  /* Infinite horizontal scroll for footer text */
  display: flex;
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

## STATE MANAGEMENT

### Cart Context (CartContext.jsx)
```javascript
{
  items: [
    {
      id: 'foundation-cap',
      name: 'Foundation Cap',
      color: 'Black',
      size: 'One Size',
      price: 32,
      qty: 1,
      imgSrc: '/cap-black.jpg'
    }
  ],
  dispatch: (action) => {...}
  // Actions: ADD, REMOVE, UPDATE_QTY, CLEAR
}
```

### Local Storage (Browser)
```javascript
// Waitlist member (persists signup across sessions)
TVPWaitlist = {
  email: "user@example.com",
  name: "First Last"
}

// Archive member (persists membership access)
TrueVisionMember = {
  userId: "TVP-001-ABCD",
  memberName: "First Last",
  memberNumber: 42,
  email: "user@example.com"
}
```

---

## BACKEND / API STRUCTURE

### Vercel KV (Redis) Schema

**Key format: `tvp:{resource}:{identifier}`**

#### Archive Members
```
tvp:emails (HSET)
  {
    "user@example.com": {
      "email": "user@example.com",
      "name": "John Doe",
      "userId": "TVP-001-ABCD",
      "timestamp": "2026-06-10T14:30:00Z",
      "memberNumber": 42
    }
  }

tvp:members (LIST - for chronological order)
  [0]: {"email": "user1@...", "name": "...", "userId": "...", ...}
  [1]: {"email": "user2@...", "name": "...", "userId": "...", ...}

tvp:count (STRING - incremented integer)
  "42"  // Total members

tvp:lastseen (HSET)
  {
    "user@example.com": "2026-06-10T16:45:00Z"
  }
```

#### Drop 002 Waitlist
```
tvp:drop002:waitlist (SET - no duplicates)
  [0]: "user@example.com"
  [1]: "another@example.com"
  ...
```

#### Rate Limiting
```
tvp:ratelimit:{ip} (STRING - expires after 3600s)
  "3"  // Number of attempts from this IP in the last hour
```

---

## API ENDPOINTS (Vercel Functions)

### POST /api/submit
**Archive membership signup**
- **Input:** `{ email, name }`
- **Validation:** Email format, not already registered
- **Actions:**
  1. Generate unique userId (`TVP-001-XXXX`)
  2. Store in `tvp:emails` and `tvp:members`
  3. Increment `tvp:count`
  4. Auto-add email to `tvp:drop002:waitlist`
  5. Send welcome email (Resend)
- **Output:** `{ userId, name, memberNumber, returning: boolean }`
- **Rate limit:** 5 attempts per IP per hour

### POST /api/drop002-waitlist
**Drop 002 waitlist signup**
- **Input:** `{ email, name }`
- **Validation:** Email format
- **Actions:**
  1. Add email to `tvp:drop002:waitlist` set (no duplicates)
  2. Send confirmation email (Resend)
- **Output:** `{ ok: true, alreadyRegistered: boolean }`

### POST /api/lookup
**Check if email is Archive member**
- **Input:** `{ email }`
- **Logic:** Query `tvp:emails` HSET
- **Output:** `{ isMember: boolean, name: string, userId: string, memberNumber: number }`

### POST /api/ping
**Log member activity (last-seen)**
- **Input:** `{ email }`
- **Action:** Set timestamp in `tvp:lastseen`
- **Output:** `{ ok: true }`

### GET /api/count
**Return total Archive members**
- **Query:** Read `tvp:count`
- **Output:** `{ count: number }`

### POST /api/admin
**Admin dashboard data** (password protected)
- **Input:** `{ password }`
- **Output:**
  ```javascript
  {
    totalMembers: 42,
    members: [ { email, name, userId, timestamp, memberNumber }, ... ],
    lastSeen: { "user@...": "2026-06-10T...", ... },
    revenue: 1344.00,  // (members × €32 shipping if applicable)
    breakEven: 1500,   // Fixed cost threshold
    promoCodes: [ { code, discount, used }, ... ],
    drop002Count: 87
  }
  ```

### DELETE /api/delete
**Remove a member** (admin only)
- **Input:** `{ email, adminPassword }`
- **Action:** Delete from `tvp:emails`, remove from `tvp:members` list
- **Output:** `{ ok: true }`

### POST /api/create-checkout-session
**Stripe checkout** (for future product sales)
- **Input:** `{ items: [{ id, quantity }], email }`
- **Action:** Create Stripe session, store reference in KV
- **Output:** `{ sessionId, redirectUrl }`

### POST /api/order-confirm
**Send order confirmation email** (triggered by Stripe webhook)
- **Input:** Stripe event data
- **Action:** Format order details, send via Resend
- **Output:** `{ ok: true }`

### POST /api/create-promo
**Create Stripe discount code**
- **Input:** `{ code, percentOff, expiresAt, adminPassword }`
- **Action:** Create via Stripe API, store in KV
- **Output:** `{ code, percentOff, expiresAt }`

### POST /api/list-promos
**List all active promo codes**
- **Output:** `[ { code, percentOff, expiresAt, used }, ... ]`

### POST /api/send-welcome-all
**Bulk resend welcome emails** (admin utility)
- **Input:** `{ adminPassword }`
- **Action:** Query all members in `tvp:members`, resend welcome via Resend
- **Output:** `{ sent: number, failed: number }`

---

## EMAIL SYSTEM (Resend)

### FROM Address
`True Vision Project <archive@truevisionproject.com>`

### Email Templates

#### 1. Archive Welcome Email
**Trigger:** POST /api/submit successful  
**Subject:** `You're in — TVP Archive`  
**Body:** Plain text
```
{FirstName},

You're in. Member #{MemberNumber}.

This isn't a brand. It's a statement. Two people, two small towns, one mission.

Drop 001 sold out in 24 hours. Drop 002 is coming — August 2026.

As an Archive member you go first. 48 hours before anyone else.

truevisionproject.com/drop-002

— True Vision Project

---
You registered at truevisionproject.com. Reply DELETE to be removed.
```

#### 2. Drop 002 Waitlist Confirmation
**Trigger:** POST /api/drop002-waitlist successful  
**Subject:** `You're on the list — Drop 002`  
**Body:** Plain text
```
{FirstName},

You're on the list for Drop 002.

The Tracksuit. Three colourways. Hidden pocket. August 2026.

You'll hear from us before anyone else. When it drops, you'll have the link first.

truevisionproject.com/drop-002

— True Vision Project

---
You joined the waitlist at truevisionproject.com. Reply DELETE to be removed.
```

#### 3. Order Confirmation
**Trigger:** Stripe webhook (charge.succeeded)  
**Subject:** `Your order #{OrderNumber} — True Vision Project`  
**Body:** Plain text + order details
```
{FirstName},

Thanks for your order.

Order #{OrderNumber}
Placed: {Date}
Total: {Amount}

Items:
- {ProductName} x{Qty} — {Price}
...

Shipping to: {Address}
Estimated delivery: {Date}

Track your order: {TrackingLink}

— True Vision Project

---
Questions? Reply to this email.
```

#### 4. Shipping Notification
**Trigger:** Manual (admin sends when item ships)  
**Subject:** `Your TVP order is on the way`  
**Body:** Tracking number + link

---

## PAYMENT SYSTEM (Stripe)

### Products (Stripe)
```
Product: Foundation Cap
  SKU: foundation-cap
  Price: €32 (excludes shipping)
  Available: NO (stock=0)

Product: Tracksuit (Drop 002)
  SKU: drop002-tracksuit
  Price: €70
  Available: Not yet (launching August 2026)
```

### Shipping
**Fixed cost:** €6 per order (qty × 1)  
**Method:** Not specified (likely standard mail)

### Checkout Flow
1. User adds item to cart
2. Click "Checkout" → /checkout page
3. Step 1: Shipping address
4. Step 2: Payment details (Stripe Elements)
5. Step 3: Review order + place
6. Redirects to Stripe-hosted payment page
7. On success → /order-success
8. Webhook fires → send confirmation email

---

## DEPLOYMENT

### Vercel Setup
**Repository:** richardmuodilim-droid/true-vision-project  
**Branch:** main (auto-deploys on push)  
**Build command:** `npm run build`  
**Output directory:** `dist/`  
**Environment variables:**
```
VITE_API_BASE = https://truevisionproject.com/api
RESEND_API_KEY = (set in Vercel dashboard)
STRIPE_SECRET_KEY = (set in Vercel dashboard)
STRIPE_PUBLIC_KEY = (set in Vercel dashboard)
ADMIN_PASSWORD = [rotated — set in Vercel env]
KV_REST_API_URL = (auto-set by Vercel)
KV_REST_API_TOKEN = (auto-set by Vercel)
```

### DNS
**Provider:** Namecheap  
**Domain:** truevisionproject.com  
**Nameservers:** Vercel's (ns1.vercel.com, ns2.vercel.com, ...)  
**A record:** Points to Vercel

### Deploy Process
```bash
git add [files]
git commit -m "message"
git push origin main
# Vercel automatically:
# 1. Clones repo
# 2. Runs npm run build
# 3. Deploys dist/ to edge
# 4. Available at truevisionproject.com in ~60 seconds
```

---

## PERFORMANCE CONSIDERATIONS

### Bundle Size
- **React 18:** ~42KB gzip
- **Framer Motion:** ~27KB gzip
- **TailwindCSS (purged):** ~15KB gzip
- **Total app bundle:** ~100KB gzip (acceptable)

### Images
- **All product photos:** Lazy load with `loading="lazy"`
- **Hero backgrounds:** Use `backgroundImage` CSS (not img tag)
- **Colourway cards:** Responsive with `object-fit: cover` and `object-position`

### Animations
- **Framer Motion:** Uses CSS transforms (GPU-accelerated)
- **Scanline effect:** CSS keyframe animation (no JS)
- **Countdown timer:** Updates every 1 second (consider debouncing if slow)

### API Calls
- **Avoid N+1:** Batch requests where possible
- **Cache strategy:** Use localStorage for member data
- **Rate limiting:** IP-based (5 attempts/hour for /submit)

---

## SECURITY

### Environment Secrets
- **Never commit:** `.env`, `.env.local`, `vercel.env`
- **Store in Vercel dashboard:** API keys, passwords, tokens
- **Access in code:** `process.env.VARIABLE_NAME`

### Password Protection
- **Admin panel:** `/archive-admin` requires `[rotated — set in Vercel env]`
- **Method:** Hardcoded password check (simple, not production-grade)
- **Better approach (future):** OAuth or JWT tokens

### Email Validation
- **Regex pattern:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **KV duplicate check:** Before storing, verify email not in `tvp:emails`

### Rate Limiting
- **Method:** IP-based counter in KV with 3600s TTL
- **Limit:** 5 attempts per IP per hour
- **Use case:** Prevent spam on /api/submit

### CORS
- **Configured:** Vercel handles automatically
- **Stripe:** Requires CORS headers (handled by Stripe SDK)

---

## ERROR HANDLING

### Frontend
- **Form validation:** Email format checked before submit
- **API errors:** Caught in try/catch, displayed to user
- **Network failures:** "Connection error. Try again." message
- **Loading states:** Spinner or disabled button during fetch

### Backend
- **Invalid input:** Return 400 with error message
- **Rate limit exceeded:** Return 429 "Too many attempts"
- **Stripe errors:** Log and return 500
- **Email send failures:** Silently fail (don't break the flow)

### Monitoring
- **No dedicated APM yet** (consider Sentry for production)
- **KV errors:** Would require error tracking setup

---

## TESTING STRATEGY

**Current state:** No automated tests written.

**Recommended additions (future):**
- **Unit tests (Jest):** Design tokens, utility functions
- **Component tests (Vitest + React Testing Library):** Form inputs, animations
- **E2E tests (Playwright):** Signup flow, checkout, admin panel
- **API tests:** POST /api/submit, /api/drop002-waitlist

---

## DEVELOPMENT WORKFLOW

### Local Setup
```bash
git clone https://github.com/richardmuodilim-droid/true-vision-project.git
cd true-vision-project
npm install
npm run dev  # Starts dev server on localhost:5173
```

### Making Changes
```bash
# Create feature branch (optional but recommended)
git checkout -b feature/my-feature

# Make edits
# Test locally
npm run build  # Verify no build errors

# Commit
git add [specific files]
git commit -m "Clear message"

# Push
git push origin main  # Or feature/my-feature

# If pushed to feature branch, create PR on GitHub
# Once merged to main, Vercel auto-deploys
```

### Debugging
- **Frontend:** Chrome DevTools, console.log, Framer Motion inspector
- **API:** Check Vercel function logs in dashboard
- **KV:** Query via Vercel dashboard or `redis-cli` if SSH access
- **Emails:** Test via Resend dashboard

---

## SCALABILITY ROADMAP

### Current Bottlenecks
- **KV throughput:** OK for current traffic (hundreds of signups per drop)
- **Stripe:** Handles scaling automatically
- **Resend:** Handles scaling automatically
- **Vercel Functions:** Cold starts ~500ms first request, then <50ms

### Future Scale (1M+ visitors)
1. **Add CDN caching:** Cache static pages (Homepage, OurStory, Drop002)
2. **Database:** Consider PostgreSQL (Supabase) if storing more than signups
3. **Search:** Add Algolia for product filtering
4. **Analytics:** Add PostHog or Plausible for traffic insights
5. **Email queue:** Implement Bull/RabbitMQ if sending 10k+ emails/day

---

## DEPENDENCIES

### Package.json (Key)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x",
    "framer-motion": "^10.x",
    "stripe": "^13.x",
    "resend": "^2.x",
    "@vercel/kv": "^1.x"
  },
  "devDependencies": {
    "vite": "^4.x",
    "tailwindcss": "^3.x",
    "@tailwindcss/forms": "^0.5.x"
  }
}
```

---

## FUTURE TECHNICAL DEBT

1. **Tests:** Add unit + component + E2E coverage
2. **Type safety:** Migrate to TypeScript (currently vanilla JS)
3. **State management:** Consider Redux if complexity grows
4. **API standardization:** Consistent error response format
5. **Logging:** Add structured logging (not just console.log)
6. **Monitoring:** Integrate Sentry for error tracking
7. **A/B testing:** Add experiment framework for landing page tests

---

## QUICK REFERENCE

| What | Where | How |
|------|-------|-----|
| Design tokens | `src/lib/design.js` | Import + use `...mono`, `...serif` |
| Add a page | `src/pages/NewPage.jsx` | Create component, add route in App.jsx |
| Add a component | `src/components/NewComponent.jsx` | Import, use in pages |
| Create API | `api/new-endpoint.js` | Export default handler(req, res) |
| Deploy | `git push origin main` | Vercel auto-deploys in ~60s |
| Check logs | Vercel dashboard | Select function, view logs |
| Query KV | Vercel dashboard | Data > KV Store |
| Send test email | Resend dashboard | Test email template |
| View members | `/archive-admin` | Password: `[rotated — set in Vercel env]` |

---

**Last updated:** June 10, 2026
