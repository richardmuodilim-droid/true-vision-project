import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body ?? {}

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required.' })
  }

  const key = 'tvp:drop002:waitlist'
  const normalised = email.toLowerCase().trim()

  const already = await kv.sismember(key, normalised)
  if (!already) {
    await kv.sadd(key, normalised)
  }

  return res.status(200).json({ ok: true, alreadyRegistered: !!already })
}
