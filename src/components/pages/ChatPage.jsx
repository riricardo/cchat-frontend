import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "../context/AuthProvider";
import MessageBubble from "../core/MessageBubble";
import MessageInput from "../core/MessageInput";
import NavigationHeader from "../core/NavigationHeader";
import {
  createChatMessage,
  listenToMessages,
  listenToUsers,
} from "../../services/chatService";

export default function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [messagesRaw, setMessagesRaw] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { dbUser } = useAuth();

  const bottomRef = useRef();

  function scrollToBotton() {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const unsubscribeUsers = listenToUsers((users) => setUsers(users));
    const unsubscribeMessages = listenToMessages(chatId, (messages) => {
      setMessagesRaw(messages);
      scrollToBotton();
    });

    return () => {
      unsubscribeMessages();
      unsubscribeUsers();
    };
  }, [chatId]);

  function getChatName() {
    return "chat";
  }

  async function handleMessageSubmit(e) {
    e.preventDefault();

    await createChatMessage(chatId, dbUser.id, newMessage);

    setNewMessage("");
  }

  function userAt(userId) {
    return users.find((u) => u.id == userId);
  }

  return (
    <div className="h-dvh flex flex-col">
      <NavigationHeader
        className="p-3"
        title={getChatName()}
        onClick={() => navigate("/")}
      />

      <div className="flex-1 overflow-y-auto p-3">
        {messagesRaw.map((message) => (
          <MessageBubble
            key={message.id}
            profileImageUrl={userAt(message.userId).profileImageUrl}
            userName={userAt(message.userId).name}
            date={message.createdAt?.toDate()}
            text={message.text}
            isLoggedUser={dbUser.id == message.userId}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <MessageInput
        className="p-3"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSubmit={handleMessageSubmit}
      />
    </div>
  );
}
