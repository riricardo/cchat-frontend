import { useNavigate } from "react-router-dom";
import InputSearch from "../core/InputSearch";
import NavigationHeader from "../core/NavigationHeader";
import { useState, useRef } from "react";
import { getUsersByName } from "../../services/userService";
import { useAuth } from "../context/AuthProvider";
import {
  createChatHeader,
  searchChatByUserKey,
  makeUsersKey,
} from "../../services/chatService";
import { getUserById } from "../../services/userService";
import LoadingSpinner from "../core/LoadingSpinner";
import { useTabContext } from "../context/TabProvider";

export default function ChatPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const inputRef = useRef();
  const { dbUser } = useAuth();
  const { selectTabAddChat } = useTabContext();

  async function queryUsers(text) {
    setIsLoadingSearch(true);

    let users = await getUsersByName(text);

    setUsers(users.filter((user) => user.id != dbUser.id));
    setIsLoadingSearch(false);
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

  async function handleStartChat(userId) {
    try {
      let user = await getUserById(userId);
      let usersIds = [userId, dbUser.id];
      let users = [
        { id: user.id, imageUrl: user.profileImageUrl, name: user.name },
        { id: dbUser.id, imageUrl: dbUser.profileImageUrl, name: dbUser.name },
      ];
      let privateChat = {
        usersIds,
        users,
        usersKey: makeUsersKey(usersIds),
      };

      let group = null;

      let chat = await searchChatByUserKey(usersIds);
      let chatId = chat?.id;

      if (chatId == null) chatId = await createChatHeader(group, privateChat);

      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleGoBack() {
    navigate("/");
    selectTabAddChat();
  }

  return (
    <div className="h-dvh flex flex-col">
      <NavigationHeader
        className="p-3"
        title="Add user"
        onClick={handleGoBack}
      />

      <InputSearch
        ref={inputRef}
        className="p-3"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for the user..."
      />

      {isLoadingSearch && (
        <LoadingSpinner className="flex justify-center h-full w-full" />
      )}

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
                onClick={() => handleStartChat(user.id)}
              >
                Start chat
                {isLoading && <LoadingSpinner textAccent={false} />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
