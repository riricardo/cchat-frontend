import { useState, useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import { getUsersByName } from "../../services/userService";
import InputSearch from "../core/InputSearch";

export default function SelectUserModal({ onClose, onAddUser, usersToIgnore }) {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();
  const { dbUser } = useAuth();

  async function queryUsers(text) {
    let users = await getUsersByName(text);

    let filteredUsers1 = users.filter((user) => user.id != dbUser.id);
    let filteredUsers2 = filteredUsers1.filter(
      (a) => !usersToIgnore.some((b) => b.id == a.id)
    );

    setUsers(filteredUsers2);
  }

  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      await queryUsers(inputValue);
      setInputValue("");
      inputRef.current.blur();
      return;
    }
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box flex flex-col">
        <h3 className="font-bold text-lg mb-4">Select user</h3>

        <InputSearch
          ref={inputRef}
          className="p-3"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for the user..."
        />

        <ul className="list bg-base-100 rounded-box">
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
                <button
                  className="btn btn-accent justify-end"
                  onClick={() => onAddUser(user)}
                >
                  Add user
                </button>
              </li>
            );
          })}
        </ul>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}
