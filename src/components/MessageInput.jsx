export default function MessageInput({ className }) {
  return (
    <div className={`${className} flex gap-4`}>
      <input type="text" placeholder="Type here" className="input w-full" />
      <button className="btn btn-accent btn-circle">
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  );
}
