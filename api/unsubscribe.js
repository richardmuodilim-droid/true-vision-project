import { kv } from '@vercel/kv'

// One-click unsubscribe endpoint.
// Required by Gmail/Yahoo/Microsoft for bulk senders (List-Unsubscribe header).
// GET  -> shows a confirmation page (browser click)
// POST -> one-click unsubscribe from the mail client, returns 200 blank

const PAGE = (message) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>True Vision Project</title>
<style>
  html,body{margin:0;height:100%;background:#F5F3EE;color:#111}
  body{display:flex;align-items:center;justify-content:center;font-family:'Space Mono',ui-monospace,monospace}
  .box{text-align:center;padding:40px;max-width:420px}
  h1{font-family:Georgia,'Cormorant Garamond',serif;font-weight:400;font-size:28px;margin:0 0 18px}
  p{font-size:12px;letter-spacing:0.04em;line-height:1.9;color:rgba(0,0,0,0.55)}
  a{color:#111}
</style>
</head>
<body>
  <div class="box">
    <h1>${message}</h1>
    <p>True Vision Project — built from nothing.<br/>
    <a href="https://truevisionproject.com">truevisionproject.com</a></p>
  </div>
</body>
</html>`

async function suppress(email) {
  const normalised = email.toLowerCase().trim()
  // Add to suppression list — checked before every send
  await kv.sadd('tvp:unsubscribed', normalised)
  // Remove from active lists so broadcasts/updates skip them
  await kv.srem('tvp:drop002:waitlist', normalised)
  await kv.hdel('tvp:emails', normalised)
  return normalised
}

export default async function handler(req, res) {
  const email = (req.query?.email || req.body?.email || '').toString()

  // One-click unsubscribe (mail client POST) — must return 200/202 quickly
  if (req.method === 'POST') {
    if (email) { try { await suppress(email) } catch {} }
    res.setHeader('Content-Type', 'text/plain')
    return res.status(200).send('')
  }

  // Browser click (GET)
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(200).send(PAGE('Invalid unsubscribe link.'))
    }
    try {
      await suppress(email)
      return res.status(200).send(PAGE("You're unsubscribed."))
    } catch {
      return res.status(200).send(PAGE('Something went wrong. Email us to be removed.'))
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
