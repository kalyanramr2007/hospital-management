import "./TokenCard.css";

export default function TokenCard({ token, patientName, priorityType, animated = false, size = "large" }) {
  const isEmergency = priorityType === "Emergency";

  return (
    <div
      className={`token-card token-card--${size} ${animated ? "token-card--animated" : ""} ${
        isEmergency ? "token-card--emergency" : ""
      }`}
    >
      <p className="token-card__label">Now Serving</p>
      <div className="token-card__number" key={token}>
        {token || "—"}
      </div>
      {patientName && <p className="token-card__name">{patientName}</p>}
      {isEmergency && (
        <span className="token-card__badge">🚨 Emergency Priority</span>
      )}
    </div>
  );
}
