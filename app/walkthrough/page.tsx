"use client";

import React, { useEffect, useRef, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useRouter } from "next/navigation";
import styles from "./Walkthrough.module.scss";
import { gsap } from "gsap";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";
import LottieAnimation from "../../components/lottie/LottieAnimation";
import BackButton from "../../components/backButton/BackButton";
import { Swiper as SwiperType } from 'swiper';

const Walkthrough = () => {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);
  const lottieRef = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  const navigateToForm = () => {
    router.push("/form");
  };

  const navigateToHome = () => {
    setIsLeaving(true);
    if (swiperRef.current) {
      gsap.to(swiperRef.current.el, {
        duration: 0.5,
        opacity: 0.1,
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
      router.push("/");
    }, 500);
  };

  const slideRefs = [
    useRef<HTMLHeadingElement>(null),
    useRef<HTMLHeadingElement>(null),
    useRef<HTMLHeadingElement>(null),
  ];

  const animateText = (ref: React.RefObject<HTMLHeadingElement>) => {
    if (ref.current) {
      const text = ref.current.textContent || "";

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
        { color: "#ffffff", duration: 2, stagger: 0.05 },
      );
    }
  };

  useEffect(() => {
    animateText(slideRefs[0]);

    return () => {
      slideRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.innerHTML = ref.current.textContent || "";
        }
      });
    };
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      gsap.fromTo(
        swiperRef.current.el,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );
    }
  }, []);

  return (
    <div className={`${styles.container} ${isLeaving ? styles.fadeOut : ""}`}>
      <div className={styles.headerContainer}>
        {activeSlide === 0 && (
          <BackButton
            className={styles.backButton}
            ariaLabel="Go back to home"
            onClick={navigateToHome}
          />
        )}
        {activeSlide === 1 && (
          <BackButton
            className={styles.backButton}
            ariaLabel="Go back to first slide"
            onClick={() => swiperRef.current?.slidePrev()}
          />
        )}
        {activeSlide === 2 && (
          <BackButton
            className={styles.backButton}
            ariaLabel="Go back to second slide"
            onClick={() => swiperRef.current?.slidePrev()}
          />
        )}
        <Title className={styles.title} />
      </div>
      <div className={styles.contentContainer}>
        <LottieAnimation className={styles.lottie} />
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            gsap.fromTo(
              swiperRef.current.el,
              { opacity: 0 },
              { opacity: 1, duration: 0.5 }
            );
          }}
          onSlideChange={(swiper) => {
            setActiveSlide(swiper.activeIndex);
            animateText(slideRefs[swiper.activeIndex]);
          }}
        >
          <SwiperSlide>
            <div className={styles.slide}>
              <h3 ref={slideRefs[0]} className={styles.text}>
                {"Professionals around the world shared how they feel about technology and I’ve listened. Now it’s your turn."}
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slide} id="slide2">
              <h3 ref={slideRefs[1]} className={styles.text}>
                {"I’ll ask you a handful of meaningful questions and compare your responses with people in your industry."}
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slide} id="slide3">
              <h3 ref={slideRefs[2]} className={styles.text}>
                {"You’ll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!"}
              </h3>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.buttonContainer}>
        {activeSlide === 0 && (
          <Button
            text="Continue"
            onClick={() => swiperRef.current?.slideNext()}
            className={styles.continueButton}
            ariaLabel="Continue to next slide"
          />
        )}
        {activeSlide === 1 && (
          <Button
            text="Continue"
            onClick={() => swiperRef.current?.slideNext()}
            className={styles.continueButton}
            ariaLabel="Continue to next slide"
          />
        )}
        {activeSlide === 2 && (
          <Button
            text="Get Started"
            onClick={navigateToForm}
            className={styles.getStartedButton}
            ariaLabel="Get Started with the form"
          />
        )}
      </div>
    </div>
  );
};

export default Walkthrough;
