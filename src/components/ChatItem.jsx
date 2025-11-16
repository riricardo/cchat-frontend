export default function ChatItem({ chatDetails }) {
  let img = chatDetails.isUserChat
    ? chatDetails.users[0].profileImageUrl
    : chatDetails.group.groupImageUrl;
  let title = chatDetails.isUserChat
    ? chatDetails.users[0].name
    : chatDetails.group.groupName;

  return (
    <li className="list-row flex items-center">
      <div>
        <img className="size-10 rounded-box" src={img} />
      </div>
      <div>{title}</div>
    </li>
  );
}
