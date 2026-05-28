import { useMemo, useState } from "react";
import usePatients from "../hooks/usePatients";
import {
  filterPatients,
  getQueueStats,
  getServingPatient,
  getWaitingPatients,
  toDate,
} from "../utils/queueHelpers";
import { PATIENT_STATUS, PRIORITY_TYPES } from "../utils/constants";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";
import TokenCard from "./TokenCard";
import StatisticsCards from "./StatisticsCards";
import "./QueueDisplay.css";

export default function QueueDisplay() {
  const { patients, loading, error } = usePatients();
  const [search, setSearch] = useState("");

  const todayPatients = useMemo(
    () => patients.filter((p) => {
      const created = toDate(p.createdAt) || new Date(p.appointmentTimestamp);
      const today = new Date();
      return (
        created.getFullYear() === today.getFullYear() &&
        created.getMonth() === today.getMonth() &&
        created.getDate() === today.getDate()
      );
    }),
    [patients]
  );

  const serving = getServingPatient(todayPatients);
  const waiting = getWaitingPatients(todayPatients);
  const stats = getQueueStats(patients, true);

  const displayedWaiting = useMemo(() => {
    return filterPatients(waiting, { search });
  }, [waiting, search]);

  if (loading) return <LoadingSpinner message="Loading live queue..." />;

  if (error) {
    return (
      <div className="queue-error card">
        <p>⚠️ {error}</p>
        <p className="text-muted">Check Firebase connection and Firestore rules.</p>
      </div>
    );
  }

  return (
    <div className="queue-display">
      <StatisticsCards stats={stats} />

      <div className="queue-display__grid">
        <section className="queue-section card">
          <h2>Currently Serving</h2>
          {serving ? (
            <TokenCard
              token={serving.token}
              patientName={serving.patientName}
              priorityType={serving.priorityType}
              animated
              size="medium"
            />
          ) : (
            <div className="empty-state">
              <span>🩺</span>
              <p>No patient is being served right now.</p>
            </div>
          )}
        </section>

        <section className="queue-section card queue-section--waiting">
          <div className="queue-section__header">
            <h2>
              Waiting Queue
              <span className="queue-count">{displayedWaiting.length}</span>
            </h2>
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {displayedWaiting.length === 0 ? (
            <div className="empty-state">
              <span>📋</span>
              <p>{search ? "No patients match your search." : "Queue is empty. No waiting patients."}</p>
            </div>
          ) : (
            <ul className="patient-list">
              {displayedWaiting.map((patient, index) => (
                <li
                  key={patient.id}
                  className={`patient-card ${
                    patient.priorityType === PRIORITY_TYPES.EMERGENCY
                      ? "patient-card--emergency"
                      : ""
                  }`}
                >
                  <div className="patient-card__token">{patient.token}</div>
                  <div className="patient-card__info">
                    <strong>{patient.patientName}</strong>
                    <span>
                      {patient.age} yrs · {patient.gender} · {patient.mobile}
                    </span>
                    <span className="patient-card__symptoms">{patient.symptoms}</span>
                    <span className="patient-card__time">
                      Registered:{" "}
                      {(toDate(patient.createdAt) || new Date(patient.appointmentTimestamp)).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="patient-card__meta">
                    <span className="queue-position">#{index + 1}</span>
                    {patient.priorityType === PRIORITY_TYPES.EMERGENCY && (
                      <span className="badge badge--emergency">Emergency</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
