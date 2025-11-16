import { useNavigate } from "react-router-dom";
import NavigationHeader from "../core/NavigationHeader";

export default function ChatPage() {
  const navigate = useNavigate();

  return (
    <div className="h-dvh flex flex-col">
      <NavigationHeader
        className="p-3"
        title="Add group"
        onClick={() => navigate("/")}
      />
    </div>
  );
}
