import { kv } from '@vercel/kv'

function generateUserId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let suffix = ''
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)]
  }
  return `TVP-001-${suffix}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body ?? {}
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const normalised = email.toLowerCase().trim()

  // Return existing entry if already registered
  const existing = await kv.hget('tvp:emails', normalised)
  if (existing) {
    const entry = typeof existing === 'string' ? JSON.parse(existing) : existing
    return res.status(200).json({ userId: entry.userId, returning: true })
  }

  // Generate unique ID and store
  const memberNumber = await kv.incr('tvp:count')
  const userId = generateUserId()
  const timestamp = new Date().toISOString()
  const entry = { email: normalised, userId, timestamp, memberNumber }

  await kv.hset('tvp:emails', { [normalised]: JSON.stringify(entry) })
  await kv.lpush('tvp:members', JSON.stringify(entry))

  return res.status(200).json({ userId, memberNumber })
}
