import { kv } from '@vercel/kv'

function capFirst(name) {
  const first = (name ?? '').trim().split(/\s+/)[0] || 'Member'
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase()
}

export default async function handler(req, res) {
  // GET ?wall=1 -> public Founders Wall (first names only, privacy-safe)
  if (req.method === 'GET' && req.query?.wall) {
    try {
      const count = Number(await kv.get('tvp:count')) || 0
      const raw = await kv.lrange('tvp:members', 0, 499)
      const members = raw.map(m => (typeof m === 'string' ? JSON.parse(m) : m)).filter(m => m && m.userId)
      const counts = members.length ? await kv.mget(...members.map(m => `tvp:ref:${m.userId}`)) : []
      const list = members
        .map((m, i) => ({ firstName: capFirst(m.name), n: m.memberNumber ?? null, ref: Number(counts[i]) || 0 }))
        .sort((a, b) => (a.n ?? 9e9) - (b.n ?? 9e9))
      return res.status(200).json({ count, members: list })
    } catch {
      return res.status(200).json({ count: 0, members: [] })
    }
  }

  // GET -> member count (was /api/count)
  if (req.method === 'GET') {
    try {
      const count = await kv.get('tvp:count')
      return res.status(200).json({ count: count ?? 0 })
    } catch {
      return res.status(200).json({ count: 0 })
    }
  }

  if (req.method !== 'POST') return res.status(405).end()

  const { email } = req.body ?? {}
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ found: false })
  }

  const normalised = email.toLowerCase().trim()
  const existing = await kv.hget('tvp:emails', normalised)
  if (!existing) return res.status(200).json({ found: false })

  const entry = typeof existing === 'string' ? JSON.parse(existing) : existing
  const referralCount = Number(await kv.get(`tvp:ref:${entry.userId}`)) || 0
  return res.status(200).json({
    found: true,
    name: entry.name,
    userId: entry.userId,
    memberNumber: entry.memberNumber ?? null,
    referralCount,
  })
}
