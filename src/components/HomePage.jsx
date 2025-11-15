import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function HomePage() {
  return (
    <>
      <div>Home Page</div>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </>
  );
}
