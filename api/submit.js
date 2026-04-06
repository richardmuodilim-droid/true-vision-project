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
  const capName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
  await resend.emails.send({
    from: 'archive@truevisionproject.com',
    to: normalised,
    subject: `You're one of us now, ${capName} — TRUE VISION PROJECT`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>True Vision Project — You're In</title>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:'Courier New',Courier,monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:48px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#000000;border:1px solid rgba(255,255,255,0.07);">

          <!-- Top bar -->
          <tr>
            <td style="padding:14px 32px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:7px;color:#444444;letter-spacing:0.3em;text-transform:uppercase;">
                TRUE VISION PROJECT &nbsp;/&nbsp; MEMBER CONFIRMATION
              </p>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td align="center" style="padding:56px 32px 40px;">
              <p style="margin:0 0 20px;font-size:10px;color:#555555;letter-spacing:0.5em;text-transform:uppercase;">
                — WELCOME TO THE FAMILY —
              </p>
              <p style="margin:0;font-size:32px;color:#ffffff;font-family:Georgia,serif;font-style:italic;line-height:1.3;letter-spacing:0.02em;">
                You belong here,<br/>${capName}.
              </p>
            </td>
          </tr>

          <!-- Personal message -->
          <tr>
            <td style="padding:0 40px 48px;">
              <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.6);font-family:Georgia,serif;font-style:italic;line-height:2;text-align:center;">
                This isn't just a clothing brand. It's a movement built by two people<br/>
                from two small towns who refused to wait for permission.<br/><br/>
                You joined early. That means something to us.<br/>
                You are not a customer — you are part of what this becomes.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px 40px;">
              <div style="width:100%;height:1px;background:rgba(255,255,255,0.06);"></div>
            </td>
          </tr>

          <!-- Member ID block -->
          <tr>
            <td style="padding:0 32px 40px;">
              <table cellpadding="0" cellspacing="0" style="width:100%;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02);">
                <tr>
                  <td style="padding:28px 28px;">
                    <p style="margin:0 0 4px;font-size:7px;color:#444444;letter-spacing:0.4em;text-transform:uppercase;">
                      YOUR IDENTITY
                    </p>
                    <p style="margin:0 0 24px;font-size:11px;color:#888888;letter-spacing:0.1em;line-height:1.8;">
                      Keep this. It's yours forever.
                    </p>

                    <p style="margin:0 0 6px;font-size:7px;color:#444444;letter-spacing:0.3em;text-transform:uppercase;">NAME</p>
                    <p style="margin:0 0 20px;font-size:15px;color:#ffffff;letter-spacing:0.1em;">${normalisedName || capName}</p>

                    <p style="margin:0 0 6px;font-size:7px;color:#444444;letter-spacing:0.3em;text-transform:uppercase;">MEMBER ID</p>
                    <p style="margin:0 0 20px;font-size:15px;color:#d0d0d0;letter-spacing:0.2em;">${userId}</p>

                    <p style="margin:0 0 6px;font-size:7px;color:#444444;letter-spacing:0.3em;text-transform:uppercase;">MEMBER NUMBER</p>
                    <p style="margin:0;font-size:15px;color:#888888;letter-spacing:0.15em;">#${String(memberNumber).padStart(3, '0')} of 20</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's coming -->
          <tr>
            <td style="padding:0 32px 12px;">
              <p style="margin:0;font-size:7px;color:#444444;letter-spacing:0.4em;text-transform:uppercase;">
                WHAT'S COMING
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 48px;">
              <table cellpadding="0" cellspacing="0" style="width:100%;">
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                    <p style="margin:0 0 4px;font-size:9px;color:#ffffff;letter-spacing:0.15em;text-transform:uppercase;">DROP 001 — THE FOUNDATION CAP</p>
                    <p style="margin:0;font-size:11px;color:#555555;letter-spacing:0.05em;line-height:1.8;">300GSM washed chino twill. Ireland &amp; Italy. 20 units only.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                    <p style="margin:0 0 4px;font-size:9px;color:#ffffff;letter-spacing:0.15em;text-transform:uppercase;">EARLY ACCESS</p>
                    <p style="margin:0;font-size:11px;color:#555555;letter-spacing:0.05em;line-height:1.8;">You'll be notified before anyone else. No waiting in line.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0;">
                    <p style="margin:0 0 4px;font-size:9px;color:#ffffff;letter-spacing:0.15em;text-transform:uppercase;">YOUR WORD MATTERS</p>
                    <p style="margin:0;font-size:11px;color:#555555;letter-spacing:0.05em;line-height:1.8;">Tell one person you trust. This family grows through people, not ads.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td align="center" style="padding:0 40px 56px;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:40px 0 8px;font-size:18px;color:rgba(255,255,255,0.2);font-family:Georgia,serif;font-style:italic;line-height:1.9;">
                "Two small towns. One fire.<br/>Built from nothing."
              </p>
              <p style="margin:20px 0 0;font-size:9px;color:#444444;letter-spacing:0.2em;text-transform:uppercase;">
                — Richard &amp; the TVP Family
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:7px;color:#2a2a2a;letter-spacing:0.2em;text-transform:uppercase;">
                TRUE VISION PROJECT &nbsp;// &nbsp;truevisionproject.com &nbsp;// &nbsp;archive@truevisionproject.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  }).catch(() => {})

  return res.status(200).json({ userId, name: normalisedName, memberNumber })
}
