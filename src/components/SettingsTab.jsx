import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export function SettingsTabHeader() {
  return (
    <>
      <i className="fa-solid fa-gear mr-2"></i>
      Settings
    </>
  );
}

export default function SettingsTab() {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-3xl font-bold">{auth?.currentUser?.displayName}</h1>
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
        </div>
      </div>
      <button className="btn btn-warning" onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  );
}
