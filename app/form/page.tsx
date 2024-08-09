"use client";

import React, { useState } from "react";
import LottieAnimation from "../../components/lottie/LottieAnimation";
import styles from "../../styles/Form.module.scss";
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
      // Construct the URL with query parameters
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

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <Title text="juicebox" className={styles.title} />
      <BackButton
        className={styles.backButton}
        ariaLabel="Go back to walkthrough"
        onClick={navigateToWalkthrough}
      />
      <div className={styles.lottieContainer}>
        <LottieAnimation className={styles.lottie} />
      </div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={styles.formStep}>
            <h3 className={styles.text}>
              Let’s start with the basics. Type in your first name.
            </h3>
            <div className={styles.inputContainer}>
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
                aria-describedby="firstNameError" // Link to error message
              />
              {errors.firstName && (
                <p id="firstNameError" className={styles.error}>
                  {errors.firstName}
                </p>
              )}
            </div>
            <Button
              text="Next"
              onClick={nextStep}
              className={styles.nextButton}
              ariaLabel="Go to next step" // Add aria-label
            />
          </div>
        )}
        {step === 2 && (
          <div className={styles.formStep}>
            <h3 className={styles.text}>
              How should we contact you? Type in your email address.
            </h3>
            <div className={styles.inputContainer}>
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
                aria-describedby="emailError" // Link to error message
              />
              {errors.email && (
                <p id="emailError" className={styles.error}>
                  {errors.email}
                </p>
              )}
            </div>
            <Button
              text="Next"
              onClick={navigateToResults}
              className={styles.nextButton}
              ariaLabel="Submit and go to results" // Add aria-label
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
