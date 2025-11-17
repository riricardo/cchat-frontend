import { useState, useEffect } from "react";

export default function ChangeProfilePictureModal({ open, onClose, onSave }) {
  const [preview, setPreview] = useState(null);

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

  return (
    <dialog className="modal modal-open">
      <div className="modal-box flex flex-col">
        <h3 className="font-bold text-lg mb-4">Change Profile Picture</h3>

        <input
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
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}
