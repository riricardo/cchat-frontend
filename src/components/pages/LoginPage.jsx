import { auth } from "../../config/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";
import LoaddingSpinner from "../core/LoadingSpinner";
import { getUserByEmail, createUser } from "../../services/userService";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function createUserIfNotExists() {
    const user = await getUserByEmail(auth?.currentUser?.email);

    if (user == null)
      await createUser(auth?.currentUser.email, auth?.currentUser.photoURL);
  }

  async function login() {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, new GoogleAuthProvider());
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
