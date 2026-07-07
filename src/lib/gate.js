// TVP Gate — "You don't visit True Vision. You get let in."
//
// The whole site sits behind this gate. Three ways through:
//   1. An access code (shared in DMs, on seeded pieces, at events)
//   2. An invite link  (?ref=TVP-XXX-XXXX — existing referral engine)
//   3. Being a member already (TrueVisionMember in localStorage)
//
// Kill switch: set GATE_ENABLED to false and the site is public again.
// Codes: comma-separated in VITE_GATE_CODES env var, falls back to DEFAULT_CODES.

export const GATE_ENABLED = true

const UNLOCK_KEY = 'tvp_gate_unlocked'
const MEMBER_KEY = 'TrueVisionMember'

const DEFAULT_CODES = ['UNDERSTOOD']

// Paths that must stay reachable while locked:
//  - /archive is the front door (join → become member → unlocked)
//  - /archive-admin is the admin panel
//  - /order-success is Stripe's return URL — never block a paying customer
export const EXEMPT_PATHS = ['/archive', '/archive-admin', '/order-success']

function getCodes() {
  const env = import.meta.env.VITE_GATE_CODES
  if (env && typeof env === 'string') {
    const list = env.split(',').map(c => c.trim().toUpperCase()).filter(Boolean)
    if (list.length) return list
  }
  return DEFAULT_CODES
}

export function isMember() {
  try {
    const raw = localStorage.getItem(MEMBER_KEY)
    if (!raw) return false
    const m = JSON.parse(raw)
    return Boolean(m?.userId)
  } catch { return false }
}

export function isUnlocked() {
  if (!GATE_ENABLED) return true
  try {
    if (localStorage.getItem(UNLOCK_KEY) === '1') return true
  } catch {}
  return isMember()
}

export function unlock() {
  try { localStorage.setItem(UNLOCK_KEY, '1') } catch {}
}

export function lock() {
  try { localStorage.removeItem(UNLOCK_KEY) } catch {}
}

export function tryCode(input) {
  const attempt = String(input || '').trim().toUpperCase()
  if (!attempt) return false
  if (getCodes().includes(attempt)) {
    unlock()
    return true
  }
  return false
}

// Invite links and shared ?key= links unlock on arrival.
// Returns true if this visit carried a valid unlock token.
export function consumeUrlUnlock() {
  try {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref && /^TVP-\d{3}-[A-Z0-9]{4}$/i.test(ref.trim())) {
      unlock()
      return true
    }
    const key = params.get('key')
    if (key && getCodes().includes(key.trim().toUpperCase())) {
      unlock()
      return true
    }
  } catch {}
  return false
}

export function isExemptPath(pathname) {
  return EXEMPT_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))
}
