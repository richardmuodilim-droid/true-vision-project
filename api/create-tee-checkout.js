import { kv } from '@vercel/kv'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PRICE_CENTS = 2500   // €25.00 per tee
const SHIP_CENTS  = 600    // €6.00 per unit (TVP shipping rule: qty × €6)
const SITE = 'https://truevisionproject.com'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, name, colour, size, qty } = req.body ?? {}
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' })
  if (!size) return res.status(400).json({ error: 'Size required' })

  const quantity = Math.max(1, Math.min(10, parseInt(qty, 10) || 1))
  const colourLabel = colour === 'cream' ? 'Cream' : 'Black'

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `The Tee — ${colourLabel} (${size})`,
              description: 'True Vision Project — TVP-TEE-001. Heavyweight cotton.',
            },
            unit_amount: PRICE_CENTS,
          },
          quantity,
        },
        {
          price_data: {
            currency: 'eur',
            product_data: { name: 'Shipping', description: 'Ships in 3–5 days' },
            unit_amount: SHIP_CENTS,
          },
          quantity,
        },
      ],
      success_url: `${SITE}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE}/tee`,
      metadata: {
        type: 'tee_order',
        email, name: name ?? '', colour: colourLabel, size, qty: String(quantity),
      },
    })

    await kv.setex(`tee-order:${session.id}`, 3600, JSON.stringify({
      email, name: name ?? '', colour: colourLabel, size, qty: quantity,
      timestamp: new Date().toISOString(),
    }))

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe tee checkout error:', err)
    return res.status(500).json({ error: 'Checkout failed. Try again.' })
  }
}
