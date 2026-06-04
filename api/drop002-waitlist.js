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
    subject: `You're on the list — Drop 002`,
    text: `${capName},

You're on the list for Drop 002.

The Tracksuit. Three colourways. Hidden pocket. August 2026.

You'll hear from us before anyone else. When it drops, you'll have the link first.

truevisionproject.com/drop-002

— True Vision Project

---
You joined the waitlist at truevisionproject.com. Reply DELETE to be removed.`,
  }).catch(() => {})

  return res.status(200).json({ ok: true, alreadyRegistered: !!already })
}
