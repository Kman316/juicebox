import React, { forwardRef, Ref } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  text,
  type = "button",
  onClick,
  className,
  ariaLabel,
}, ref: Ref<HTMLButtonElement>) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
      aria-label={ariaLabel}
      ref={ref} // Attach ref here
    >
      {text}
    </button>
  );
});

export default Button;
