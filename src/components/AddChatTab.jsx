export function AddChatTabHeader() {
  return (
    <>
      <i className="fa-solid fa-comment-medical mr-2"></i>
      Add Chat
    </>
  );
}

export default function AddChatTab() {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <button className="btn btn-accent">Find user</button>
      <button className="btn btn-accent">Create group</button>
    </div>
  );
}
