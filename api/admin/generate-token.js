import { kv } from '@vercel/kv';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { adminKey, periodDays, userId } = req.body;

  if (adminKey !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Admin key inválida' });
  }

  const token = crypto.randomBytes(32).toString('hex') + '.' + Date.now();
  const finalUserId = userId || `user_${Date.now()}`;
  const expiresAt = Date.now() + (periodDays * 86400000);

  await kv.hset(`token:${token}`, {
    token,
    userId: finalUserId,
    periodDays,
    createdAt: Date.now(),
    expiresAt,
    isActive: true
  });

  await kv.sadd('all_tokens', token);
  await kv.sadd(`user_tokens:${finalUserId}`, token);

  res.status(200).json({ token, userId: finalUserId, periodDays, expiresAt });
}
