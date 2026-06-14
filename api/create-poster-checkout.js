import { kv } from '@vercel/kv'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, name, posters, total } = req.body ?? {}

  if (!email || !name || !posters || !total) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  try {
    const POSTER_PRICES = {
      map: 1200,       // €12.00 in cents
      numbers: 1200,
      statement: 1200,
    }

    const lineItems = Object.entries(posters)
      .filter(([_, qty]) => qty > 0)
      .map(([posterId, qty]) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: posterId === 'map' ? 'The Map Poster' : posterId === 'numbers' ? 'The Numbers Poster' : 'The Statement Poster',
            description: 'Limited edition TVP poster series',
          },
          unit_amount: POSTER_PRICES[posterId] || 1200,
        },
        quantity: qty,
      }))

    // Add shipping
    lineItems.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Shipping',
          description: 'International shipping (2-3 business days)',
        },
        unit_amount: 300, // €3.00
      },
      quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: lineItems,
      success_url: `${process.env.VERCEL_URL || 'https://truevisionproject.com'}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VERCEL_URL || 'https://truevisionproject.com'}/posters`,
      metadata: {
        email,
        name,
        posters: JSON.stringify(posters),
        type: 'poster_order',
      },
    })

    // Store order info temporarily (will be finalized on success)
    await kv.setex(`poster-order:${session.id}`, 3600, JSON.stringify({
      email,
      name,
      posters,
      total,
      timestamp: new Date().toISOString(),
    }))

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    return res.status(500).json({ error: 'Checkout failed. Try again.' })
  }
}
