import { auth } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function LoginPage() {
  return (
    <>
      <div>Login Page</div>
      <button
        onClick={() => {
          const provider = new GoogleAuthProvider();
          signInWithPopup(auth, provider);
        }}
      >
        Login with Google
      </button>
    </>
  );
}
