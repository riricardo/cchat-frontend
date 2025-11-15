import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./config/firebase";
import Cookies from "universal-cookie";
import { useState } from "react";
const cookies = new Cookies();

function App() {
  const [signedIn, setSignedIn] = useState(getSignedIn());

  async function handleLogin() {
    await signInWithPopup(auth, googleProvider);
    cookies.set("token", auth?.currentUser?.accessToken);
  }

  async function handleLogout() {
    await signOut(auth);
    cookies.remove("token");
  }

  function getSignedIn() {
    return auth?.currentUser != null;
  }

  async function handleTest() {
    setSignedIn(getSignedIn());
    console.log("auth", auth);
  }

  return (
    <>
      <button className="btn" onClick={handleLogin}>
        Login with google
      </button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleTest}>Test Button</button>
      <p>{signedIn.toString()}</p>
    </>
  );
}

export default App;
