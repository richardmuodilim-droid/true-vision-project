# TRUE VISION PROJECT — CO-WORKER BRIEFING
**Complete Context in 30 Minutes**

---

## WHO WE ARE

**Brand:** True Vision Project (TVP)  
**Founders:** Richard (Wexford, Ireland) + Partner (Bergamo, Italy)  
**Statement:** "Built from nothing. Worn by those who understand."  
**Founded:** 2026  
**Website:** truevisionproject.com  
**GitHub:** richardmuodilim-droid/true-vision-project  
**Status:** Drop 001 ✓ sold out. Drop 002 coming August 2026. Building momentum now.

---

## CORE MISSION (Most Important)

TVP is **NOT a fashion brand.** It's a **representation of shared struggle built together.**

We exist for people who:
- Come from similar backgrounds (tracksuit culture, estates, real places)
- Understand that **representation matters**
- Believe **unity and building from nothing works**
- Want membership in a **movement, not a transaction**

**The Product Is A Consequence**

When someone buys TVP, they're not buying clothing. They're buying membership in a statement that says: "I'm part of something that understands where I come from."

---

## THE FOUR PILLARS (Everything Flows From These)

### 1. REPRESENTATION
"This is for people like us."

- Name the background explicitly (tracksuit culture, Irish/UK estates)
- Show real people, not models
- Celebrate origins, not despite them
- Be in person (stalls, community)

### 2. UNITY
"You're not alone. We understand each other."

- Message: "We believe..." not "You should buy..."
- Forms: Email → Name → confirmation (joining something)
- Stalls: Face-to-face conversation
- Show: Belonging, not transaction

### 3. BUILDING FROM NOTHING
"Real things start small. Scarcity proves authenticity."

- Always cite numbers (24 units, 24 hours, sold out)
- Never mass-produce (limited runs forever)
- Design: Monochrome, grain, corner marks (document aesthetic, not luxury)
- Show the process, not the polish

### 4. MISSION > PRODUCT
"You're buying into a statement, not a jacket."

- Lead with WHY, then show WHAT
- Every email answers: "How does this represent our mission?"
- Pricing reflects belief, not cost

---

## CURRENT PRODUCTS

### DROP 001 — THE FOUNDATION CAP ✅ SOLD OUT
- **Status:** 24 units produced. Sold out in 24 hours. No restock.
- **Price:** €32 + €6 shipping
- **Material:** 300gsm washed chino twill
- **Colours:** Black, White (one size)
- **What it proved:** The model works. People buy when the story is real.

### DROP 002 — THE TRACKSUIT 🚀 AUGUST 2026
- **Status:** Waitlist open now. Pre-order model.
- **Price:** €70 full set (jacket + bottoms)
- **Sizes:** S / M / L
- **Colourways:** Purple/Black, Light Blue/Grey, Pink/Black
- **Feature:** Hidden zip pockets (jacket + bottoms)
- **Supply:** Pakistan manufacturer, 3-4 week lead time
- **Strategy:** If 40+ pre-orders confirmed by June, move to production
- **Market:** Young men, tracksuit culture (Yop Bros Ireland, Roadmen UK)

### DROP 003 — ARTIST COLLAB TEE 🎨 JUNE 2026 (PLANNING NOW)
- **What:** Limited tee designed with street artist (TVP + artist co-branded)
- **Quantity:** 500 units
- **Price:** €20-25
- **Timeline:** Design by June 1, produce by June 15, launch June 20
- **Why:** Bridges gap between Drop 001 (sold) and Drop 002 (August). Reaches creative audience. Funds tracksuit production. Builds hype.
- **Target:** Street artists, creatives, people who follow the artist (new audience)

---

## THE WEBSITE (truevisionproject.com)

### Pages Built & Live

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Homepage — story + mission + conversion | ✅ LIVE |
| `/drop-002` | Tracksuit teaser + waitlist signup | ✅ LIVE |
| `/archive` | TVP membership signup (free) | ✅ LIVE |
| `/our-story` | 8-section founding story | ✅ LIVE |
| `/posters` | Limited poster shop (if needed) | ✅ BUILT |
| `/product/:id` | Product detail (cap shows sold out) | ✅ LIVE |
| `/checkout` | 3-step payment flow | ✅ LIVE |
| `/order-success` | Post-purchase confirmation + email | ✅ LIVE |
| `/archive-admin` | Admin panel (password protected) | ✅ LIVE |

### Design System (NEVER DEVIATE)

**Colors:**
- Background: `#F5F3EE` (warm off-white — everywhere)
- Text: `#111111` (black)
- Dark sections: `#111111`
- Drop 002 dark: `#0a0909`
- NO colour accents, NO gradients

**Fonts (imported from `src/lib/design.js`):**
- **mono** = Space Mono (labels, buttons, UI)
- **serif** = Cormorant Garamond (headlines, emotional)
- **inter** = Inter (body text)

**Visual style:**
- Monochrome (black on white/cream)
- Grain overlay (subtle texture, ~2% opacity)
- Corner marks (cinema/document aesthetic)
- Images: `filter: saturate(0.18) brightness(0.90)`

**Never say:** "bespoke," "artisan," "craft," "elevated," "curated," "authentic"

### Current Flow (Conversion)

```
Homepage (/)
  ↓ [Hero + Mission Section]
  ↓ [Social Proof: "24 units. Sold out in 24 hours."]
  ↓ CTA: [ Join the Waitlist ] → /drop-002
  ↓
Drop 002 (/drop-002)
  ↓ [Hero: "The Next Statement"]
  ↓ [Why This Matters: explains mission connection]
  ↓ [Product image + specs + colourways]
  ↓ Email → Name → Submit
  ↓ WaitlistConfirmScreen animation
  ↓ Confirmed: "You're in — part of something that matters"
  ↓
Archive (/archive)
  ↓ Email → Name → Submit
  ↓ DecryptionScreen animation
  ↓ ArchiveEntry (shows Drop 002 as next, 48h early access)
```

---

## TECH STACK

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite + TailwindCSS + Framer Motion |
| Routing | React Router v6 (BrowserRouter + Routes) |
| Hosting | Vercel (auto-deploys on `git push main`) |
| Database | Vercel KV (Redis) |
| Email | Resend (FROM: archive@truevisionproject.com) |
| Payments | Stripe (live, not sandbox) |
| DNS | Namecheap |

### Key Files to Know

**Design tokens:**
- `src/lib/design.js` — Fonts, ease curve, animations (import and use everywhere)

**Core pages:**
- `src/pages/Home.jsx` — Homepage with mission section
- `src/pages/Drop002.jsx` — Tracksuit teaser + signup
- `src/components/Vault.jsx` — Archive signup form
- `src/components/ArchiveEntry.jsx` — Member interior

**API endpoints:**
- `/api/submit.js` — Archive registration
- `/api/drop002-waitlist.js` — Drop 002 waitlist signup
- `/api/create-checkout-session.js` — Stripe checkout
- `/api/create-poster-checkout.js` — Poster checkout (if activated)

**Config:**
- `CLAUDE.md` — Master document (routing, KV schema, rules, status)

---

## AUDIENCE

**Primary:** Young men aged 16-30 in tracksuit culture
- **Ireland:** Yop Bros (wear tracksuits daily, understand the fit)
- **UK:** Roadmen, estate culture, same energy
- **Why them:** Tracksuit is functional + aspirational. Drop 001 proved they'll buy if it's real.

**Secondary:** Artists, designers, creatives
- Drawn to the story, not the category
- Will wear pieces, photograph them, share them
- Builds cultural credibility

**Tertiary:** Fashion collectors who get scarcity
- Limited runs appeal to them
- Word-of-mouth from hype accounts

---

## BRAND VOICE & MESSAGING

### What We Say
- Specific + honest (real numbers, real places)
- "Built between Ireland and Italy"
- "24 units. 24 hours. Sold out."
- "Hidden zip pocket. Seamless. Impossible to find."
- Monospace for technical/archive language
- Serif for emotional statements

### What We NEVER Say
- "Artisan," "elevated," "bespoke," "craft," "curated," "authentic"
- Generic marketing speak
- Superlatives without proof

### Brand Statement
"Built from nothing. Worn by those who understand."

---

## CURRENT STATUS (June 15, 2026)

### ✅ COMPLETED
- Homepage rebuilt with mission section
- Drop 002 page rewritten (mission-first messaging)
- Archive signup system live
- Email templates updated (mission-aligned)
- Stripe payments working
- MISSION-FRAMEWORK.md finalized (complete strategy)

### 🚀 IN PROGRESS
- Drop 002 tracksuit: Waiting on 40+ pre-orders to confirm production
- Drop 003 artist collab tee: Design phase (deciding artist + concept)
- Stall locations: Dublin, Manchester, Liverpool (dates TBD)

### ❌ NOT BUILT YET
- Order confirmation emails (api/order-confirm.js exists, needs testing)
- Stock tracking in admin
- Admin order log
- TikTok Shop integration

---

## WHAT'S HAPPENING NOW (June 15-July 31)

### TIMELINE

**Week 1 (June 15-22):**
- [ ] Finalize artist collab tee design
- [ ] Order production (500 units)
- [ ] Launch `/tee` page on website
- [ ] Email announcement to waitlist

**Week 2-3 (June 23-July 5):**
- [ ] TikTok rollout (design reveal, artist interview, behind-the-scenes)
- [ ] Pre-orders open
- [ ] Target: 200+ tees pre-ordered

**Week 4 (July 6-15):**
- [ ] First batch arrives + ships
- [ ] Stall integration begins (Dublin first)
- [ ] Content: Unboxing, people wearing, customer photos

**Week 5-8 (July 15-August 1):**
- [ ] Manchester + Liverpool stalls
- [ ] Momentum building into tracksuit drop
- [ ] Content: Community stories, artist interview, countdown to Drop 002

**August 2026:**
- [ ] Drop 002 tracksuit launches
- [ ] 48h early access for Archive members
- [ ] Public launch follows

---

## KEY NUMBERS & TARGETS

### Drop 002 (August)
- **Pre-order goal:** 40+ to confirm production
- **Revenue target:** €3,500+ (validates model)
- **Waitlist target:** 500+ by August

### Drop 003 Artist Tee (June-July)
- **Production:** 500 units @ €5-8 cost
- **Price:** €20-25
- **Revenue target:** €6,000-10,000 (funds tracksuit production)
- **Pre-order goal:** 200+ units

### 12-Month Goal (by June 2027)
- Drop 001 + 002: 500+ units sold
- 1,000+ email subscribers
- 5,000+ TikTok followers
- 3,000+ Instagram followers
- 2-3 drops launched
- Regional stalls operating
- Positive profit margin
- Documentary/content filmed

---

## ABSOLUTE RULES (NEVER BREAK)

1. **Always €, never $**
2. **Mission first, product second** — every message should answer "why does this exist?"
3. **Always cite numbers** — "24 units. 24 hours. Sold out." proves authenticity
4. **Shipping = qty × €6** — never a flat rate
5. **No colour accents** — monochrome only
6. **No "bespoke/artisan/elevated" language** — we're real, not luxury
7. **Limited runs forever** — scarcity proves value
8. **Direct sales only** — no wholesale, 100% control
9. **Everything intentional** — if you can't answer why it exists, don't ship it
10. **Tell the story** — the product is secondary to the mission

---

## YOUR ROLE

As co-worker, you'll help with:

**Design & Brand:**
- Visual mockups for artist collab tee
- Social media assets (TikTok, Instagram)
- Copy refinement (emails, landing pages)
- Community management

**Operations:**
- Coordinate with print suppliers
- Manage inventory (stalls, shipping)
- Track pre-orders + fulfillment
- Monitor metrics (conversion, engagement)

**Product:**
- Test new pages before launch
- Suggest improvements to UX/flow
- Catch messaging inconsistencies
- Quality assurance

---

## HOW TO WORK TOGETHER

1. **Read this document first** (you just did ✓)
2. **Read CLAUDE.md** in the project root — it's the master spec
3. **Read MISSION-FRAMEWORK.md** — complete strategy playbook
4. **Skim TECHNICAL-BRIEF.md** — API endpoints + architecture
5. **Use Claude Code** with the same codebase — full context from git history

**Questions?** Check CLAUDE.md first. If not there, ask Richard directly (he types fast, prefers direct answers over long explanations).

---

## QUICK START

```bash
cd "C:\Users\muodi\Desktop\Antigravity Project\true-vision-project"

# Start dev server
npm run dev

# See local changes at http://localhost:5173

# Push to production
git add [specific files]
git commit -m "..."
git push
# Auto-deploys to Vercel in ~60 seconds
```

**Never:** `git add .` (might commit secrets)  
**Always:** Check that npm run build works before pushing

---

## KEY DOCUMENTATION

- **MISSION-FRAMEWORK.md** — Philosophy + messaging strategy
- **TECHNICAL-BRIEF.md** — API docs + architecture
- **PRODUCT-STRATEGY-BRIEF.md** — Roadmap + email sequences
- **CLAUDE.md** — Master spec (routing, rules, status)
- **TVP-FULL-BRAND-BRIEF.md** — Brand deep-dive

---

## WHAT'S NEXT (IMMEDIATE)

**Artist Collab Tee — Decision Required**

We're building a **limited tee designed with a street artist** (500 units, €20-25) before the tracksuit drops in August.

**Questions to answer:**
1. Which artist/region? (Dublin street artist? Manchester graffiti writer?)
2. Design concept? (Bold collab? Subtle TVP + artist blend?)
3. Production timeline? (June 15-30 to launch by July 1?)
4. Promotion strategy? (How do we reach the artist's audience?)

**Your input:** What feels right to you?

---

**Welcome to TVP. Let's build something real.**

---

**Last updated:** June 15, 2026  
**For:** Co-worker onboarding  
**Status:** Ready to execute
