// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfye0PyQujIKwyQAJ1u59AK6IWET0NQ_8",
  authDomain: "hospital-queue-system-1b02e.firebaseapp.com",
  projectId: "hospital-queue-system-1b02e",
  storageBucket: "hospital-queue-system-1b02e.firebasestorage.app",
  messagingSenderId: "965419889828",
  appId: "1:965419889828:web:8c334027f915a6a9eca231",
  measurementId: "G-RJEXZPEM03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };