export default function MessageInput({ className, value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className={`${className} flex gap-4`}>
        <input
          type="text"
          placeholder="Type here"
          className="input w-full"
          value={value}
          onChange={onChange}
        />
        <button type="submit" className="btn btn-accent btn-circle">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
}
