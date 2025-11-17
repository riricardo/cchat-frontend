import { auth } from "../../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="w-24 rounded-xl">
        <img src="./icon.png" alt="Logo" />
      </div>
      <h1 className="fa-shake text-3xl font-bold text-green-500">cchat</h1>
      <button
        className="btn btn-accent mt-5"
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
