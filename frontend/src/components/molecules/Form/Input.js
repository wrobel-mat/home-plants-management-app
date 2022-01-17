import { useState } from "react";
import "./Input.css";
import { eyeOpenIcon, eyeSlashedIcon } from "assets/icons";

export default function Input({
  register,
  registerOpt,
  errors,
  name,
  type,
  id,
  label,
  placeholder,
  icon,
  ...rest
}) {
  const [inputType, setInputType] = useState(type);
  const isPasswordInput = name.toLowerCase().includes("password");
  const error = errors && errors[name] ? errors[name] : null;
  const attributes = register(name, registerOpt);

  const switchFieldType = () => {
    if (inputType === "password") {
      document.getElementById(id).setAttribute("type", "text");
      setInputType("text");
    } else {
      document.getElementById(id).setAttribute("type", "password");
      setInputType("password");
    }
  };

  const setLabelFocused = (e) => {
    e.target.parentNode.previousSibling.className = error
      ? "input-label input-label--error"
      : "input-label input-label--focus";
  };

  const setLabelBlurred = (e) => {
    e.target.parentNode.previousSibling.className = error
      ? "input-label input-label--error"
      : "input-label input-label--blur";
  };

  return (
    <div className="input-wrapper">
      <label
        htmlFor={name}
        className={
          error
            ? "input-label input-label--error"
            : document.activeElement === document.getElementById(id)
            ? "input-label input-label--focus"
            : "input-label input-label--blur"
        }
      >
        {label}
      </label>
      <div className={error ? "input-box input-box--error" : "input-box"}>
        {icon && <div className="input-icon input-icon--before">{icon}</div>}
        <input
          className="input"
          {...attributes}
          id={id}
          type={type}
          placeholder={placeholder}
          onFocus={setLabelFocused}
          onBlur={setLabelBlurred}
          {...rest}
        />
        {isPasswordInput && (
          <div className="input-icon input-icon--after">
            <button
              type="button"
              className="input-button--after"
              onClick={switchFieldType}
            >
              {inputType === "password" ? eyeOpenIcon : eyeSlashedIcon}
            </button>
          </div>
        )}
      </div>
      {error && (
        <div className="input-error">
          <span className="input-error-text">{error.message}</span>
        </div>
      )}
    </div>
  );
}
