export default function handler(req, res) {
  res.status(200).json({ status: 'connected', app_id: 'deriv-demo', last_tick: Date.now() });
}
