import React from "react";

const InputComponent = ({
  label,
  placeholder,
  className,
  type,
  value,
  onChange,
  required,
  disabled,
}) => {
  return (
    <div className={className}>
      <label className="block text-start">{label}</label>
      <input
        type={type}
        className={`border border-gray-300 rounded p-2 w-full ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e)}
        required={required}
        disabled={disabled}
      ></input>
    </div>
  );
};

export default InputComponent;
