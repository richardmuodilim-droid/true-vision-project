import { kv } from '@vercel/kv'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

// Send a plain-text update to the whole movement.
// - Admin password protected
// - Skips anyone on the suppression list (unsubscribed)
// - Adds one-click List-Unsubscribe header to every send (deliverability)
// - Personalises with first name, rate-limited to protect sender reputation
//
// Body: { password, subject, message, test? }
//   message supports {NAME} -> recipient first name
//   test: if an email string is provided, send only to that address (preview)

function capFirst(name) {
  const first = (name ?? '').trim().split(/\s+/)[0] || 'there'
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase()
}

function buildEmail({ email, name }, subject, message) {
  const unsubUrl = `https://truevisionproject.com/api/unsubscribe?email=${encodeURIComponent(email)}`
  const body = message.replace(/\{NAME\}/g, capFirst(name))
  return {
    from: 'True Vision Project <archive@truevisionproject.com>',
    to: email,
    replyTo: 'archive@truevisionproject.com',
    subject,
    headers: {
      'List-Unsubscribe': `<${unsubUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
    text: `${body}

— True Vision Project
Wexford / Ireland — Bergamo / Italy

---
You're a member of True Vision Project. Unsubscribe anytime: ${unsubUrl}`,
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { password, subject, message, test } = req.body ?? {}
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorised' })
  if (!subject || !message) return res.status(400).json({ error: 'subject and message required' })

  // Test send — single address, no list touched
  if (test) {
    try {
      await resend.emails.send(buildEmail({ email: test, name: 'Member' }, subject, message))
      return res.status(200).json({ test: true, sentTo: test })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  const rawMembers = await kv.lrange('tvp:members', 0, -1)
  const members = rawMembers.map(m => (typeof m === 'string' ? JSON.parse(m) : m))

  // Build suppression set once
  const unsubscribed = new Set(await kv.smembers('tvp:unsubscribed'))

  // De-dupe by email + skip suppressed
  const seen = new Set()
  const recipients = []
  for (const m of members) {
    if (!m.email) continue
    const e = m.email.toLowerCase().trim()
    if (seen.has(e) || unsubscribed.has(e)) continue
    seen.add(e)
    recipients.push({ email: e, name: m.name })
  }

  const results = { sent: 0, failed: [] }
  for (const r of recipients) {
    try {
      await resend.emails.send(buildEmail(r, subject, message))
      results.sent += 1
    } catch (err) {
      results.failed.push({ email: r.email, error: err.message })
    }
    await new Promise(res => setTimeout(res, 300)) // protect sender reputation
  }

  return res.status(200).json({
    totalMembers: members.length,
    skippedUnsubscribed: unsubscribed.size,
    recipients: recipients.length,
    sent: results.sent,
    failed: results.failed.length,
    failures: results.failed,
  })
}
