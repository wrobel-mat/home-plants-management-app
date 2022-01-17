import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";

export default function Form({
  defaultValues,
  onSubmit,
  children,
  disclaimer,
}) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit({ ...data, setError, reset });
      })}
      className="form"
    >
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                register,
                errors,
                key: child.props.name,
                ...child.props,
              },
            })
          : child;
      })}
      {disclaimer && <span className="form-disclaimer">{disclaimer}</span>}
    </form>
  );
}
