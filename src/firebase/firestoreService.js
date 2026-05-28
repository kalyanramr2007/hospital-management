import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const PATIENTS_COLLECTION = "patients";

/** Subscribe to all patients with real-time updates */
export function subscribeToPatients(callback, onError) {
  const q = query(
    collection(db, PATIENTS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const patients = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      callback(patients);
    },
    onError
  );
}

/** Register a new patient */
export async function addPatient(patientData) {
  const docRef = await addDoc(collection(db, PATIENTS_COLLECTION), {
    ...patientData,
    status: "waiting",
    createdAt: serverTimestamp(),
    appointmentTimestamp: new Date().toISOString(),
  });
  return docRef.id;
}

/** Update patient fields */
export async function updatePatient(patientId, data) {
  const ref = doc(db, PATIENTS_COLLECTION, patientId);
  await updateDoc(ref, data);
}

/** Delete a patient document */
export async function deletePatient(patientId) {
  await deleteDoc(doc(db, PATIENTS_COLLECTION, patientId));
}

/** Get count of patients registered today for token numbering */
export async function getTodayPatientCount() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const snapshot = await getDocs(collection(db, PATIENTS_COLLECTION));
  let count = 0;

  snapshot.docs.forEach((d) => {
    const data = d.data();
    const created = data.createdAt?.toDate?.() || new Date(data.appointmentTimestamp);
    if (created >= today) count += 1;
  });

  return count;
}

/** Remove all completed patients */
export async function deleteCompletedPatients(patientIds) {
  await Promise.all(patientIds.map((id) => deletePatient(id)));
}

export { PATIENTS_COLLECTION };
