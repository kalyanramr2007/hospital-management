import { useEffect, useState } from "react";
import { subscribeToPatients } from "../firebase/firestoreService";

/** Real-time patient list from Firestore */
export default function usePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToPatients(
      (data) => {
        setPatients(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Firestore subscription error:", err);
        setError(err.message || "Failed to load patients");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { patients, loading, error };
}
