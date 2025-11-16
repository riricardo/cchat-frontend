import chats from "../tests/chats-test";
import ChatItem from "../core/ChatItem";
import { useNavigate } from "react-router-dom";

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

  function handleChatClick(chatId) {
    navigate(`/chat/${chatId}`);
  }

  return (
    <ul className="list bg-base-100 rounded-box">
      {chats.map((chat) => {
        return (
          <ChatItem
            key={chat.id}
            chatDetails={chat}
            onClick={() => handleChatClick(chat.id)}
          />
        );
      })}
    </ul>
  );
}
