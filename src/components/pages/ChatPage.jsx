import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import MessageBubble from "../core/MessageBubble";
import MessageInput from "../core/MessageInput";
import messages from "../messages-test";
import NavigationHeader from "../core/NavigationHeader";

export default function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-dvh flex flex-col">
      <NavigationHeader
        className="p-3"
        title="Nome do chat"
        onClick={() => navigate("/")}
      />

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
        <div ref={bottomRef} />
      </div>

      <MessageInput className="p-3" />
    </div>
  );
}
