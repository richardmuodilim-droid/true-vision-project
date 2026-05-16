# CLAUDE HANDOFF — TRUE VISION PROJECT
## Paste this into any new Claude session to get full context instantly
---

## FIRST THING TO DO

Read this file:
`C:\Users\muodi\Desktop\Antigravity Project\true-vision-project\CLAUDE.md`

That file has everything — stack, routing, API, design rules, what's built, what's next, and how Richard works. It is the single source of truth for this project and is kept up to date every session.

Then read:
`C:\Users\muodi\Desktop\Antigravity Project\true-vision-project\src\App.jsx`

to understand the full routing and layout structure.

---

## WHO YOU ARE WORKING WITH

**Richard** — co-founder of True Vision Project. Based in Wexford, Ireland. Builds everything with Claude directly. No dev team. His partner handles social media only.

**How he works:**
- Moves fast — when he says go, go
- Doesn't want plans explained back to him, wants things built
- Types loosely — read intent, not literal words
- 1–2 sentence responses after tasks, not essays
- Wants code pushed to GitHub after every change so Vercel deploys immediately

---

## THE PROJECT IN ONE PARAGRAPH

True Vision Project is an Irish editorial fashion brand — not a store, a mission. Two founders, two small towns (Wexford Ireland + Bergamo Italy), built from nothing with no money, no backing, no connections. Drop 001 is The Foundation Cap — 24 units, €32, made between Ireland and Italy. The website has two worlds: the `/store` (buy the cap) and the `/archive` (join the project as a member). Both are cinematic, story-first, not e-commerce first. The brand voice is honest, specific, and human. Never marketing language.

Live at: **truevisionproject.com**
GitHub: `richardmuodilim-droid/true-vision-project`
Local path: `C:\Users\muodi\Desktop\Antigravity Project\true-vision-project`

---

## CURRENT STATUS

**Payments:** Stripe live and working
**Email:** Plain text welcome email on archive registration — verified domain, lands in inbox
**Admin:** `/archive-admin` — password protected, shows all members + last seen + financials
**Deploy:** Auto-deploy via Vercel on every git push to main

**What still needs building:**
1. Order confirmation email after Stripe payment
2. Discount code system (for influencer / rapper outreach)
3. Stock tracking and admin order log
4. Drop 002 waitlist / notify me

---

## CRITICAL RULES (MEMORISE THESE)

- Always `€` never `$`
- Never show unit quantities anywhere on the site
- Never say "No restock" or "No compromise"
- Never add Navbar to the `/` landing route
- Welcome emails = plain text only, never HTML
- Always git push after every change
- Never build features that weren't asked for
- Check if something already exists before building it

---

## BRAND VOICE QUICK REFERENCE

| Use | Avoid |
|---|---|
| Specific details and real numbers | "authentic", "artisan", "craft" |
| Honest, direct tone | Marketing superlatives |
| "Built between Ireland and Italy" | "elevated", "curated", "bespoke" |
| Space Mono for technical copy | Generic e-commerce language |
| Cormorant Garamond for story copy | |

**Core statement:** "Built from nothing. Worn by those who understand."

---

## START

1. Read `CLAUDE.md` in the project root
2. Ask Richard what to work on — or if he already said, start building immediately
