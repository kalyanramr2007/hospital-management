import QueueDisplay from "../components/QueueDisplay";
import "./PageLayout.css";

export default function QueuePage() {
  return (
    <div className="page container">
      <header className="page-header">
        <h1>Live Queue Display</h1>
        <p>Real-time patient queue with emergency prioritization. Updates automatically.</p>
      </header>
      <div className="page-content">
        <QueueDisplay />
      </div>
    </div>
  );
}
