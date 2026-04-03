import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  try {
    const count = await kv.get('tvp:count')
    return res.status(200).json({ count: count ?? 0 })
  } catch {
    return res.status(200).json({ count: 0 })
  }
}
