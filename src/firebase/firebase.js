// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAkzsRllK6zXuqv3HAQaIwoLSWsstkdkA",
  authDomain: "banking-app-e5211.firebaseapp.com",
  projectId: "banking-app-e5211",
  storageBucket: "banking-app-e5211.firebasestorage.app",
  messagingSenderId: "825046229874",
  appId: "1:825046229874:web:7388b4307e250c94d733eb",
  measurementId: "G-MGYGW6JNBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics is optional and must be guarded so it never crashes the app
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Firebase Analytics is not available:", error);
}
export { analytics };
