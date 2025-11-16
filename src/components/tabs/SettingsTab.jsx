import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import ChangeProfilePictureModal from "../modals/ChageProfilePictureModal";
import { useState } from "react";

export function SettingsTabHeader() {
  return (
    <>
      <i className="fa-solid fa-gear mr-2"></i>
      Settings
    </>
  );
}

export default function SettingsTab() {
  const [changeProfilePictureModalOpen, setChangeProfilePictureModalOpen] =
    useState(false);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-3xl font-bold">{auth?.currentUser?.displayName}</h1>
      <div
        className="avatar cursor-pointer"
        onClick={() => setChangeProfilePictureModalOpen(true)}
      >
        <div className="w-24 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
        </div>
      </div>
      <button className="btn btn-warning" onClick={() => signOut(auth)}>
        Sign Out
      </button>

      <ChangeProfilePictureModal
        open={changeProfilePictureModalOpen}
        onClose={() => setChangeProfilePictureModalOpen(false)}
        onSave={() => setChangeProfilePictureModalOpen(false)}
      />
    </div>
  );
}
