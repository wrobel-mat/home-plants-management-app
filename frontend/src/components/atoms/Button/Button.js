import "./Button.css";

export default function Button({ text, type, onClick, icon, filled, disabled, danger }) {
  const className = disabled
    ? "btn disabled"
    : danger 
      ? "btn btn--danger" 
      : filled
        ? "btn btn--filled"
        : "btn btn--outline";
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={!!disabled}
    >
      {icon && <div className="btn-icon">{icon}</div>}
      <span className="btn-text">{text}</span>
    </button>
  );
}
