import { useMemo, useState } from "react";
import usePatients from "../hooks/usePatients";
import {
  updatePatient,
  deletePatient,
  deleteCompletedPatients,
} from "../firebase/firestoreService";
import {
  filterPatients,
  getQueueStats,
  getWaitingPatients,
  isToday,
  toDate,
} from "../utils/queueHelpers";
import { PATIENT_STATUS, PRIORITY_TYPES } from "../utils/constants";
import { useToast } from "../context/ToastContext";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";
import StatisticsCards from "./StatisticsCards";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { patients, loading, error } = usePatients();
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const { showToast } = useToast();

  const todayPatients = useMemo(() => patients.filter(isToday), [patients]);
  const stats = getQueueStats(patients, true);
  const waitingSorted = getWaitingPatients(todayPatients);

  const filteredList = useMemo(() => {
    return filterPatients(todayPatients, { search });
  }, [todayPatients, search]);

  const handleCallNext = async () => {
    if (waitingSorted.length === 0) {
      showToast("No patients waiting in queue", "warning");
      return;
    }

    setActionLoading(true);
    try {
      const currentlyServing = todayPatients.find(
        (p) => p.status === PATIENT_STATUS.SERVING
      );

      if (currentlyServing) {
        await updatePatient(currentlyServing.id, {
          status: PATIENT_STATUS.COMPLETED,
        });
      }

      const nextPatient = waitingSorted[0];
      await updatePatient(nextPatient.id, { status: PATIENT_STATUS.SERVING });
      showToast(`Now serving: ${nextPatient.token} — ${nextPatient.patientName}`, "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to call next patient", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkCompleted = async (patientId) => {
    setActionLoading(true);
    try {
      await updatePatient(patientId, { status: PATIENT_STATUS.COMPLETED });
      showToast("Patient marked as completed", "success");
    } catch (err) {
      showToast("Update failed", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemovePatient = async (patientId) => {
    if (!window.confirm("Remove this patient from the system?")) return;
    setActionLoading(true);
    try {
      await deletePatient(patientId);
      showToast("Patient removed", "info");
    } catch (err) {
      showToast("Delete failed", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleClearCompleted = async () => {
    const completedIds = todayPatients
      .filter((p) => p.status === PATIENT_STATUS.COMPLETED)
      .map((p) => p.id);

    if (completedIds.length === 0) {
      showToast("No completed patients to remove", "warning");
      return;
    }

    if (!window.confirm(`Remove ${completedIds.length} completed patient(s)?`)) return;

    setActionLoading(true);
    try {
      await deleteCompletedPatients(completedIds);
      showToast(`Removed ${completedIds.length} completed record(s)`, "success");
    } catch (err) {
      showToast("Failed to clear completed patients", "error");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;

  if (error) {
    return (
      <div className="admin-error card">
        <p>⚠️ {error}</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <StatisticsCards stats={stats} />

      <div className="admin-actions card">
        <h2>Queue Controls</h2>
        <div className="admin-actions__buttons">
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleCallNext}
            disabled={actionLoading || waitingSorted.length === 0}
          >
            📢 Call Next Patient
          </button>
          <button
            type="button"
            className="btn btn--outline"
            onClick={handleClearCompleted}
            disabled={actionLoading}
          >
            🗑️ Clear Completed
          </button>
        </div>
        {waitingSorted.length > 0 && (
          <p className="admin-next-hint">
            Next in queue: <strong>{waitingSorted[0].token}</strong> — {waitingSorted[0].patientName}
            {waitingSorted[0].priorityType === PRIORITY_TYPES.EMERGENCY && (
              <span className="badge badge--emergency"> Emergency</span>
            )}
          </p>
        )}
      </div>

      <section className="admin-table-section card">
        <div className="admin-table__header">
          <h2>All Registered Patients (Today)</h2>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {filteredList.length === 0 ? (
          <div className="empty-state">
            <span>📋</span>
            <p>No patients found for today.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Name</th>
                  <th>Age/Gender</th>
                  <th>Mobile</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((p) => (
                  <tr
                    key={p.id}
                    className={
                      p.priorityType === PRIORITY_TYPES.EMERGENCY
                        ? "row--emergency"
                        : ""
                    }
                  >
                    <td><strong>{p.token}</strong></td>
                    <td>{p.patientName}</td>
                    <td>{p.age} / {p.gender}</td>
                    <td>{p.mobile}</td>
                    <td>
                      {p.priorityType === PRIORITY_TYPES.EMERGENCY ? (
                        <span className="badge badge--emergency">Emergency</span>
                      ) : (
                        "Normal"
                      )}
                    </td>
                    <td>
                      <span className={`status-badge status-badge--${p.status}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      {(toDate(p.createdAt) || new Date(p.appointmentTimestamp)).toLocaleTimeString()}
                    </td>
                    <td className="admin-table__actions">
                      {p.status !== PATIENT_STATUS.COMPLETED && (
                        <button
                          type="button"
                          className="btn btn--sm btn--success"
                          onClick={() => handleMarkCompleted(p.id)}
                          disabled={actionLoading}
                        >
                          Complete
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn--sm btn--danger"
                        onClick={() => handleRemovePatient(p.id)}
                        disabled={actionLoading}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
