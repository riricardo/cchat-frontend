import { useParams, useNavigate } from "react-router-dom";

import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import messages from "./messages-test";

export default function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      <div className="flex gap-2 p-3">
        <button className="cursor-pointer" onClick={() => navigate("/")}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>Nome do chat</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            profileImageUrl={message.profileImageUrl}
            userName={message.userName}
            date={message.date}
            text={message.text}
            isLoggedUser={message.isLoggedUser}
          />
        ))}
      </div>

      <MessageInput className="p-3" />
    </div>
  );
}
