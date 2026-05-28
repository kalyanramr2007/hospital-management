import { useMemo, useState, useEffect } from "react";
import usePatients from "../hooks/usePatients";
import TokenCard from "../components/TokenCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { getServingPatient, isToday } from "../utils/queueHelpers";
import "./PageLayout.css";
import "./TokenDisplayPage.css";

export default function TokenDisplayPage() {
  const { patients, loading, error } = usePatients();
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const serving = useMemo(() => {
    const today = patients.filter(isToday);
    return getServingPatient(today);
  }, [patients]);

  if (loading) {
    return (
      <div className="token-display-page">
        <LoadingSpinner message="Connecting to live display..." />
      </div>
    );
  }

  return (
    <div className="token-display-page">
      <div className="token-display-page__inner">
        <header className="token-display-page__header">
          <span className="hospital-logo">🏥</span>
          <h1>Now Serving</h1>
          <p>Smart Hospital Queue System — Please proceed when your token is displayed</p>
        </header>

        {error ? (
          <div className="token-display-error">
            <p>Unable to load token display. Check connection.</p>
          </div>
        ) : (
          <TokenCard
            token={serving?.token}
            patientName={serving?.patientName}
            priorityType={serving?.priorityType}
            animated
            size="large"
          />
        )}

        <footer className="token-display-page__footer">
          <p>{clock.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          <p className="token-display-page__clock">
            {clock.toLocaleTimeString()}
          </p>
        </footer>
      </div>
    </div>
  );
}
