import { useParams, useNavigate } from "react-router-dom";

import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import messages from "./messages-test";

export default function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex gap-2 p-2">
        <button className="cursor-pointer" onClick={() => navigate("/")}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>Nome do chat</h1>
      </div>
      <h1>Chat {chatId}</h1>

      <div className="flex flex-col h-full">
        <div className="flex flex-col overflow-y-auto">
          {messages.map((message) => (
            <MessageBubble
              profileImageUrl={message.profileImageUrl}
              userName={message.userName}
              date={message.date}
              text={message.text}
              isLoggedUser={message.isLoggedUser}
            />
          ))}
        </div>
        <MessageInput className="mt-auto" />
      </div>
    </div>
  );
}
