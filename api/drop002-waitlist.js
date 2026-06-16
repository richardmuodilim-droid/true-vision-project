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
  // Explicit signup = re-consent: clear any prior unsubscribe
  await kv.srem('tvp:unsubscribed', normalised)

  const unsubUrl = `https://truevisionproject.com/api/unsubscribe?email=${encodeURIComponent(normalised)}`

  await resend.emails.send({
    from: 'True Vision Project <archive@truevisionproject.com>',
    to: normalised,
    replyTo: 'archive@truevisionproject.com',
    subject: `You're in — part of something that matters`,
    headers: {
      'List-Unsubscribe': `<${unsubUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
    text: `${capName},

You're in. Not just a waitlist. A movement.

This is a representation of us — people building something real from nothing.

Drop 002 is coming. August 2026. The Tracksuit. And you'll go first.

When you wear it, you're saying: I'm part of this.

Stay close. We'll only reach out when it matters.

truevisionproject.com

— True Vision Project
Wexford / Ireland — Bergamo / Italy

---
You joined at truevisionproject.com. Unsubscribe anytime: ${unsubUrl}`,
  }).catch(() => {})

  return res.status(200).json({ ok: true, alreadyRegistered: !!already })
}
