import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { items, email, meta } = req.body

  if (!items?.length) {
    return res.status(400).json({ error: 'No items in cart' })
  }

  // Clean, filterable order metadata on the Stripe payment (survives even if the
  // customer never reaches the success page — Stripe is the master order list).
  const metadata = {}
  if (meta && typeof meta === 'object') {
    for (const [k, v] of Object.entries(meta)) metadata[k] = String(v).slice(0, 200)
  }
  metadata.summary = items.map(i => `${i.name}${i.color ? ' ' + i.color : ''}${i.size ? ' ' + i.size : ''} x${i.qty}`).join(' | ').slice(0, 490)

  try {
    // Free shipping — no shipping line item added (site-wide free shipping).
    const line_items = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.color ? `${item.color} / ${item.size}` : item.size,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      allow_promotion_codes: true,
      customer_email: email || undefined,
      metadata,
      payment_intent_data: { metadata },
      shipping_address_collection: {
        allowed_countries: [
          'IE','GB','US','CA','AU','NZ',
          'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IT',
          'LV','LI','LT','LU','MT','MC','NL','NO','PL','PT','RO','SK','SI','ES','SE','CH',
          'AE','BH','IL','JO','KW','OM','QA','SA','TR',
          'AR','BO','BR','CL','CO','CR','DO','EC','SV','GT','HN','MX','PA','PY','PE','UY',
          'BD','CN','HK','IN','ID','JP','MY','NP','PK','PH','SG','KR','LK','TW','TH','VN',
          'DZ','EG','GH','KE','MA','NG','ZA','TN','UG','TZ','ZM','ZW',
          'AL','AM','AZ','BY','BA','GE','KZ','KG','MD','MK','RS','UA','UZ',
        ],
      },
      success_url: `${req.headers.origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout`,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err.message)
    res.status(500).json({ error: 'Could not start payment. Please try again.' })
  }
}
