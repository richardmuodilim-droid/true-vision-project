# EDITION 01 PRE-ORDER PAGE — FULL COPY + BUILD SPEC
*For Claude Code to implement when the sample is approved. Route: `/edition-01`. No Navbar (standalone, like /drop-002). Design system rules apply: cream #F5F3EE bg, #111 text, mono/serif from src/lib/design, grain overlay, corner marks. All copy below is final — build, don't rewrite.*

---

## 1. HERO (dark section, #0a0909, like the gate)

Small mono label: `[ EDITION 01 — THE VISION CHART ]`
Serif headline (Cormorant, cream): `You either see it, or you don't.`
Mono subline: `50 PIECES. NUMBERED. MEMBERS FIRST.`
CTA button (mono, bordered): `CLAIM YOUR NUMBER →` (scrolls to order block)

## 2. THE TEST (cream section — the concept, short)

Serif heading: `The back of this shirt is an eye test.`
Body (Inter): `Six lines. They shrink. Most people read the top from across the street — NOBODY SAW US COMING — and keep walking. The ones who come closer find the smaller lines. The ones who look properly find the last one, and the last one opens a door. That's the whole idea of True Vision: some people see it. Most don't.`
Visual: real photo of the sample back (replace TVP-EDITION01-CAMPAIGN.png once sample photos exist — REAL photos only on this page).

## 3. THE PIECE (product block)

Mono label: `[ THE GARMENT ]`
- `HEAVYWEIGHT 240–280 GSM COTTON — STRUCTURED, BOXY, DROPPED SHOULDER`
- `CREAM, BLACK PRINT — ONE COLOURWAY, NEVER REPEATED`
- `EVERY PIECE HAND-NUMBERED — N° __ OF 50`
- `INSIDE THE COLLAR, A LINE ONLY YOU WILL SEE`
- `SIZES S / M / L / XL`

Price: `€38 + €6 shipping` (shipping = qty × €6, never flat)

## 4. THE RULES (scarcity block, mono, short lines)

`FIFTY PIECES. WHEN THEY'RE CLAIMED, THE DOOR CLOSES.`
`MEMBERS SEE IT 48 HOURS BEFORE ANYONE ELSE.`
`EVERY BUYER RECEIVES 2 INVITES TO BRING THEIR PEOPLE IN.`
`NUMBERS ARE ASSIGNED IN ORDER OF CLAIM. LOW NUMBERS GO FIRST.`

## 5. ORDER BLOCK

Title (serif): `Claim your number.`
Live counter: `N° 07 — 43 OF 50 REMAINING` (from KV counter `tvp:edition01:count`)
Size selector → Stripe checkout (existing create-checkout-session.js, new product).
Button: `CLAIM N° [next] — €38`
Under button (small mono): `PRE-ORDER. PRODUCTION STARTS WHEN THE EDITION IS CLAIMED. SHIPS IN 3–4 WEEKS. YOU'LL SEE EVERYTHING — WE FILM THE WHOLE PROCESS.`

## 6. FOOTER LINE

`BUILT FROM NOTHING · IRELAND × ITALY · EST. 2026`
`NEVER FORGET WHERE YOU CAME FROM.`

---

## BUILD NOTES (Claude Code)

- Members-first: for first 48h, page checks `TrueVisionMember` in localStorage; non-members see the page but the order block shows `MEMBERS GO FIRST. REQUEST ACCESS →` linking to /archive. After 48h (env flag or KV timestamp), open to anyone who's through the gate.
- Number assignment: increment KV `tvp:edition01:count` on successful checkout (webhook or order-confirm), store buyer→number in `tvp:edition01:numbers`. Numbers 1–2 reserved founders, 3–22 reserved seeding (skip logic: public sales start at N° 23).
- Order confirmation email must include their number: subject `N° [X] OF 50 IS YOURS.`
- Buyer invites: reuse existing referral engine; grant 2 invites on purchase.
- Keep `/edition-01` behind the gate like everything else — the lock IS the funnel.
- Absolute rules apply: € only, no unit counts on the homepage hero, no "restock" language anywhere.
