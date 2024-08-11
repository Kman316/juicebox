"use client";

import React, { useState } from "react";
import LottieAnimation from "../../components/lottie/LottieAnimation";
import styles from "./Form.module.scss";
import Button from "../../components/button/Button";
import { useRouter } from "next/navigation";
import Title from "../../components/title/Title";
import BackButton from "../../components/backButton/BackButton";

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    email: "",
  });
  const router = useRouter();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { firstName: "", email: "" };

    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    }

    if (step === 2) {
      if (!formData.email) {
        newErrors.email = "Email address is required.";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email address is invalid.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const navigateToResults = () => {
    if (validateForm()) {
      const queryString = new URLSearchParams({
        name: formData.firstName,
        email: formData.email,
      }).toString();

      router.push(`/result?${queryString}`);
    }
  };

  const navigateToWalkthrough = () => {
    router.push("/walkthrough");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (validateForm()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <BackButton
          className={styles.backButton}
          ariaLabel="Go back to walkthrough"
          onClick={navigateToWalkthrough}
        />
        <Title className={styles.title} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.lottieContainer}>
          <LottieAnimation className={styles.lottie} />
        </div>
        {step === 1 && (
          <div className={styles.text}>
            Let’s start with the basics. Type in your first name.
          </div>
        )}
        {step === 2 && (
          <h3 className={styles.text}>
            How should we contact you? Type in your email address.
          </h3>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formStep}>
          <div className={styles.inputContainer}>
            {step === 1 && (
              <>
                <label htmlFor="firstName" className={styles.srOnly}>
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className={styles.input}
                  aria-label="First name"
                  aria-required="true"
                  aria-invalid={!!errors.firstName}
                  aria-describedby="firstNameError"
                />
                {errors.firstName && (
                  <p id="firstNameError" className={styles.error}>
                    {errors.firstName}
                  </p>
                )}
              </>
            )}
            {step === 2 && (
              <>
                <label htmlFor="email" className={styles.srOnly}>
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={styles.input}
                  aria-label="Email address"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby="emailError"
                />
                {errors.email && (
                  <p id="emailError" className={styles.error}>
                    {errors.email}
                  </p>
                )}
              </>
            )}
          </div>
          {step === 1 && (
            <Button
              text="Next"
              onClick={nextStep}
              className={styles.nextButton}
              ariaLabel="Go to next step"
            />
          )}
          {step === 2 && (
            <Button
              text="Next"
              onClick={navigateToResults}
              className={styles.nextButton}
              ariaLabel="Submit and go to results"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
