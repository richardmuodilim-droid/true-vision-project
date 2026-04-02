import { kv } from '@vercel/kv'

const ADMIN_PASSWORD = 'BUILTFROMNOTHING2026'

const FINANCIALS = {
  initialInvestment: 500,
  unitCost: 25,
  totalUnits: 20,
  retailPrice: 55,
  breakEvenUnits: 10,
  projectedProfit: 600,
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { password } = req.body ?? {}
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorised' })
  }

  const count = (await kv.get('tvp:count')) ?? 0
  const rawMembers = await kv.lrange('tvp:members', 0, -1)
  const members = rawMembers.map((m) =>
    typeof m === 'string' ? JSON.parse(m) : m
  )

  return res.status(200).json({ count, members, financials: FINANCIALS })
}
