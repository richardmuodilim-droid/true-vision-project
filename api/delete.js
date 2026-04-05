import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body ?? {}
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const normalised = email.toLowerCase().trim()

  const existing = await kv.hget('tvp:emails', normalised)
  if (!existing) {
    return res.status(200).json({ message: 'If that email exists in our system, it has been removed.' })
  }

  // Remove from email hash
  await kv.hdel('tvp:emails', normalised)

  // Remove from members list
  const rawMembers = await kv.lrange('tvp:members', 0, -1)
  const filtered = rawMembers.filter(m => {
    try {
      const parsed = typeof m === 'string' ? JSON.parse(m) : m
      return parsed.email !== normalised
    } catch { return true }
  })

  // Rebuild the members list
  await kv.del('tvp:members')
  if (filtered.length > 0) {
    const toStore = filtered.map(m =>
      typeof m === 'string' ? m : JSON.stringify(m)
    )
    await kv.rpush('tvp:members', ...toStore)
  }

  // Decrement count
  const current = (await kv.get('tvp:count')) ?? 0
  await kv.set('tvp:count', Math.max(0, Number(current) - 1))

  return res.status(200).json({ message: 'If that email exists in our system, it has been removed.' })
}
