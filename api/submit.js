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
    from: 'True Vision Project <archive@truevisionproject.com>',
    to: normalised,
    replyTo: 'archive@truevisionproject.com',
    subject: `${capName} — you're in the archive`,
    headers: {
      'List-Unsubscribe': '<mailto:archive@truevisionproject.com?subject=unsubscribe>',
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
    text: `Welcome to the True Vision Project Archive, ${capName}.

You are now Member #${String(memberNumber).padStart(3, '0')}.
Member ID: ${userId}

This isn't a brand. It's a statement.

Two people. Two small towns. One shared belief that you don't need permission to build something real.

Drop 001 — The Foundation Cap
300GSM washed chino twill. Made between Ireland and Italy. No restock.

Enter the Archive: https://www.truevisionproject.com

Add archive@truevisionproject.com to your contacts to make sure you get the drop notification.

— Richard, True Vision Project

You received this because you registered at truevisionproject.com.
To unsubscribe reply with DELETE to archive@truevisionproject.com`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <meta name="x-apple-disable-message-reformatting"/>
  <title>True Vision Project</title>
  <style>
    @media only screen and (max-width:600px){
      .outer{padding:0 !important;}
      .inner{padding:32px 20px !important;}
      .hero-text{font-size:28px !important;}
      .body-text{font-size:15px !important;}
      .id-card{padding:24px 20px !important;}
      .cta-btn{display:block !important;text-align:center !important;}
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;" class="outer">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#111111;border:1px solid #222222;border-radius:2px;">

          <!-- Header -->
          <tr>
            <td style="padding:20px 40px;border-bottom:1px solid #1a1a1a;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:11px;color:#ffffff;letter-spacing:0.4em;text-transform:uppercase;">TRUE VISION PROJECT</p>
                  </td>
                  <td align="right">
                    <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:10px;color:#444444;letter-spacing:0.2em;">ARCHIVE — 001</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td align="center" style="padding:56px 40px 40px;" class="inner">
              <p style="margin:0 0 16px;font-family:'Courier New',Courier,monospace;font-size:10px;color:#555555;letter-spacing:0.5em;text-transform:uppercase;">— MEMBER CONFIRMED —</p>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:36px;color:#ffffff;font-style:italic;line-height:1.25;letter-spacing:0.01em;" class="hero-text">
                Welcome to the family,<br/>${capName}.
              </p>
            </td>
          </tr>

          <!-- Divider line -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:#1e1e1e;"></div>
            </td>
          </tr>

          <!-- Personal message -->
          <tr>
            <td style="padding:40px 40px;" class="inner">
              <p style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:17px;color:#cccccc;line-height:1.8;font-style:italic;" class="body-text">
                This isn't a brand. It's a statement.
              </p>
              <p style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#999999;line-height:1.9;" class="body-text">
                Two people. Two small towns. One shared belief that you don't need permission to build something real. True Vision Project exists because we got tired of waiting.
              </p>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#cccccc;line-height:1.9;" class="body-text">
                You joined early. You're not a customer — <em>you're the foundation.</em> Every person in this archive is part of what this becomes.
              </p>
            </td>
          </tr>

          <!-- Identity card -->
          <tr>
            <td style="padding:0 40px 40px;" class="inner">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid #222222;" class="id-card">
                <tr>
                  <td style="padding:32px 32px;" class="id-card">

                    <p style="margin:0 0 24px;font-family:'Courier New',Courier,monospace;font-size:11px;color:#666666;letter-spacing:0.4em;text-transform:uppercase;">YOUR MEMBER IDENTITY</p>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:14px 0;border-bottom:1px solid #1a1a1a;">
                          <p style="margin:0 0 4px;font-family:'Courier New',Courier,monospace;font-size:11px;color:#666666;letter-spacing:0.25em;text-transform:uppercase;">Name</p>
                          <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:16px;color:#ffffff;letter-spacing:0.08em;">${normalisedName || capName}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 0;border-bottom:1px solid #1a1a1a;">
                          <p style="margin:0 0 4px;font-family:'Courier New',Courier,monospace;font-size:11px;color:#666666;letter-spacing:0.25em;text-transform:uppercase;">Member ID</p>
                          <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:16px;color:#aaaaaa;letter-spacing:0.15em;">${userId}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 0;">
                          <p style="margin:0 0 4px;font-family:'Courier New',Courier,monospace;font-size:11px;color:#666666;letter-spacing:0.25em;text-transform:uppercase;">Member Number</p>
                          <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:16px;color:#666666;letter-spacing:0.1em;">#${String(memberNumber).padStart(3, '0')}</p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's next -->
          <tr>
            <td style="padding:0 40px;" class="inner">
              <div style="height:1px;background:#1e1e1e;margin-bottom:40px;"></div>
              <p style="margin:0 0 24px;font-family:'Courier New',Courier,monospace;font-size:11px;color:#666666;letter-spacing:0.4em;text-transform:uppercase;">WHAT HAPPENS NEXT</p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 0 24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:16px;vertical-align:top;">
                          <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:18px;color:#333333;">01</p>
                        </td>
                        <td>
                          <p style="margin:0 0 4px;font-family:'Courier New',Courier,monospace;font-size:12px;color:#ffffff;letter-spacing:0.15em;text-transform:uppercase;">DROP 001 — THE FOUNDATION CAP</p>
                          <p style="margin:0;font-family:Georgia,serif;font-size:14px;color:#666666;line-height:1.7;">300GSM washed chino twill. Made between Ireland and Italy. No restock. No compromise.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:16px;vertical-align:top;">
                          <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:18px;color:#333333;">02</p>
                        </td>
                        <td>
                          <p style="margin:0 0 4px;font-family:'Courier New',Courier,monospace;font-size:12px;color:#ffffff;letter-spacing:0.15em;text-transform:uppercase;">YOU GET ACCESS FIRST</p>
                          <p style="margin:0;font-family:Georgia,serif;font-size:14px;color:#666666;line-height:1.7;">When the drop opens, archive members are notified before anyone else. No queue. No scramble.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:16px;vertical-align:top;">
                          <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:18px;color:#333333;">03</p>
                        </td>
                        <td>
                          <p style="margin:0 0 4px;font-family:'Courier New',Courier,monospace;font-size:12px;color:#ffffff;letter-spacing:0.15em;text-transform:uppercase;">BRING SOMEONE IN</p>
                          <p style="margin:0;font-family:Georgia,serif;font-size:14px;color:#666666;line-height:1.7;">This family grows through people, not ads. If someone deserves to be here — bring them.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding:40px 40px 0;" class="inner">
              <a href="https://www.truevisionproject.com" target="_blank" style="display:inline-block;padding:18px 48px;background:#ffffff;color:#000000;font-family:'Courier New',Courier,monospace;font-size:12px;letter-spacing:0.3em;text-transform:uppercase;text-decoration:none;" class="cta-btn">
                ENTER THE ARCHIVE
              </a>
            </td>
          </tr>

          <!-- Share block -->
          <tr>
            <td style="padding:40px 40px;" class="inner">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#161616;border:1px solid #222222;">
                <tr>
                  <td style="padding:28px 28px;">
                    <p style="margin:0 0 8px;font-family:'Courier New',Courier,monospace;font-size:11px;color:#ffffff;letter-spacing:0.3em;text-transform:uppercase;">Know someone who belongs here?</p>
                    <p style="margin:0 0 20px;font-family:Georgia,serif;font-size:15px;color:#888888;line-height:1.8;">This family grows through people, not ads. Send them to the archive — spots are limited and we never restock.</p>
                    <a href="https://www.truevisionproject.com" target="_blank" style="font-family:'Courier New',Courier,monospace;font-size:11px;color:#aaaaaa;letter-spacing:0.2em;text-decoration:none;">
                      → truevisionproject.com
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Instagram follow -->
          <tr>
            <td align="center" style="padding:0 40px 40px;" class="inner">
              <a href="https://www.instagram.com/truevisionproject/" target="_blank" style="display:inline-table;text-decoration:none;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="border:1px solid #2a2a2a;background:#161616;">
                  <tr>
                    <td style="padding:16px 28px;">
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-right:12px;vertical-align:middle;">
                            <!-- Instagram SVG icon -->
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
                              <rect x="2" y="2" width="20" height="20" rx="6" stroke="#888888" stroke-width="1.5"/>
                              <circle cx="12" cy="12" r="4" stroke="#888888" stroke-width="1.5"/>
                              <circle cx="17" cy="7" r="1" fill="#888888"/>
                            </svg>
                          </td>
                          <td style="vertical-align:middle;">
                            <p style="margin:0 0 2px;font-family:'Courier New',Courier,monospace;font-size:10px;color:#555555;letter-spacing:0.2em;text-transform:uppercase;">Follow us</p>
                            <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:13px;color:#aaaaaa;letter-spacing:0.1em;">@truevisionproject</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </a>
            </td>
          </tr>

          <!-- Quote -->
          <tr>
            <td align="center" style="padding:0 40px 48px;border-top:1px solid #1a1a1a;" class="inner">
              <p style="margin:40px 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#333333;font-style:italic;line-height:1.8;">
                "Two small towns. One fire.<br/>Built from nothing."
              </p>
              <p style="margin:20px 0 0;font-family:'Courier New',Courier,monospace;font-size:11px;color:#444444;letter-spacing:0.2em;text-transform:uppercase;">
                Richard — True Vision Project
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #1a1a1a;background:#0a0a0a;" class="inner">
              <p style="margin:0 0 12px;font-family:'Courier New',Courier,monospace;font-size:11px;color:#555555;line-height:1.9;border:1px solid #1e1e1e;padding:14px 16px;">
                To make sure you don't miss Drop 001 — add <strong style="color:#888888;">archive@truevisionproject.com</strong> to your contacts now.
              </p>
              <p style="margin:0 0 10px;font-family:'Courier New',Courier,monospace;font-size:11px;color:#444444;line-height:1.9;">
                You're receiving this because you registered at <a href="https://www.truevisionproject.com" style="color:#666666;">truevisionproject.com</a>.<br/>
                To remove your data: reply with "DELETE" or email <a href="mailto:archive@truevisionproject.com" style="color:#666666;">archive@truevisionproject.com</a>
              </p>
              <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:10px;color:#2a2a2a;letter-spacing:0.1em;">
                TVP &nbsp;·&nbsp; truevisionproject.com &nbsp;·&nbsp; Ireland
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
