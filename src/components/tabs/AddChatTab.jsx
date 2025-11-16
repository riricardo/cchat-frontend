import { useNavigate } from "react-router-dom";

export function AddChatTabHeader() {
  return (
    <>
      <i className="fa-solid fa-comment-medical mr-2"></i>
      Add Chat
    </>
  );
}

export default function AddChatTab() {
  const navigate = useNavigate();

  function handleAddUserClick() {
    navigate(`/add-user`);
  }

  function handleAddGroupClick() {
    navigate(`/add-group`);
  }
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <button className="btn btn-accent" onClick={handleAddUserClick}>
        Add user
      </button>
      <button className="btn btn-accent" onClick={handleAddGroupClick}>
        Create group
      </button>
    </div>
  );
}
