export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });
  const { adminKey } = req.body;
  if (adminKey !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Não autorizado' });
  }
  // Aqui você pode chamar a API do Render para reiniciar o serviço
  res.status(200).json({ success: true, message: 'Reinício solicitado (simulado)' });
}
