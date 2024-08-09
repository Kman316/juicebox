"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import backButtonImage from "../../public/back.png";
import styles from "./BackButton.module.scss";

interface BackButtonProps {
  altText?: string;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  altText = "Go Back",
  className = "",
  onClick,
  ariaLabel,
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <div
      className={`${styles.backButton} ${className}`}
      onClick={handleBackClick}
    >
      <Image src={backButtonImage} alt={altText} aria-label={ariaLabel} />
    </div>
  );
};

export default BackButton;
