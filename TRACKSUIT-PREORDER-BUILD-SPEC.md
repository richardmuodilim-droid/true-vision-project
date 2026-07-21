# TRACKSUIT PRE-ORDER PAGE — BUILD SPEC (for Claude Code)
*The active drop is now the tracksuit, not the tee. This spec adapts the drop into the site. Route: reuse `/drop-002` (already the tracksuit teaser) and upgrade it into a full pre-order + checkout page. No Navbar (standalone, like the gate). Stays behind the invite gate. All copy below is final — build, don't rewrite. Follow the design system in CLAUDE.md (cream #F5F3EE, #111 text, #0a0909 dark, Space Mono + Cormorant from src/lib/design, grain overlay, corner marks). € only. Shipping = qty × €6, never flat.*

---

## 0. CONTEXT FOR THE BUILD
- The Edition 01 (tee) pre-order page + `/edition-01` counter flow already built stays in the repo but goes DORMANT (tee is the drop AFTER the tracksuit). Do not delete — just don't link to it.
- The tracksuit is the ACTIVE drop. Product: hidden-pocket full tracksuit (jacket + bottoms), 3 colorways, sizes S/M/L, €70/set.
- Images to use (Richard is adding real/render exports to `public/`): reuse existing `ts-*.jpg/png` if present; otherwise placeholders named `ts-pink.jpg`, `ts-blue.jpg`, `ts-purple.jpg`, `ts-pocket.jpg`, `ts-lineup.jpg`. REAL photos replace renders the moment the sample is shot.

## 1. HERO (dark #0a0909)
Mono label: `[ TVP // THE HIDDEN-POCKET TRACKSUIT ]`
Serif headline (Cormorant, cream): `You'll never find it.`
Mono subline: `A POCKET ONLY THE OWNER KNOWS. THREE VERSIONS. NUMBERED.`
CTA (mono bordered): `CLAIM YOURS →` (scrolls to order block)

## 2. THE SECRET (short concept section)
Serif heading: `Every tracksuit hides a pocket.`
Body (Inter): `A seamless zip on the jacket. A hidden pocket sewn inside the waistband. Invisible when closed — impossible to find unless you know it's there. Your cash, your keys, your cards, held where nobody looks. Some things are only for the ones who understand.`
Visual: `ts-pocket.jpg` (closed → open, the reveal).

## 3. THE THREE (colorway selector — this drives the order)
Mono label: `[ CHOOSE YOUR VERSION ]`
Three cards, each: image + name + accent color:
- `PINK / BLACK` (accent pink)
- `LIGHT BLUE / GREY` (accent ice blue)
- `PURPLE / BLACK` (accent purple)
Selecting a card sets the colorway for checkout.

## 4. THE PIECE (spec block, mono)
`[ THE SET — JACKET + BOTTOMS ]`
- `92% POLYESTER / 8% ELASTANE · ~300 GSM · FOUR-WAY STRETCH`
- `MOISTURE-WICKING · BREATHABLE · ATHLETIC FIT`
- `HIDDEN ZIP POCKET (JACKET) + HIDDEN WAISTBAND POCKET (BOTTOMS)`
- `TV EMBROIDERED — LEFT CHEST + BACK NECK`
- `EACH SET NUMBERED — N° __ / 100`
- `SIZES S / M / L`
Price: `€70 + €6 shipping`

## 5. THE RULES (scarcity, mono short lines)
`ONE HUNDRED SETS. NUMBERED. NEVER REPEATED.`
`MEMBERS SEE IT 48 HOURS BEFORE ANYONE.`
`EVERY BUYER RECEIVES 2 INVITES.`
`PRE-ORDER FUNDS THE DROP. WHEN IT'S CLAIMED, THE DOOR CLOSES.`

## 6. ORDER BLOCK
Title (serif): `Claim your number.`
Live counter: `N° 07 — 93 OF 100 REMAINING` (KV key `tvp:tracksuit:count`)
Inputs: colorway (from section 3) + size (S/M/L) → Stripe checkout (reuse `create-checkout-session.js`, new product/price €70, ship €6).
Button: `CLAIM N° [next] — €70`
Under button (mono small): `PRE-ORDER. PRODUCTION STARTS WHEN THE DROP IS CLAIMED. SHIPS IN 3–4 WEEKS. WE FILM THE WHOLE PROCESS.`

## 7. FOOTER LINE
`BUILT FROM NOTHING · IRELAND × ITALY · EST. 2026`
`NOBODY SAW US COMING.`

---

## BUILD NOTES (Claude Code)
1. First: `git pull`/read latest `CLAUDE.md` — plan is tracksuit-first. Commit the pending doc changes (CLAUDE.md + new .md files) before coding.
2. Upgrade `/drop-002`: keep its teaser bones, add sections 3–6 above. Keep it behind the gate and standalone (no Navbar).
3. Members-first 48h: reuse the same gate/member check already used on `/edition-01` (localStorage `TrueVisionMember`); non-members see page but order block shows `MEMBERS GO FIRST. REQUEST ACCESS →` → `/archive`.
4. Numbering: new KV keys `tvp:tracksuit:count` and `tvp:tracksuit:numbers` (buyer→number+colorway+size). Numbers 1–2 founders, 3–22 seeding, public starts at N° 23. Mirror the logic already written for `/edition-01` — reuse, don't reinvent.
5. Stripe: new product "TVP Hidden-Pocket Tracksuit" €70, metadata = colorway + size + number. Shipping qty × €6.
6. Order-confirm email subject: `N° [X] OF 100 IS YOURS.` include colorway + size + number.
7. Grant 2 invites on purchase (existing referral engine).
8. Homepage + gate "coming" link should point to the tracksuit now, not the tee.
9. Run `npm run build` before pushing. Push. Update CLAUDE.md "WHAT'S BUILT" when done.

## VERIFY
- Order works end to end in Stripe test.
- Counter increments on successful checkout.
- Non-member sees members-first gate on the order block during the 48h window.
- € everywhere, shipping = qty × €6, no unit counts leaked to the homepage hero.
