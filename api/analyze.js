export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });
  const { symbol, mode } = req.body;
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token necessário' });
  }
  // Simulação de análise
  const signals = ['CALL', 'PUT', 'HOLD'];
  const randomSignal = signals[Math.floor(Math.random() * signals.length)];
  res.status(200).json({
    success: true,
    consolidated: { signal: randomSignal, confidence: Math.random() * 0.5 + 0.5, price: 100 + Math.random() * 10 },
    timeframes: { "1m": { sinal: randomSignal, rsi: 50 + Math.random() * 30, adx: 25 + Math.random() * 20 } },
    metadata: { responseTimeMs: 120 }
  });
}
