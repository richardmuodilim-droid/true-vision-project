import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email } = req.body ?? {}
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ found: false })
  }

  const normalised = email.toLowerCase().trim()
  const existing = await kv.hget('tvp:emails', normalised)
  if (!existing) return res.status(200).json({ found: false })

  const entry = typeof existing === 'string' ? JSON.parse(existing) : existing
  return res.status(200).json({ found: true, name: entry.name, userId: entry.userId })
}
