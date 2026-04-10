export default function handler(req, res) {
  const modes = [
    { name: "SNIPER", description: "Entradas rápidas, 1min-5min", timeframes: ["1m","5m"] },
    { name: "CAÇADOR", description: "Tendências de 15min-30min", timeframes: ["15m","30m"] },
    { name: "PESCADOR", description: "Swing trading 1h-4h", timeframes: ["1h","4h"] }
  ];
  res.status(200).json({ modes });
}
