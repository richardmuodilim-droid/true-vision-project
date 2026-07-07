# TRUE VISION PROJECT — COMPLETE BRAND BRIEF
**Updated: June 10, 2026**

---

## WHAT IS TRUE VISION PROJECT?

**True Vision Project (TVP)** is a micro-brand built by two founders from Wexford (Ireland) and Bergamo (Italy). 

**The statement:** "Built from nothing. Worn by those who understand."

**The mission:** We are not building a brand. We are documenting a mission. 

We make limited-run clothing with real stories. Everything we drop has a reason, a process, a number. We sell direct, prove demand fast, and move with intention.

---

## THE FOUNDING STORY (USE IN ALL COPY)

Richard and his partner started with a conversation on a train between two small towns — Wexford and Bergamo. No factory connections. No capital. No hype machine. Just a decision: **make something real, sell it to people who actually want it, tell the truth about how it's done.**

Drop 001 proved it works. Drop 002 is proof we're not stopping.

---

## CURRENT PRODUCTS

### DROP 001 — THE FOUNDATION CAP ✅ SOLD OUT
- **Status:** 24 units produced. Sold out in 24 hours. No restock planned.
- **Price:** €32 + €6 shipping
- **Material:** 300GSM washed chino twill
- **Colours:** Black, White (one size)
- **Origin:** Wexford + Bergamo (designed in Ireland, material sourced in Italy)
- **What it proved:** The model works. People will buy if the story is real.

### DROP 002 — THE TRACKSUIT 🚀 AUGUST 2026
- **Status:** Currently accepting pre-orders via waitlist
- **Price:** €70 full set
- **What's included:** Jacket + jogging bottoms
- **Material:** Heavyweight tracksuit fabric (specs TBD with supplier)
- **Sizes:** S / M / L
- **Colourways:** 3 exclusive designs
  - Purple / Black (TVP-002-PB) — accent #7B2FBE
  - Light Blue / Grey (TVP-002-LG) — accent #7DD3DA
  - Pink / Black (TVP-002-PK) — accent #EC008C
- **Key feature:** Hidden zip pocket (jacket) + hidden waistband pocket (bottoms)
- **Supply chain:** Pakistan manufacturer, 3-4 week lead time
- **Strategy:** Pre-order approach. If 40+ orders confirmed by June, we move forward.
- **Market target:** Young men aged 16-30 in tracksuit culture (Yop Bros in Ireland, Roadmen in UK)
- **Launch strategy:** Stall-to-stall across Ireland + England first. Direct sales on the ground, building community, proving demand before mass retail.

---

## WHAT WE'RE PLANNING (DROP 003+)

### IMMEDIATE (BEFORE TRACKSUIT — JUNE-JULY 2026)
**Viral moment needed:** Something that isn't clothing but becomes a cultural object.

**Current idea:** Limited poster series (3 designs, 1,000 each)
- Design 1: The Map (Wexford + Bergamo + founding train photo)
- Design 2: The Numbers (24 units. 24 hours. Sold out.)
- Design 3: The Statement ("Built from nothing. Worn by those who understand.")
- **Price:** €12 each
- **Production cost:** ~€2-3 per poster
- **Why:** Artists collect + photograph posters. Gets shared on Instagram/TikTok. Changes narrative from "clothing brand" to "cultural movement." Zero manufacturing complexity.
- **Benefit:** Revenue + audience building + buzz for tracksuit launch

### OPTION: Artist collaboration instead
Partner with a street artist or graffiti writer. Limited tee or hoodie. Edgy. Gets reposted by creative accounts. Brings new audience.

### AFTER TRACKSUIT (SEPTEMBER 2026+)
**Drop 003 — Standalone bottoms + regional exclusives**
- Jogging bottoms in the 3 tracksuit colourways
- €45 per pair
- Sold ONLY at physical stalls in specific cities (Dublin, Manchester, Liverpool)
- Different colourway exclusive to each region
- Creates scarcity + drives foot traffic
- High volume play (people who bought jackets buy bottoms)

---

## THE WEBSITE (truevisionproject.com)

### Current State (Fully Rebuilt June 2026)

**Homepage (/)** — Story + conversion focused
- Hero: "We Are Not Building A Brand. We Are Documenting A Mission."
- Social proof: "24 units. Sold out in 24 hours. No ads." (moved to hero)
- Drop 001 section: Cap story + "Sold Out" badge
- Drop 002 teaser: Full product image + spec bar + signup CTA
- Floating mobile CTA: Appears when user scrolls past hero → "Drop 002. Join the waitlist."
- CTAs point to `/drop-002`

**Drop 002 Page (/drop-002)** — Full teaser + waitlist entry
- Hero: "The Tracksuit. August 2026."
- Countdown timer (live, updates every second)
- Full product image (all 3 colourways visible in one shot)
- Spec bar: €70 / S-M-L / 3 Colourways / Limited Run
- Colourway list (clean rows, no dark cards — just type + colour accent)
- Hidden pocket feature section with product detail photo
- Email → Name → Confirmation animation
- After submit: WaitlistConfirmScreen plays (scanning line animation, status text, colour dots)
- Confirmed state: "You're on the list. August 2026 — You'll be first."
- Returning members (localStorage): Skip form, go straight to Drop002Entry interior page
- Drop002Entry (member interior): Shows colourways, access tier, countdown, manifesto

**Archive (/archive)** — TVP membership signup
- Vault email form → DecryptionScreen animation → ArchiveEntry interior
- ArchiveEntry shows: Drop 001 manifest (cap sold out), Drop 002 as "NEXT DROP"
- Members get 48h early access to every future drop
- Free to join

**Our Story (/our-story)** — 8-section brand narrative
- Full founding story: Wexford + Bergamo, train photo, why we exist
- "Built from nothing. Worn by those who understand."

**Navbar (all pages except standalone)**
- Logo (left)
- Links: Our Story / Archive
- Drop 002 button (bordered, prominent) — right side
- Mobile hamburger (animated 3-line → X)
- No cart icon (nothing for sale yet except pre-orders)

**Footer (all pages)**
- Brand + social (TikTok + Instagram)
- Links: Drop 001 / Drop 002 / Our Story / Archive
- Copyright + Wexford/Bergamo locations

### Recent Optimizations (Done)
✅ Removed cart system from homepage (no dead UI)
✅ Moved social proof to hero (social validation first)
✅ Reordered Drop 002 section earlier in flow (before long scrolls)
✅ Added floating mobile CTA (persistent conversion hook)
✅ Redesigned Drop 002 page: removed dark gradient cards, show full product image first, clean colourway list
✅ Multi-step waitlist form: email → name → confirmation animation (matches Archive pattern)
✅ Email confirmations: Drop 002 waitlist + Archive both send welcome emails from "True Vision Project"

### What's NOT built yet
❌ Order confirmation emails (Stripe → Resend)
❌ Stock tracking in admin
❌ Admin order log
❌ Drop 002 checkout page (when we're ready to take money)
❌ TikTok Shop integration
❌ Stall location tracker page

---

## TECHNICAL STACK

**Frontend:** React 18 + Vite + TailwindCSS + Framer Motion  
**Routing:** React Router v6 (BrowserRouter + Routes)  
**Hosting:** Vercel (auto-deploys on every git push to main)  
**Database:** Vercel KV (Redis)  
**Email:** Resend (FROM: archive@truevisionproject.com)  
**Payments:** Stripe (live, not sandbox)  
**DNS:** Namecheap (all records verified)  

**Design system (src/lib/design.js):**
- Fonts: Space Mono (mono) / Cormorant Garamond (serif) / Inter (body)
- Ease curve: [0.16, 1, 0.3, 1]
- Colours: #F5F3EE (light bg) / #111111 (dark text) / #0a0909 (Drop 002 dark)
- No colour accents. No decorative gradients.

**Vercel KV keys:**
- `tvp:emails` — Archive members (hset by email)
- `tvp:members` — Archive members (lpush)
- `tvp:count` — Archive member count
- `tvp:drop002:waitlist` — Drop 002 waitlist (auto-populated when Archive member joins)

---

## CONVERSION FLOW

```
Homepage (/)
  ↓ Hero CTA: [ Join the Waitlist ] → /drop-002
  ↓ Section 02 CTA: [ Join Drop 002 Waitlist ] → /drop-002
  ↓ Drop 002 Section CTA: [ Join the Waitlist ] → /drop-002
  ↓ Floating mobile bar (after scroll): "Drop 002. Join →" → /drop-002

Drop 002 (/drop-002)
  ↓ Email input
  ↓ Name input
  ↓ Submit
  ↓ WaitlistConfirmScreen animation (scanning, colours, "You're on the list")
  ↓ Drop002Entry interior (if returning member)

Archive (/archive)
  ↓ Email input
  ↓ Name input
  ↓ Submit
  ↓ DecryptionScreen animation
  ↓ ArchiveEntry interior (shows Drop 002 as next)
  ↓ 48h early access to all drops
```

---

## THE AUDIENCE (WHO WE'RE SELLING TO)

**Primary:** Young men aged 16-30 in tracksuit culture
- **Ireland:** Yop Bros (kids who wear tracksuits every day, understand the fit)
- **UK:** Roadmen, estate culture, same energy
- **Why them:** Tracksuit is functional + aspirational. Drop 001 (cap) proved they'll buy if it's real.

**Secondary:** Artists, designers, creative people
- Drawn to the story, not the category
- Will wear the pieces, photograph them, share them
- Builds cultural credibility

**Tertiary:** Fashion people who get scarcity
- Limited runs appeal to collectors
- Word-of-mouth from hype accounts

---

## MESSAGING & VOICE

**What we say:**
- Specific + honest (real numbers, real places)
- "Built between Ireland and Italy"
- "24 units. 24 hours. Sold out."
- "Hidden zip pocket. Seamless. Impossible to find."
- Monospace for technical/archive language
- Serif for emotional statements

**What we NEVER say:**
- "Artisan," "elevated," "bespoke," "craft," "curated," "authentic"
- Generic marketing speak
- Superlatives without proof

**Brand statement:** "Built from nothing. Worn by those who understand."

---

## BUSINESS MODEL

**How we make money:**
1. Direct sales on the website (pre-orders + drops)
2. Stall sales (physical presence in Dublin, Manchester, Liverpool)
3. Stripe for payments (live)
4. Margin: Production cost + 60-80% markup

**Example math (tracksuit):**
- Production cost: ~€28-35 per set
- Sell price: €70
- Margin per unit: €35-42
- Break-even: Need 100+ orders to justify supplier run

**Current strategy:** 
- Prove demand via waitlist
- If 40+ pre-orders: move forward with production
- If not: iterate, try something else

---

## WHAT'S WORKING

✅ **The story.** People buy TVP because they believe in it, not because they need another cap.  
✅ **Scarcity.** "24 units in 24 hours" is more powerful than "pre-order now."  
✅ **Direct model.** No middlemen. No wholesale. 100% control.  
✅ **The visual consistency.** Monochrome, grain, corner marks. Instantly recognizable.  
✅ **Multi-step forms.** Email → Name → Animation makes people feel special.  
✅ **Mobile floating CTA.** Converts people who don't scroll to the bottom.

---

## WHAT'S NOT WORKING

❌ **Drop 002 page colourway display was confusing** (fixed: now shows full product image first, clean list)  
❌ **Cart icon was noise** (fixed: removed)  
❌ **Social proof was buried** (fixed: moved to hero)  
❌ **No persistent CTA on mobile** (fixed: floating bar)  
❌ **Long scroll before conversion point** (fixed: reordered sections)

---

## IMMEDIATE NEXT MOVES (JUNE-JULY 2026)

1. **Decide on Drop 003 pre-launch** (poster series vs. artist collab)
2. **Launch pre-drop momentum piece** (2-3 weeks from now)
3. **Track Drop 002 waitlist growth** (target: 40+ to confirm production)
4. **Prepare stall locations** (Dublin, Manchester, Liverpool mapped out)
5. **Plan August 2026 launch** (countdown, email sequence, TikTok content)
6. **Build email content calendar** (weekly updates to waitlist about production progress)
7. **Document the process** (behind-the-scenes = social content goldmine)

---

## KEY NUMBERS

- **Drop 001:** 24 units produced, sold out in 24 hours, €32 each
- **Drop 002 target:** 40+ pre-orders to confirm production
- **Timeline:** August 2026 launch
- **Team:** 2 founders (Wexford + Bergamo)
- **Website traffic:** Not measured yet (focus on conversion over traffic)
- **Current waitlist:** Growing (exact number in Vercel KV)
- **Admin access:** truevisionproject.com/archive-admin (password: [rotated — set in Vercel env])

---

## RULES THAT NEVER CHANGE

- Always €, never $
- Always Space Mono for UI, Cormorant Garamond for headlines
- Always #F5F3EE background (never pure white)
- Always monochrome (no colour accents)
- Always 3-colourway strategy (gives range without chaos)
- Always limit runs (scarcity = value)
- Always direct sales (no wholesale)
- Always tell the story (the product is secondary to why it exists)
- Always update the master documents (CLAUDE.md + this file)

---

## GIT REPOSITORY

**GitHub:** richardmuodilim-droid/true-vision-project  
**Workflow:** 
```
git add [specific files]
git commit -m "message"
git push  # auto-deploys to Vercel in ~60 seconds
```

**Never:** `git add .` / commit secrets / commit `.env`

---

## FINAL NOTE

True Vision Project is not a fashion brand. It's a documentation of a mission. Every product, every email, every piece of copy should answer: **Why does this exist, and who is it for?**

If you can't answer that, don't ship it.

Everything is intentional. Nothing is random.

---

**Last updated:** June 10, 2026  
**Owner:** Richard (Wexford) + Partner (Bergamo)  
**Status:** Drop 001 complete. Drop 002 in waitlist phase. Drop 003 ideas in development.
