import "./Input.css";

export default function Select({
  register,
  registerOpt,
  name,
  id,
  label,
  children,
  icon
}) {
  const attributes = register(name, registerOpt);

  const setLabelFocused = (e) => {
    e.target.parentNode.previousSibling.className =
      "input-label input-label--focus";
  };

  const setLabelBlurred = (e) => {
    e.target.parentNode.previousSibling.className =
      "input-label input-label--blur";
  };

  return (
    <div className="input-wrapper">
      <label
        htmlFor={name}
        className={
          document.activeElement === document.getElementById(id)
            ? "input-label input-label--focus"
            : "input-label input-label--blur"
        }
      >
        {label}
      </label>
      <div className="input-box">
        {icon && <div className="input-icon input-icon--before">{icon}</div>}
        <select
          {...attributes}
          id={id}
          onFocus={setLabelFocused}
          onBlur={setLabelBlurred}
        >
          {children}
        </select>
      </div>
    </div>
  );
}
