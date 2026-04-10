import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  const adminKey = authHeader?.split(' ')[1];
  
  if (adminKey !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Não autorizado' });
  }

  const allTokensKeys = await kv.smembers('all_tokens');
  const tokens = [];

  for (const t of allTokensKeys) {
    const data = await kv.hgetall(`token:${t}`);
    if (data && data.isActive !== false) tokens.push(data);
  }

  res.json({ tokens });
}
