import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import NavigationHeader from "../core/NavigationHeader";
import SelectUserModal from "../modals/SelectUserModal";
import { useAuth } from "../context/AuthProvider";
import { createChatHeader } from "../../services/chatService";
import { uploadFile } from "../../services/fileUpload";
import LoadingSpinner from "../core/LoadingSpinner";

export default function ChatPage() {
  const navigate = useNavigate();
  const { dbUser } = useAuth();
  const fileRef = useRef();

  const [preview, setPreview] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  function handleCloseModal() {
    setModalOpen(false);
  }

  function onAddUser(user) {
    setUsers((prev) => [...prev, user]);
    setModalOpen(false);
  }

  function isValid() {
    return !!groupName && preview != null && users.length > 0;
  }

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  async function handleCreateGroup() {
    try {
      setIsLoading(true);

      let usersIds = [...users.map((u) => u.id), dbUser.id];

      const file = fileRef.current?.files?.[0];
      const ext = file.type.split("/")[1];
      let url = await uploadFile(file, `chatGroup/${uuid()}/profile.${ext}`);

      let privateChat = null;
      let group = {
        usersIds,
        name: groupName,
        imageUrl: url,
      };

      let chatId = await createChatHeader(group, privateChat);

      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-dvh flex flex-col">
      <NavigationHeader
        className="p-3"
        title="Add group"
        onClick={() => navigate("/")}
      />

      <div className="flex flex-col items-center gap-4 p-6">
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

        <input
          ref={fileRef}
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

        <ul className="list bg-base-100 rounded-box shadow-md w-full">
          {users.map((user) => {
            return (
              <li key={user.id} className="list-row flex">
                <div className="flex gap-3 flex-1 items-center">
                  <img
                    className="size-10 rounded-box"
                    src={user.profileImageUrl}
                  />
                  <div>{user.name}</div>
                </div>
              </li>
            );
          })}
        </ul>

        {modalOpen && (
          <SelectUserModal
            onClose={handleCloseModal}
            onAddUser={onAddUser}
            usersToIgnore={users}
          />
        )}

        <button className="btn btn-accent" onClick={() => setModalOpen(true)}>
          Add user
        </button>

        <button
          className={`btn btn-accent ${isValid() ? "" : "btn-disabled"}`}
          onClick={handleCreateGroup}
        >
          Create group
          {isLoading && <LoadingSpinner textAccent={false} />}
        </button>
      </div>
    </div>
  );
}
