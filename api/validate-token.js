import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { token } = req.body;
  const tokenData = await kv.hgetall(`token:${token}`);
  
  if (!tokenData || tokenData.expiresAt < Date.now() || tokenData.isActive === false) {
    return res.json({ valid: false });
  }

  res.json({
    valid: true,
    userId: tokenData.userId,
    periodDays: tokenData.periodDays,
    expiresAt: Math.floor(tokenData.expiresAt / 1000)
  });
}
