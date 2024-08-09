import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  className,
  ariaLabel,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  );
};

export default Button;
