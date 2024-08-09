'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import LottieAnimation from '../../components/lottie/LottieAnimation';
import styles from '../../styles/Result.module.scss';
import Title from '../../components/title/Title';
import { useRouter } from 'next/navigation';
import BackButton from '../../components/backButton/BackButton';
import { Suspense } from 'react';

const ResultPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const navigateToForm = () => {
        router.push('/form');
    };
    
    // Ensure searchParams is not null
    const name = searchParams?.get('name') || 'Guest';
    const email = searchParams?.get('email') || 'Not provided';

    return (
        <div className={styles.container}>
            <Title text="juicebox" className={styles.title} />
            <BackButton 
                className={styles.backButton}
                ariaLabel="Go back to walkthrough"
                onClick={navigateToForm}
            />
            <div className={styles.lottieContainer}>
                <LottieAnimation className={styles.lottie} />
            </div>
            <h2 className={styles.text}>Thanks, {name}! Here’s your reality check summary:</h2>
            <h2 className={styles.text}>Email: {email}</h2>
        </div>
    );
};

// Wrapping ResultPage with Suspense to handle async rendering
const ResultPageWithSuspense = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <ResultPage />
    </Suspense>
);

export default ResultPageWithSuspense;
