# THE GATE — what was built (July 2026)

The site is now invitation-only. Built by Fable (Cowork session); this note is the handoff.

## What changed (3 files)
- `src/lib/gate.js` — NEW. Gate logic: unlock state, code check, invite-link unlock, exempt paths.
- `src/components/GateScreen.jsx` — NEW. The lock screen (black, terminal-style, matches Vault aesthetic).
- `src/App.jsx` — MODIFIED. Added `GateKeeper` wrapper inside `BrowserRouter` around `Routes`.

## How it works
Every route is locked EXCEPT `/archive` (the front door — joining the Vault makes you a member and unlocks you), `/archive-admin`, and `/order-success` (Stripe return URL, never block a paying customer).

Three ways in:
1. **Access code** typed on the lock screen. Default code: `UNDERSTOOD`. Override with env var `VITE_GATE_CODES` (comma-separated, e.g. `WEXFORD26,BERGAMO26`) — set it in Vercel project settings, then redeploy.
2. **Invite link** — existing referral links (`?ref=TVP-XXX-XXXX`) unlock on arrival and still credit the referrer. Also `?key=CODE` works for sharing in DMs.
3. **Existing member** — anyone with `TrueVisionMember` in localStorage passes straight through.

Unlock persists in localStorage (`tvp_gate_unlocked`).

## Kill switch
`GATE_ENABLED = false` in `src/lib/gate.js` → site is fully public again. One line.

## Verified
Syntax-checked (esbuild) on all three files. Full `npm run build` could not run in the sandbox (Windows node_modules vs Linux) — **run `npm run build` locally before deploying.**

## Not done yet (next in code, whoever picks it up)
- Change per-drop codes via Vercel env when drops open.
- Optional: log entered codes to KV to see which seeded codes get used (attribution per creator).
