export default function MessageBubble({
  profileImageUrl,
  userName,
  text,
  date,
  isLoggedUser,
}) {
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <div className={`chat ${isLoggedUser ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profileImageUrl} />
        </div>
      </div>
      <div className="chat-header">{userName}</div>
      <div
        className={`chat-bubble ${isLoggedUser ? "chat-bubble-accent" : ""}`}
      >
        {text}
      </div>
      <div className="chat-footer opacity-50">{formatDate(date)}</div>
    </div>
  );
}
