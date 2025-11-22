import { auth } from "../../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import LoaddingSpinner from "../core/LoadingSpinner";
import CChatTitle from "../core/CChatTitle";
import { useTabContext } from "../context/TabProvider";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { selectTabChats } = useTabContext();

  async function login() {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, new GoogleAuthProvider());
      selectTabChats();
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setIsLoading(false), 10000);
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
