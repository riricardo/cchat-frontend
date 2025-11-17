export default function LoadingSpinner({ className, textAccent = true }) {
  return (
    <div className={className}>
      <span
        className={`loading loading-spinner ${textAccent ? "text-accent" : ""}`}
      ></span>
    </div>
  );
}
