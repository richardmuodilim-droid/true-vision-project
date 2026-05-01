import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { userId } = req.body ?? {}
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'userId required' })
  }

  await kv.hset('tvp:lastseen', { [userId]: new Date().toISOString() })
  return res.status(200).json({ ok: true })
}
