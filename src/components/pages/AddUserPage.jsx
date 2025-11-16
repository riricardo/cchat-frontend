import { useNavigate } from "react-router-dom";
import InputSearch from "../core/InputSearch";
import NavigationHeader from "../core/NavigationHeader";

export default function ChatPage() {
  const navigate = useNavigate();

  return (
    <div className="h-dvh flex flex-col">
      <NavigationHeader
        className="p-3"
        title="Add user"
        onClick={() => navigate("/")}
      />

      <InputSearch className="p-3" />
    </div>
  );
}
