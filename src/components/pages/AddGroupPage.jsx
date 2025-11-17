import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavigationHeader from "../core/NavigationHeader";

export default function ChatPage() {
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [groupName, setGroupName] = useState("");

  function hasPreview() {
    return preview != null;
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) {
      setPreview(null);
    } else {
      setPreview(URL.createObjectURL(file));
    }
  }

  function isValid() {
    return !!groupName && preview != null;
  }

  return (
    <div className="h-dvh flex flex-col">
      <NavigationHeader
        className="p-3"
        title="Add group"
        onClick={() => navigate("/")}
      />

      <div className="flex flex-col items-center gap-4 p-6">
        <input
          type="file"
          accept="image/*"
          className="file-input w-full"
          onChange={handleFileChange}
        />

        {preview && (
          <div className="avatar mx-auto">
            <div className="w-24 rounded-full">
              <img src={preview} alt="Preview" />
            </div>
          </div>
        )}

        <label className="floating-label w-full">
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group name"
            className="input w-full"
          />
          <span>Group name</span>
        </label>

        <button className={`btn btn-accent ${isValid() ? "" : "btn-disabled"}`}>
          Create group
        </button>
      </div>
    </div>
  );
}
