import chats from "../tests/chats-test";
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

  function getChatImage(chat) {
    return chat.isUserChat
      ? chat.users[0].profileImageUrl
      : chat.group.groupImageUrl;
  }

  function getChatTitle(chat) {
    return chat.isUserChat ? chat.users[0].name : chat.group.groupName;
  }

  return (
    <ul className="list bg-base-100 rounded-box">
      {chats.map((chat) => {
        return (
          <li
            key={chat.id}
            className="list-row flex items-center cursor-pointer"
            onClick={() => handleChatClick(chat.id)}
          >
            <div>
              <img className="size-10 rounded-box" src={getChatImage(chat)} />
            </div>
            <div>{getChatTitle(chat)}</div>
          </li>
        );
      })}
    </ul>
  );
}
