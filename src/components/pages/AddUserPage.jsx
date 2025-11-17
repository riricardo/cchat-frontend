import { useNavigate } from "react-router-dom";
import InputSearch from "../core/InputSearch";
import NavigationHeader from "../core/NavigationHeader";
import usersTest from "../tests/users-test";
import { useState, useRef } from "react";

export default function ChatPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();

  function queryUsers(text) {
    let users = usersTest.filter((u) =>
      u.name.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
    setUsers(users);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      queryUsers(inputValue);
      setInputValue("");
      inputRef.current.blur();
      return;
    }
  }

  return (
    <div className="h-dvh flex flex-col">
      <NavigationHeader
        className="p-3"
        title="Add user"
        onClick={() => navigate("/")}
      />

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
                <img className="size-10 rounded-box" src={user.profileUrl} />
                <div>{user.name}</div>
              </div>
              <button className="btn btn-accent justify-end">Start chat</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
