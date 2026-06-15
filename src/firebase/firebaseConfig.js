// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDFrSfVgDO08CLImPHCmA-lY6CQXq9hac",
  authDomain: "hospital-queue-managemen-93f2c.firebaseapp.com",
  projectId: "hospital-queue-managemen-93f2c",
  storageBucket: "hospital-queue-managemen-93f2c.firebasestorage.app",
  messagingSenderId: "428298275828",
  appId: "1:428298275828:web:491c0778c9fce41bebc7a1",
  measurementId: "G-43R05HYQY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDDFrSfVgDO08CLImPHCmA-lY6CQXq9hac",
//   authDomain: "hospital-queue-managemen-93f2c.firebaseapp.com",
//   projectId: "hospital-queue-managemen-93f2c",
//   storageBucket: "hospital-queue-managemen-93f2c.firebasestorage.app",
//   messagingSenderId: "428298275828",
//   appId: "1:428298275828:web:491c0778c9fce41bebc7a1",
//   measurementId: "G-43R05HYQY7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);