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
  const entry = { email: normalised, name: normalisedName, userId, timestamp, memberNumber }

  await kv.hset('tvp:emails', { [normalised]: JSON.stringify(entry) })
  await kv.lpush('tvp:members', JSON.stringify(entry))

  // Send branded confirmation email (non-blocking)
  const firstName = normalisedName.split(' ')[0] || 'MEMBER'
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: normalised,
    subject: `[ ACCESS GRANTED ] — TRUE VISION PROJECT`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>True Vision Project — Archive Access</title>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:'Courier New',Courier,monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#000000;border:1px solid rgba(255,255,255,0.07);">

          <!-- Top bar -->
          <tr>
            <td style="padding:12px 32px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:7px;color:#555555;letter-spacing:0.25em;text-transform:uppercase;">
                [ TRUE VISION PROJECT ] &nbsp;&nbsp; [ ARCHIVE_MAIL_001 ]
              </p>
            </td>
          </tr>

          <!-- Logo area -->
          <tr>
            <td align="center" style="padding:48px 32px 32px;">
              <p style="margin:0;font-size:11px;color:#ffffff;letter-spacing:0.45em;text-transform:uppercase;">
                TRUE VISION PROJECT
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td align="center" style="padding:0 32px 40px;">
              <div style="width:1px;height:40px;background:rgba(255,255,255,0.1);margin:0 auto;"></div>
            </td>
          </tr>

          <!-- Welcome -->
          <tr>
            <td style="padding:0 32px 12px;">
              <p style="margin:0;font-size:9px;color:rgba(255,255,255,0.35);letter-spacing:0.3em;text-transform:uppercase;">
                [ CLEARANCE CONFIRMED ]
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 40px;">
              <p style="margin:0;font-size:22px;color:#ffffff;letter-spacing:0.05em;line-height:1.4;font-family:Georgia,serif;font-style:italic;">
                Welcome to the Archive,<br/>${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()}.
              </p>
            </td>
          </tr>

          <!-- Member ID block -->
          <tr>
            <td style="padding:0 32px 40px;">
              <table cellpadding="0" cellspacing="0" style="border:1px solid rgba(255,255,255,0.08);width:100%;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 8px;font-size:7px;color:#555555;letter-spacing:0.3em;text-transform:uppercase;">
                      MEMBER ID
                    </p>
                    <p style="margin:0 0 16px;font-size:16px;color:#d0d0d0;letter-spacing:0.15em;">
                      ${userId}
                    </p>
                    <p style="margin:0 0 8px;font-size:7px;color:#555555;letter-spacing:0.3em;text-transform:uppercase;">
                      MEMBER NUMBER
                    </p>
                    <p style="margin:0;font-size:13px;color:#888888;letter-spacing:0.1em;">
                      #${String(memberNumber).padStart(3, '0')}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:0 32px 16px;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:24px 0 0;font-size:7px;color:#444444;letter-spacing:0.4em;text-transform:uppercase;">
                WHAT'S NEXT
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 40px;">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:0.08em;line-height:2;">
                DROP_001 IS IN PRODUCTION.<br/>
                THE FOUNDATION CAP — 300GSM WASHED CHINO TWILL.<br/>
                IRELAND / ITALY. 20 UNITS ONLY.<br/>
                YOU WILL BE NOTIFIED FIRST.
              </p>
            </td>
          </tr>

          <!-- Manifesto line -->
          <tr>
            <td align="center" style="padding:0 32px 48px;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:32px 0 0;font-size:13px;color:rgba(255,255,255,0.25);font-family:Georgia,serif;font-style:italic;line-height:1.8;">
                Two small towns. One fire.<br/>Built from nothing.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:7px;color:#333333;letter-spacing:0.2em;text-transform:uppercase;">
                TVP // ARCHIVE_MAIL // truevisionproject.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  }).catch(() => {}) // Never block the signup if email fails

  return res.status(200).json({ userId, name: normalisedName, memberNumber })
}
