export default function NavigationHeader({ title, onClick, className }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <button className="cursor-pointer" onClick={onClick}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <h1>{title}</h1>
    </div>
  );
}
