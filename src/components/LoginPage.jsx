import { auth } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="w-24 rounded-xl">
        <img src="./icon.png" alt="Logo" />
      </div>
      <div className="text-3xl font-bold text-green-500">cchat</div>
      <button
        className="btn btn-primary mt-3"
        onClick={() => {
          const provider = new GoogleAuthProvider();
          signInWithPopup(auth, provider);
        }}
      >
        Login with Google
        <i class="fa-brands fa-google fa-beat"></i>
      </button>
    </div>
  );
}
