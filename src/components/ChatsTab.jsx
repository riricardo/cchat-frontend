import chats from "./test";
import ChatItem from "./ChatItem";

export function ChatTabHeader() {
  return (
    <>
      <i className="fa-solid fa-comments mr-2"></i>
      Chats
    </>
  );
}

export default function ChatTab() {
  return (
    <ul className="list bg-base-100 rounded-box">
      {chats.map((chat) => {
        return <ChatItem chatDetails={chat} />;
      })}
    </ul>
  );
}
