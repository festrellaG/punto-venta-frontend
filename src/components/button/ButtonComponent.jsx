import React from "react";

const ButtonComponent = ({
  onClick,
  className,
  children,
  size,
  style,
  type,
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "text-sm p-2",
    md: "text-md p-3",
    lg: "text-lg p-4",
  };

  const styleClasses = {
    primary: "bg-black text-white",
    secondary: "bg-gray-200 text-gray-500",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed hover:opacity-100",
  };

  const buttonStyle = disabled ? "disabled" : style;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`rounded ${className} ${sizeClasses[size]} ${
        styleClasses[buttonStyle]
      } ${
        disabled ? "pointer-events-none" : "hover:opacity-50 cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
