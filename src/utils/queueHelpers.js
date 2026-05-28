import { PATIENT_STATUS, PRIORITY_TYPES } from "./constants";

/** Convert Firestore timestamp to Date */
export function toDate(value) {
  if (!value) return null;
  if (value.toDate) return value.toDate();
  return new Date(value);
}

/** Check if patient was registered today */
export function isToday(patient) {
  const created = toDate(patient.createdAt) || new Date(patient.appointmentTimestamp);
  const today = new Date();
  return (
    created.getFullYear() === today.getFullYear() &&
    created.getMonth() === today.getMonth() &&
    created.getDate() === today.getDate()
  );
}

/** Sort queue: emergency first, then FIFO by creation time */
export function sortQueue(patients) {
  return [...patients].sort((a, b) => {
    const aEmergency = a.priorityType === PRIORITY_TYPES.EMERGENCY;
    const bEmergency = b.priorityType === PRIORITY_TYPES.EMERGENCY;
    if (aEmergency && !bEmergency) return -1;
    if (!aEmergency && bEmergency) return 1;

    const aDate = toDate(a.createdAt);
    const bDate = toDate(b.createdAt);
    const aTime = aDate ? aDate.getTime() : 0;
    const bTime = bDate ? bDate.getTime() : 0;
    return aTime - bTime;
  });
}

export function filterPatients(patients, { search = "", status = null, todayOnly = false } = {}) {
  let result = [...patients];

  if (todayOnly) {
    result = result.filter((p) => isToday(p));
  }

  if (status) {
    result = result.filter((p) => p.status === status);
  }

  if (search.trim()) {
    const term = search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.patientName?.toLowerCase().includes(term) ||
        p.token?.toLowerCase().includes(term) ||
        p.mobile?.includes(term)
    );
  }

  return result;
}

export function getQueueStats(patients, todayOnly = true) {
  const list = todayOnly ? patients.filter((p) => isToday(p)) : patients;

  return {
    total: list.length,
    waiting: list.filter((p) => p.status === PATIENT_STATUS.WAITING).length,
    serving: list.filter((p) => p.status === PATIENT_STATUS.SERVING).length,
    completed: list.filter((p) => p.status === PATIENT_STATUS.COMPLETED).length,
    emergency: list.filter(
      (p) =>
        p.priorityType === PRIORITY_TYPES.EMERGENCY &&
        p.status !== PATIENT_STATUS.COMPLETED
    ).length,
  };
}

export function getServingPatient(patients) {
  return patients.find((p) => p.status === PATIENT_STATUS.SERVING) || null;
}

export function getWaitingPatients(patients) {
  return sortQueue(patients.filter((p) => p.status === PATIENT_STATUS.WAITING));
}
