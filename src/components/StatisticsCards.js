import "./StatisticsCards.css";

const CARD_CONFIG = [
  { key: "total", label: "Total Today", icon: "📋", color: "blue" },
  { key: "waiting", label: "Waiting", icon: "⏳", color: "amber" },
  { key: "serving", label: "Now Serving", icon: "🩺", color: "green" },
  { key: "completed", label: "Completed", icon: "✅", color: "teal" },
  { key: "emergency", label: "Emergency", icon: "🚨", color: "red" },
];

export default function StatisticsCards({ stats }) {
  return (
    <div className="stats-cards">
      {CARD_CONFIG.map((card) => (
        <div key={card.key} className={`stats-card stats-card--${card.color}`}>
          <span className="stats-card__icon" aria-hidden="true">
            {card.icon}
          </span>
          <div className="stats-card__content">
            <span className="stats-card__value">{stats[card.key] ?? 0}</span>
            <span className="stats-card__label">{card.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
