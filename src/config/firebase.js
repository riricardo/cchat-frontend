import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3jeYnDRPVB6ZAsPKMytCWsge4lhGytqM",
  authDomain: "cchat-app-105f1.firebaseapp.com",
  projectId: "cchat-app-105f1",
  storageBucket: "cchat-app-105f1.firebasestorage.app",
  messagingSenderId: "861298846878",
  appId: "1:861298846878:web:296da1f8f39dcd5a64df8f",
  measurementId: "G-LVRFVJDD4Q",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
