"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Homepage.module.scss";
import Lenis from "lenis";
import { useRouter } from "next/navigation";
import Title from "../components/title/Title";
import Button from "../components/button/Button";
import LottieAnimation from "../components/lottie/LottieAnimation";

const HomePage = () => {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const lottieRef = useRef<HTMLDivElement | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP animations for text overlays
    gsap.fromTo(
      `.${styles.textOverlay}`,
      { x: "-100%" },
      { x: "100%", opacity: 1, duration: 20, ease: "linear", repeat: -1 },
    );

    return () => {
      lenis.destroy();
    };
  }, []);

  const navigateToWalkthrough = () => {
    setIsLeaving(true);
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        duration: 0.5,
        opacity: 0.1, // Transition to transparent
        ease: "power2.inOut",
      });
    }
    if (lottieRef.current) {
      gsap.to(lottieRef.current, {
        duration: 0.5,
        scale: 0.5, // Resize the Lottie animation
        ease: "power2.inOut",
      });
    }
    setTimeout(() => {
      router.push("/walkthrough");
    }, 500);
  };

  return (
    <div className={`${styles.container} ${isLeaving ? styles.fadeOut : ""}`}>
      <div className={styles.headerContainer}>
        <Title className={styles.title} />
      </div>
      <div className={styles.lottieContainer} ref={lottieRef}>
        <LottieAnimation className={styles.lottie} />
      </div>
      <div className={styles.textContainer}>
        <div className={`${styles.textOverlay} ${styles.line1}`}>
          WA businesses feel confident about future growth
        </div>
        <div className={`${styles.textOverlay} ${styles.line2}`}>
          AI can't replace creativity
        </div>
        <div className={`${styles.textOverlay} ${styles.line3}`}>
          Sales measure true success
        </div>
        <div className={`${styles.textOverlay} ${styles.line4}`}>
          Human connection drives WA business
        </div>
        <div className={`${styles.textOverlay} ${styles.line5}`}>
          The primary barrier to digital transformation is financial investment
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <h2 className={styles.description}>
          Compare your thoughts on{" "}
          <span className={styles.highlight}>technology</span> with current
          industry opinions.
        </h2>
        <Button
          text="Get a reality check"
          onClick={navigateToWalkthrough}
          className={styles.getStartedButton}
          ariaLabel="Get a reality check button to begin walkthrough"
          ref={buttonRef} // Pass ref here
        />
      </div>
    </div>
  );
};

export default HomePage;
