import { useNavigate } from "react-router-dom";
import { getChatsByUserId } from "../../services/chatService";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useTabContext } from "../context/TabProvider";

export function ChatTabHeader() {
  return (
    <>
      <i className="fa-solid fa-comments mr-2"></i>
      Chats
    </>
  );
}

export default function ChatTab() {
  const navigate = useNavigate();
  const { dbUser } = useAuth();
  const [chats, setChats] = useState([]);
  const { selectTabAddChat } = useTabContext();

  useEffect(() => {
    if (!dbUser?.id) return;

    let isMounted = true;

    async function fetchChats() {
      const chats = await getChatsByUserId(dbUser?.id);
      if (isMounted) setChats(chats);
    }

    fetchChats();

    return () => {
      isMounted = false;
    };
  }, [dbUser?.id]);

  function handleChatClick(chatId) {
    navigate(`/chat/${chatId}`);
  }

  function getNotLoggedUser(users) {
    if (users[0].id == dbUser?.id) return users[1];

    return users[0];
  }

  function getChatImage(chat) {
    return chat.group == null
      ? getNotLoggedUser(chat.privateChat.users).imageUrl
      : chat.group.imageUrl;
  }

  function getChatTitle(chat) {
    return chat.group == null
      ? getNotLoggedUser(chat.privateChat.users).name
      : chat.group.name;
  }

  return (
    <>
      {chats.length == 0 ? (
        <div className="flex flex-col gap-4 items-center justify-center h-full w-full">
          <span>No chats started...</span>
          <button className="btn btn-accent" onClick={selectTabAddChat}>
            Add a chat
          </button>
        </div>
      ) : (
        <ul className="list bg-base-100 rounded-box">
          {chats.map((chat) => {
            return (
              <li
                key={chat.id}
                className="list-row flex items-center cursor-pointer"
                onClick={() => handleChatClick(chat.id)}
              >
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={getChatImage(chat)}
                  />
                </div>
                <div className="select-none-force">{getChatTitle(chat)}</div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
