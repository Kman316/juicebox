"use client";

import React, { useEffect, useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useRouter } from "next/navigation";
import styles from "../../styles/Slides.module.scss";
import { gsap } from "gsap";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";
import LottieAnimation from "../../components/lottie/LottieAnimation";
import BackButton from "../../components/backButton/BackButton";

const Walkthrough = () => {
  const router = useRouter();
  const swiperRef = useRef<Swiper | null>(null);

  const navigateToForm = () => {
    router.push("/form");
  };

  const navigateToHome = () => {
    router.push("/");
  };

  const slideRefs = [
    useRef<HTMLHeadingElement>(null),
    useRef<HTMLHeadingElement>(null),
    useRef<HTMLHeadingElement>(null),
  ];

  const animateText = (ref: React.RefObject<HTMLHeadingElement>) => {
    if (ref.current) {
      const text = ref.current.textContent || "";

      // Preserve spaces and wrap each letter in a span
      ref.current.innerHTML = text
        .split(" ")
        .map((word) =>
          word
            .split("")
            .map((letter) =>
              letter === " "
                ? "&nbsp;"
                : `<span class="${styles.letter}">${letter}</span>`,
            )
            .join(""),
        )
        .join(" ");

      const letters = ref.current.querySelectorAll(`.${styles.letter}`);
      gsap.fromTo(
        letters,
        { color: "#808080" }, // Grey color
        { color: "#ffffff", duration: 2, stagger: 0.05 }, // White color
      );
    }
  };

  useEffect(() => {
    // Initial animation on first slide
    animateText(slideRefs[0]);

    return () => {
      // Cleanup: restore original text content
      slideRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.innerHTML = ref.current.textContent || "";
        }
      });
    };
  }, []);

  return (
    <div>
      <Title text="juicebox" className={styles.title} />
      <BackButton
        className={styles.backButton}
        ariaLabel="Go back to home"
        onClick={navigateToHome}
      />
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }} // Store Swiper instance
        onSlideChange={(swiper) => {
          // Restart animation on slide change
          animateText(slideRefs[swiper.activeIndex]);
        }}
      >
        <SwiperSlide>
          <div className={styles.slide}>
            <LottieAnimation className={styles.lottie} />
            <h3 ref={slideRefs[0]} className={styles.text}>
              {
                "Professionals around the world shared how they feel about technology and I’ve listened. Now it’s your turn."
              }
            </h3>
            <Button
              text="Continue"
              onClick={() => swiperRef.current?.slideNext()}
              className={styles.continueButton}
              ariaLabel="Continue to next slide" // Add aria-label
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.slide} id="slide2">
            <LottieAnimation className={styles.lottie} />
            <h3 ref={slideRefs[1]} className={styles.text}>
              {
                "I’ll ask you a handful of meaningful questions and compare your responses with people in your industry."
              }
            </h3>
            <Button
              text="Continue"
              onClick={() => swiperRef.current?.slideNext()}
              className={styles.continueButton}
              ariaLabel="Continue to next slide" // Add aria-label
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.slide} id="slide3">
            <LottieAnimation className={styles.lottie} />
            <h3 ref={slideRefs[2]} className={styles.text}>
              {
                "You’ll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!"
              }
            </h3>
            <Button
              text="Get Started"
              onClick={navigateToForm}
              className={styles.getStartedButton}
              ariaLabel="Get Started with the form" // Add aria-label
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Walkthrough;
