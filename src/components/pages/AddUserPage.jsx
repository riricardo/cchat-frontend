import { useNavigate } from "react-router-dom";
import InputSearch from "../core/InputSearch";
import NavigationHeader from "../core/NavigationHeader";
import usersTest from "../tests/users-test";

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

      <ul className="list bg-base-100 rounded-box">
        {usersTest.map((user) => {
          return (
            <li key={user.id} className="list-row flex">
              <div className="flex gap-3 flex-1 items-center">
                <img className="size-10 rounded-box" src={user.profileUrl} />
                <div>{user.name}</div>
              </div>
              <button className="btn btn-accent justify-end">Start chat</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
