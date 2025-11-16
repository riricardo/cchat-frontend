import { useParams, useNavigate } from "react-router-dom";

import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import messages from "./messages-test";

export default function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex gap-2 p-4">
        <button className="cursor-pointer" onClick={() => navigate("/")}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>Nome do chat</h1>
      </div>

      <div className="p-4">
        <div className="">
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
