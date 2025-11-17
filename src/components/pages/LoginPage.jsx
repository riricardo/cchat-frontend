import { auth } from "../../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState } from "react";
import LoaddingSpinner from "../core/LoadingSpinner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function createUser() {
    const user = auth?.currentUser;

    await addDoc(collection(db, "users"), {
      email: user?.email,
      profileImageUrl: user?.photoURL,
      createdAt: serverTimestamp(),
    });
  }

  async function createUserIfNotExists() {
    const email = auth?.currentUser?.email;

    const q = query(collection(db, "users"), where("email", "==", email));

    const snap = await getDocs(q);

    if (snap.empty) await createUser();
  }

  async function login() {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      await createUserIfNotExists();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="w-24 rounded-xl">
        <img src="./icon.png" alt="Logo" />
      </div>

      <h1 className="fa-shake text-3xl font-bold text-green-500">cchat</h1>

      {isLoading ? (
        <LoaddingSpinner className="mt-4" />
      ) : (
        <button className="btn btn-accent mt-5" onClick={login}>
          Login with Google
          <i className="fa-brands fa-google fa-beat"></i>
        </button>
      )}
    </div>
  );
}
