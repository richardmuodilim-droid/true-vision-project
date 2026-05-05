import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend  = new Resend(process.env.RESEND_API_KEY)

const BUSINESS_EMAIL = 'truevisionstore2@gmail.com'
const FROM_ADDRESS   = 'True Vision Project <archive@truevisionproject.com>'

function calcShipping(total, items) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const amount   = parseFloat(total) - subtotal
  return amount > 0.01 ? `€${amount.toFixed(2)}` : 'Free'
}

function addressText(shipping) {
  if (!shipping) return 'Provided at checkout'
  const a = shipping.address
  return [
    shipping.name,
    a.line1,
    a.line2 || null,
    `${a.city}${a.state ? ', ' + a.state : ''} ${a.postal_code}`,
    a.country,
  ].filter(Boolean).join('\n')
}

function addressHtml(shipping) {
  if (!shipping) return 'Provided at checkout'
  const a = shipping.address
  return [
    shipping.name,
    a.line1,
    a.line2 || null,
    `${a.city}${a.state ? ', ' + a.state : ''} ${a.postal_code}`,
    a.country,
  ].filter(Boolean).join('<br>')
}

// ─── Customer email ──────────────────────────────────────────────────────────

function customerEmailHtml({ ref, email, items, shipping, total }) {
  const shippingCost = calcShipping(total, items)

  const itemRows = items.map(item => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #eeebe6;font-family:'Courier New',monospace;font-size:12px;color:#333;letter-spacing:0.03em;">
        ${item.name}${item.variant ? ' — ' + item.variant : ''}
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #eeebe6;font-family:'Courier New',monospace;font-size:12px;color:#666;text-align:right;white-space:nowrap;">
        x${item.qty} &nbsp; €${(item.price * item.qty).toFixed(2)}
      </td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<meta name="google" content="notranslate">
<title>Order Confirmed — TVP-${ref}</title>
<style>
  :root { color-scheme: light; }
  body, .body-wrap { background-color: #f5f3ee !important; }
  .card { background-color: #ffffff !important; }
  * { -webkit-text-size-adjust: 100%; }
</style>
</head>
<body class="body-wrap" style="margin:0;padding:0;background:#f5f3ee;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ee;padding:48px 16px;">
<tr><td align="center">
<table class="card" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #e0ddd8;">

  <tr><td style="padding:36px 40px 28px;border-bottom:1px solid #eeebe6;">
    <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.44em;color:#bbb;text-transform:uppercase;">True Vision Project</p>
    <p style="margin:0;font-family:Georgia,serif;font-size:26px;color:#111;font-style:italic;line-height:1.2;">Order Confirmed.</p>
  </td></tr>

  <tr><td style="padding:32px 40px 0;">
    <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:10px;color:#999;letter-spacing:0.08em;">
      Reference: <strong style="color:#444;letter-spacing:0.12em;">TVP-${ref}</strong>
    </p>
    <p style="margin:12px 0 28px;font-size:14px;color:#888;line-height:1.75;">
      Thank you for your order. A copy of this confirmation has been sent to <strong style="color:#555;">${email}</strong>.
    </p>
  </td></tr>

  <tr><td style="padding:0 40px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td colspan="2" style="padding-bottom:12px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.4em;color:#bbb;text-transform:uppercase;border-bottom:1px solid #eeebe6;">Items Ordered</td></tr>
      ${itemRows}
      <tr>
        <td style="padding:10px 0 4px;font-family:'Courier New',monospace;font-size:9px;color:#bbb;letter-spacing:0.2em;text-transform:uppercase;">Shipping</td>
        <td style="padding:10px 0 4px;font-family:'Courier New',monospace;font-size:11px;color:#aaa;text-align:right;">${shippingCost}</td>
      </tr>
      <tr>
        <td style="padding:14px 0 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.26em;color:#555;text-transform:uppercase;border-top:1px solid #eeebe6;">Total Paid</td>
        <td style="padding:14px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:18px;font-weight:300;color:#111;text-align:right;border-top:1px solid #eeebe6;">€${total}</td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 40px 28px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:16px 20px;background:#f9f8f6;border:1px solid #eeebe6;">
        <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.4em;color:#bbb;text-transform:uppercase;">Ships To</p>
        <p style="margin:0;font-size:13px;color:#555;line-height:1.9;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;">
          ${shipping ? addressHtml(shipping) : 'Your shipping address was collected at checkout.<br>Questions? Reply to this email.'}
        </p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 40px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding-bottom:12px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.4em;color:#bbb;text-transform:uppercase;">What Happens Next</td></tr>
      ${[
        ['01', 'Your order is being carefully prepared and packaged.'],
        ['02', 'You will receive a shipping notification with your tracking number once dispatched.'],
        ['03', 'Estimated delivery: 3 to 7 business days depending on your location.'],
      ].map(([n, t]) => `
      <tr><td style="padding:10px 0;border-bottom:1px solid #f5f3ee;">
        <span style="font-family:'Courier New',monospace;font-size:9px;color:#ccc;margin-right:14px;">${n}</span>
        <span style="font-size:12px;color:#888;">${t}</span>
      </td></tr>`).join('')}
    </table>
  </td></tr>

  <tr><td style="padding:0 40px 32px;">
    <p style="margin:0;font-size:12px;color:#bbb;line-height:1.9;">
      Questions? Contact us at <a href="mailto:archive@truevisionproject.com" style="color:#777;text-decoration:underline;">archive@truevisionproject.com</a>
    </p>
  </td></tr>

  <tr><td style="padding:20px 40px;border-top:1px solid #eeebe6;">
    <p style="margin:0;font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.24em;color:#ccc;text-transform:uppercase;">
      True Vision Project &nbsp;·&nbsp; Wexford, Ireland &nbsp;·&nbsp; Built From Nothing
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

function customerEmailText({ ref, email, items, shipping, total }) {
  const shippingCost = calcShipping(total, items)
  const itemLines = items.map(i => `  ${i.name}${i.variant ? ' - ' + i.variant : ''} x${i.qty}  €${(i.price * i.qty).toFixed(2)}`).join('\n')
  const addr = addressText(shipping)
  return `TRUE VISION PROJECT — ORDER CONFIRMED
======================================

Reference: TVP-${ref}
Confirmation sent to: ${email}

ITEMS ORDERED
-------------
${itemLines}

Shipping: ${shippingCost}
Total Paid: €${total}

${shipping ? `SHIPS TO\n--------\n${addr}\n` : ''}
WHAT HAPPENS NEXT
-----------------
01  Your order is being carefully prepared and packaged.
02  You will receive a shipping notification with your tracking number once dispatched.
03  Estimated delivery: 3 to 7 business days depending on your location.

Questions? Email us: archive@truevisionproject.com

True Vision Project · Wexford, Ireland · Built From Nothing
`
}

// ─── Internal notification ────────────────────────────────────────────────────

function internalEmailHtml({ ref, email, items, shipping, total, sessionId }) {
  const itemList = items.map(i =>
    `<tr>
      <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-family:'Courier New',monospace;font-size:12px;color:#ddd;">
        ${i.name}${i.variant ? ' — ' + i.variant : ''} &nbsp;<span style="color:#555;">x${i.qty}</span>
      </td>
      <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-family:'Courier New',monospace;font-size:12px;color:#888;text-align:right;">
        €${(i.price * i.qty).toFixed(2)}
      </td>
    </tr>`
  ).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Order TVP-${ref}</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Courier New',monospace;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#111111;border:1px solid #1e1e1e;">

  <tr><td style="padding:24px 32px 20px;border-bottom:1px solid #1e1e1e;">
    <p style="margin:0 0 6px;font-size:9px;letter-spacing:0.42em;color:#444;text-transform:uppercase;">TVP Order Notification</p>
    <p style="margin:0;font-size:18px;color:#22c55e;letter-spacing:0.06em;font-weight:normal;">New Order — TVP-${ref}</p>
  </td></tr>

  <tr><td style="padding:24px 32px;">

    <p style="margin:0 0 4px;font-size:8px;letter-spacing:0.32em;color:#444;text-transform:uppercase;">Customer</p>
    <p style="margin:0 0 6px;font-size:14px;color:#eeeeee;">${email}</p>
    ${shipping?.name ? `<p style="margin:0 0 24px;font-size:13px;color:#888;">${shipping.name}</p>` : '<p style="margin:0 0 24px;"></p>'}

    ${shipping ? `
    <p style="margin:0 0 4px;font-size:8px;letter-spacing:0.32em;color:#444;text-transform:uppercase;">Ship To</p>
    <p style="margin:0 0 24px;font-size:13px;color:#aaa;line-height:1.9;white-space:pre-line;">${addressText(shipping)}</p>
    ` : ''}

    <p style="margin:0 0 4px;font-size:8px;letter-spacing:0.32em;color:#444;text-transform:uppercase;">Items</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${itemList}
    </table>

    <p style="margin:0 0 4px;font-size:8px;letter-spacing:0.32em;color:#444;text-transform:uppercase;">Total Charged</p>
    <p style="margin:0 0 24px;font-size:22px;color:#22c55e;font-weight:normal;">€${total}</p>

    <p style="margin:0 0 4px;font-size:8px;letter-spacing:0.32em;color:#333;text-transform:uppercase;">Stripe Session</p>
    <p style="margin:0;font-size:10px;color:#333;word-break:break-all;">${sessionId}</p>

  </td></tr>

  <tr><td style="padding:14px 32px;border-top:1px solid #1e1e1e;">
    <p style="margin:0;font-size:8px;color:#2a2a2a;letter-spacing:0.18em;text-transform:uppercase;">
      TVP &nbsp;·&nbsp; ${new Date().toUTCString()}
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

function internalEmailText({ ref, email, items, shipping, total, sessionId }) {
  const itemLines = items.map(i => `  ${i.name}${i.variant ? ' - ' + i.variant : ''} x${i.qty}  €${(i.price * i.qty).toFixed(2)}`).join('\n')
  const addr = addressText(shipping)
  return `NEW ORDER — TVP-${ref}
========================

CUSTOMER
--------
${email}${shipping?.name ? '\n' + shipping.name : ''}

${shipping ? `SHIP TO\n-------\n${addr}\n` : ''}
ITEMS ORDERED
-------------
${itemLines}

Total Charged: €${total}

Stripe Session: ${sessionId}

TVP · ${new Date().toUTCString()}
`
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { session_id } = req.body ?? {}
  if (!session_id) return res.status(400).json({ error: 'Missing session_id' })

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'line_items.data.price.product'],
    })

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' })
    }

    const email    = session.customer_email || session.customer_details?.email || ''
    const shipping = session.shipping_details
      ? { name: session.shipping_details.name, address: session.shipping_details.address }
      : null
    const total = (session.amount_total / 100).toFixed(2)
    const ref   = session_id.slice(-8).toUpperCase()

    const rawItems = (session.line_items?.data ?? []).filter(li =>
      !(li.description || '').toLowerCase().includes('shipping')
    )

    const items = rawItems.map(li => ({
      name:    li.description || 'Item',
      variant: li.price?.product?.description || '',
      qty:     li.quantity,
      price:   li.amount_total / 100 / li.quantity,
    }))

    const emailPromises = []

    if (email) {
      emailPromises.push(
        resend.emails.send({
          from:    FROM_ADDRESS,
          to:      email,
          replyTo: 'archive@truevisionproject.com',
          subject: `Your order is confirmed — TVP-${ref}`,
          html:    customerEmailHtml({ ref, email, items, shipping, total }),
          text:    customerEmailText({ ref, email, items, shipping, total }),
        }).catch(err => console.error('Customer email error:', err.message))
      )
    }

    emailPromises.push(
      resend.emails.send({
        from:    FROM_ADDRESS,
        to:      BUSINESS_EMAIL,
        replyTo: email || 'archive@truevisionproject.com',
        subject: `New order TVP-${ref} — €${total}${shipping?.name ? ' — ' + shipping.name : ''}`,
        html:    internalEmailHtml({ ref, email, items, shipping, total, sessionId: session_id }),
        text:    internalEmailText({ ref, email, items, shipping, total, sessionId: session_id }),
      }).catch(err => console.error('Internal email error:', err.message))
    )

    await Promise.all(emailPromises)

    return res.status(200).json({ ref, email, items, shipping, total })
  } catch (err) {
    console.error('order-confirm error:', err.message)
    return res.status(500).json({ error: 'Could not confirm order' })
  }
}
