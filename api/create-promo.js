import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { password, promoterName, code, percentOff, maxRedemptions } = req.body ?? {}

  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (!promoterName || !code || !percentOff) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const pct = parseInt(percentOff, 10)
  if (isNaN(pct) || pct < 1 || pct > 100) {
    return res.status(400).json({ error: 'Discount must be 1–100%' })
  }

  const max = parseInt(maxRedemptions, 10) || 50

  try {
    const coupon = await stripe.coupons.create({
      percent_off: pct,
      duration: 'once',
      name: `${promoterName} — ${pct}% off`,
      metadata: { promoter: promoterName },
    })

    const promoCode = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: code.toUpperCase().replace(/\s+/g, ''),
      max_redemptions: max,
      metadata: { promoter: promoterName },
    })

    return res.status(200).json({
      id:             promoCode.id,
      code:           promoCode.code,
      promoter:       promoterName,
      percentOff:     pct,
      maxRedemptions: max,
      timesRedeemed:  0,
    })
  } catch (err) {
    console.error('create-promo error:', err.message)
    if (err.message?.includes('already exists')) {
      return res.status(409).json({ error: 'That code already exists. Try a different one.' })
    }
    return res.status(500).json({ error: err.message })
  }
}
