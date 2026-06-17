import { kv } from '@vercel/kv'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function generateUserId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let suffix = ''
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)]
  }
  return `TVP-001-${suffix}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limiting — max 5 attempts per IP per hour
  const ip = (req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown'
  const rateLimitKey = `tvp:ratelimit:${ip}`
  const attempts = await kv.incr(rateLimitKey)
  if (attempts === 1) await kv.expire(rateLimitKey, 3600)
  if (attempts > 5) {
    return res.status(429).json({ error: 'Too many attempts. Please try again later.' })
  }

  const { email, name } = req.body ?? {}
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const normalised = email.toLowerCase().trim()
  const normalisedName = (name ?? '').trim()

  // Referral: who brought them in (member userId format TVP-001-XXXX)
  const rawRef = typeof req.body?.ref === 'string' ? req.body.ref.trim().toUpperCase() : ''
  const ref = /^TVP-\d{3}-[A-Z0-9]{4}$/.test(rawRef) ? rawRef : ''

  // Return existing entry if already registered
  const existing = await kv.hget('tvp:emails', normalised)
  if (existing) {
    const entry = typeof existing === 'string' ? JSON.parse(existing) : existing
    return res.status(200).json({ userId: entry.userId, name: entry.name ?? '', returning: true })
  }

  // Generate unique ID and store
  const memberNumber = await kv.incr('tvp:count')
  const userId = generateUserId()
  const timestamp = new Date().toISOString()
  const entry = { email: normalised, name: normalisedName, userId, timestamp, memberNumber, referredBy: ref || null }

  await kv.hset('tvp:emails', { [normalised]: JSON.stringify(entry) })
  await kv.lpush('tvp:members', JSON.stringify(entry))
  await kv.sadd('tvp:drop002:waitlist', normalised)
  // Explicit signup = re-consent: clear any prior unsubscribe
  await kv.srem('tvp:unsubscribed', normalised)
  // Credit the member who brought them in
  if (ref && ref !== userId) {
    await kv.incr(`tvp:ref:${ref}`)
  }

  const firstName = normalisedName.split(' ')[0] || 'Member'
  const capName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()

  const unsubUrl = `https://truevisionproject.com/api/unsubscribe?email=${encodeURIComponent(normalised)}`

  await resend.emails.send({
    from: 'True Vision Project <archive@truevisionproject.com>',
    to: normalised,
    replyTo: 'archive@truevisionproject.com',
    subject: `You're one of us now`,
    headers: {
      'List-Unsubscribe': `<${unsubUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
    text: `${capName},

You're in. Member #${String(memberNumber).padStart(3, '0')}.

This isn't a brand. It's a representation of us — people who come from the same place, building something real from nothing.

You're not a customer now. You're part of this. And members go first — 48 hours before anyone else, on every drop.

Drop 002 is coming. August 2026.

Stay close. Big things are being built — and you're part of it.

truevisionproject.com

— True Vision Project
Wexford / Ireland — Bergamo / Italy

---
You signed up at truevisionproject.com. Unsubscribe anytime: ${unsubUrl}`,
  }).catch(() => {})

  return res.status(200).json({ userId, name: normalisedName, memberNumber })
}
