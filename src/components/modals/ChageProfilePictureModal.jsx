import { useState, useEffect } from "react";
import { changeProfileImage } from "../../services/userService";
import { useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import LoadingSpinner from "../core/LoadingSpinner";

export default function ChangeProfilePictureModal({ open, onClose }) {
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();
  const { dbUser, updateDbUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  function hasPreview() {
    return preview != null;
  }

  useEffect(() => {
    if (open) setPreview(null);
  }, [open]);

  if (!open) return null;

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) {
      setPreview(null);
    } else {
      setPreview(URL.createObjectURL(file));
    }
  }

  async function saveNewPicture() {
    setIsLoading(true);
    await changeProfileImage(dbUser.id, fileRef.current?.files?.[0]);
    await updateDbUser();
    setIsLoading(false);
    onClose();
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box flex flex-col">
        <h3 className="font-bold text-lg mb-4">Change Profile Picture</h3>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="file-input w-full mb-4"
          onChange={handleFileChange}
        />

        {preview && (
          <div className="avatar mx-auto">
            <div className="w-24 rounded-full">
              <img src={preview} alt="Preview" />
            </div>
          </div>
        )}

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`btn btn-accent ${hasPreview() ? "" : "btn-disabled"}`}
            onClick={saveNewPicture}
          >
            Save
            {isLoading && <LoadingSpinner textAccent={false} />}
          </button>
        </div>
      </div>
    </dialog>
  );
}
