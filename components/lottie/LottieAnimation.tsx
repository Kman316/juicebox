"use client";

import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import juicebotAnimation from "../../public/animation/Juicebot.json";

interface LottieAnimationProps {
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  autoplay = true,
  loop = true,
  className,
}) => {
  return (
    <Player
      autoplay={autoplay}
      loop={loop}
      src={juicebotAnimation}
      className={className}
    />
  );
};

export default LottieAnimation;
