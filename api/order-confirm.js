import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend  = new Resend(process.env.RESEND_API_KEY)

const BUSINESS_EMAIL = 'truevisionstore2@gmail.com'

function customerEmail({ ref, email, items, shipping, total }) {
  const itemRows = items.map(item => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #e8e5e0;font-family:'Courier New',monospace;font-size:12px;color:#333;letter-spacing:0.04em;">
        ${item.name}${item.variant ? ' — ' + item.variant : ''}
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #e8e5e0;font-family:'Courier New',monospace;font-size:12px;color:#666;text-align:right;white-space:nowrap;">
        ×${item.qty} &nbsp; €${(item.price * item.qty).toFixed(2)}
      </td>
    </tr>
  `).join('')

  const shippingBlock = shipping
    ? `${shipping.name}<br>${shipping.address.line1}${shipping.address.line2 ? '<br>' + shipping.address.line2 : ''}<br>${shipping.address.city}${shipping.address.state ? ', ' + shipping.address.state : ''} ${shipping.address.postal_code}<br>${shipping.address.country}`
    : 'Provided at checkout'

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f3ee;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ee;padding:48px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #e0ddd8;">

  <!-- Header -->
  <tr><td style="padding:36px 40px 28px;border-bottom:1px solid #eeebe6;">
    <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.48em;color:#bbb;text-transform:uppercase;">TRUE VISION PROJECT</p>
    <p style="margin:0;font-family:Georgia,serif;font-size:24px;color:#111;font-style:italic;line-height:1.2;">Order Confirmed.</p>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:32px 40px;">

    <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:10px;color:#888;letter-spacing:0.1em;">
      Reference: <strong style="color:#444;">TVP-${ref}</strong>
    </p>
    <p style="margin:0 0 28px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#999;line-height:1.7;">
      A copy of this confirmation has been sent to <strong style="color:#666;">${email}</strong>.
    </p>

    <!-- Items table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr><td colspan="2" style="padding-bottom:12px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.42em;color:#bbb;text-transform:uppercase;border-bottom:1px solid #eeebe6;">
        Items Ordered
      </td></tr>
      ${itemRows}
      <tr>
        <td style="padding:10px 0 4px;font-family:'Courier New',monospace;font-size:9px;color:#bbb;letter-spacing:0.22em;text-transform:uppercase;">Shipping</td>
        <td style="padding:10px 0 4px;font-family:'Courier New',monospace;font-size:11px;color:#aaa;text-align:right;">€6.00</td>
      </tr>
      <tr>
        <td style="padding:14px 0 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.28em;color:#555;text-transform:uppercase;border-top:1px solid #eeebe6;">Total Paid</td>
        <td style="padding:14px 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:18px;font-weight:300;color:#111;text-align:right;border-top:1px solid #eeebe6;">€${total}</td>
      </tr>
    </table>

    <!-- Ship to -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td style="padding:16px 20px;background:#f9f8f6;border:1px solid #eeebe6;">
        <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.42em;color:#bbb;text-transform:uppercase;">Ships To</p>
        <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#666;line-height:1.9;">${shippingBlock}</p>
      </td></tr>
    </table>

    <!-- Next steps -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr><td style="padding-bottom:14px;font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.42em;color:#bbb;text-transform:uppercase;">What Happens Next</td></tr>
      ${[
        ['01', 'Your order is being prepared and carefully packaged.'],
        ['02', 'You\'ll receive a shipping notification with your tracking number.'],
        ['03', 'Estimated delivery: 3–7 business days depending on location.'],
      ].map(([n, t]) => `
      <tr><td style="padding:10px 0;border-bottom:1px solid #f5f3ee;">
        <span style="font-family:'Courier New',monospace;font-size:9px;color:#ccc;margin-right:14px;">${n}</span>
        <span style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#888;">${t}</span>
      </td></tr>`).join('')}
    </table>

    <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#bbb;line-height:1.9;">
      Any questions? Email us: <a href="mailto:archive@truevisionproject.com" style="color:#888;text-decoration:underline;text-underline-offset:3px;">archive@truevisionproject.com</a>
    </p>

  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:20px 40px;border-top:1px solid #eeebe6;">
    <p style="margin:0;font-family:'Courier New',monospace;font-size:8px;letter-spacing:0.28em;color:#ccc;text-transform:uppercase;">
      TRUE VISION PROJECT &nbsp;·&nbsp; WEXFORD / IRELAND &nbsp;·&nbsp; BUILT FROM NOTHING
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

function internalEmail({ ref, email, items, shipping, total, sessionId }) {
  const itemList = items.map(i =>
    `• ${i.name}${i.variant ? ' — ' + i.variant : ''} ×${i.qty} — €${(i.price * i.qty).toFixed(2)}`
  ).join('\n')

  const addr = shipping
    ? `${shipping.name}\n${shipping.address.line1}${shipping.address.line2 ? '\n' + shipping.address.line2 : ''}\n${shipping.address.city}${shipping.address.state ? ', ' + shipping.address.state : ''} ${shipping.address.postal_code}\n${shipping.address.country}`
    : 'Not captured'

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#111;border:1px solid #222;">

  <tr><td style="padding:28px 32px 20px;border-bottom:1px solid #222;">
    <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.45em;color:#444;text-transform:uppercase;">TVP // COMMAND CENTER</p>
    <p style="margin:0;font-family:'Courier New',monospace;font-size:16px;color:#22c55e;letter-spacing:0.1em;">NEW ORDER — TVP-${ref}</p>
  </td></tr>

  <tr><td style="padding:24px 32px;font-family:'Courier New',monospace;font-size:12px;color:#aaa;line-height:2;">
    <p style="margin:0 0 4px;color:#555;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;">Customer</p>
    <p style="margin:0 0 20px;color:#ddd;">${email}</p>

    <p style="margin:0 0 4px;color:#555;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;">Items</p>
    <p style="margin:0 0 20px;color:#ddd;white-space:pre-line;">${itemList}</p>

    <p style="margin:0 0 4px;color:#555;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;">Ship To</p>
    <p style="margin:0 0 20px;color:#ddd;white-space:pre-line;">${addr}</p>

    <p style="margin:0 0 4px;color:#555;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;">Total Paid</p>
    <p style="margin:0 0 20px;color:#22c55e;font-size:18px;">€${total}</p>

    <p style="margin:0 0 4px;color:#555;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;">Stripe Session</p>
    <p style="margin:0;color:#444;font-size:10px;word-break:break-all;">${sessionId}</p>
  </td></tr>

  <tr><td style="padding:16px 32px;border-top:1px solid #222;">
    <p style="margin:0;font-family:'Courier New',monospace;font-size:8px;color:#333;letter-spacing:0.2em;text-transform:uppercase;">
      TVP // ${new Date().toISOString()}
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { session_id } = req.body ?? {}
  if (!session_id) return res.status(400).json({ error: 'Missing session_id' })

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items'],
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

    const rawItems = (session.line_items?.data ?? []).filter(li => {
      const name = li.description || ''
      return !name.toLowerCase().includes('shipping')
    })

    const items = rawItems.map(li => ({
      name:    li.description || 'Item',
      variant: '',
      qty:     li.quantity,
      price:   li.amount_total / 100 / li.quantity,
    }))

    const emailPromises = []

    if (email) {
      emailPromises.push(
        resend.emails.send({
          from:    'Richard @ TVP <archive@truevisionproject.com>',
          to:      email,
          replyTo: 'archive@truevisionproject.com',
          subject: `Order Confirmed — TVP-${ref}`,
          html:    customerEmail({ ref, email, items, shipping, total }),
        }).catch(err => console.error('Customer email error:', err.message))
      )
    }

    emailPromises.push(
      resend.emails.send({
        from:    'TVP Orders <archive@truevisionproject.com>',
        to:      BUSINESS_EMAIL,
        replyTo: email || 'archive@truevisionproject.com',
        subject: `[NEW ORDER] TVP-${ref} — €${total} — ${email}`,
        html:    internalEmail({ ref, email, items, shipping, total, sessionId: session_id }),
      }).catch(err => console.error('Internal email error:', err.message))
    )

    await Promise.all(emailPromises)

    return res.status(200).json({ ref, email, items, shipping, total })
  } catch (err) {
    console.error('order-confirm error:', err.message)
    return res.status(500).json({ error: 'Could not confirm order' })
  }
}
