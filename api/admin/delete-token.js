import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { adminKey, tokenToDelete } = req.body;
  
  if (adminKey !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Não autorizado' });
  }

  await kv.hset(`token:${tokenToDelete}`, { isActive: false });
  await kv.srem('all_tokens', tokenToDelete);
  
  res.json({ success: true });
}
