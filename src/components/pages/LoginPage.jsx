import { auth } from "../../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import LoaddingSpinner from "../core/LoadingSpinner";
import CChatTitle from "../core/CChatTitle";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function login() {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, new GoogleAuthProvider());
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

      <CChatTitle />

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
