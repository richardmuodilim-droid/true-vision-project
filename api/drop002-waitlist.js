import { kv } from '@vercel/kv'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, name } = req.body ?? {}

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required.' })
  }

  const normalised   = email.toLowerCase().trim()
  const normalisedName = (name ?? '').trim()
  const firstName    = normalisedName.split(' ')[0] || 'there'
  const capName      = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()

  const key     = 'tvp:drop002:waitlist'
  const already = await kv.sismember(key, normalised)
  if (!already) {
    await kv.sadd(key, normalised)
  }

  await resend.emails.send({
    from: 'True Vision Project <archive@truevisionproject.com>',
    to: normalised,
    replyTo: 'archive@truevisionproject.com',
    subject: `You're in — part of something that matters`,
    text: `${capName},

You're in. Not just a waitlist. A movement.

Drop 001 was the first proof. 24 units. Sold out in 24 hours. No ads.

Drop 002 is the next proof that representation works. That building from nothing, together, is real.

When you wear this tracksuit, you're saying: I'm part of this mission.

August 2026 — The Tracksuit launches. You'll go first.

truevisionproject.com/drop-002

— True Vision Project

---
You joined Drop 002 waitlist at truevisionproject.com. Reply DELETE to be removed.`,
  }).catch(() => {})

  return res.status(200).json({ ok: true, alreadyRegistered: !!already })
}
