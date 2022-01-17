import "./Button.css";

export default function Button({ text, type, onClick, icon, filled, disabled }) {
  const className = disabled
    ? "btn disabled"
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
