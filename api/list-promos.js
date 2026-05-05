import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'BUILTFROMNOTHING2026'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { password } = req.body ?? {}
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const list = await stripe.promotionCodes.list({ limit: 100, expand: ['data.coupon'] })

    const promos = list.data.map(p => ({
      id:             p.id,
      code:           p.code,
      promoter:       p.metadata?.promoter || '—',
      percentOff:     p.coupon?.percent_off || 0,
      active:         p.active,
      maxRedemptions: p.max_redemptions,
      timesRedeemed:  p.times_redeemed,
      created:        new Date(p.created * 1000).toISOString(),
    }))

    return res.status(200).json({ promos })
  } catch (err) {
    console.error('list-promos error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
