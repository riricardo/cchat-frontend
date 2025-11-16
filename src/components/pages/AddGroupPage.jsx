import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const navigate = useNavigate();

  return (
    <div className="h-dvh flex flex-col">
      <div className="flex gap-2 p-3">
        <button className="cursor-pointer" onClick={() => navigate("/")}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>Add group</h1>
      </div>
    </div>
  );
}
