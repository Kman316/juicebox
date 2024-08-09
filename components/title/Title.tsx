// components/Title.tsx
import React from "react";
import styles from "./Title.module.scss"; // Import styles specific to Title

interface TitleProps {
  text: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ text, className = "" }) => {
  return <h2 className={`${styles.title} ${className}`}>{text}</h2>;
};

export default Title;
