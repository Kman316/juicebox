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

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <BackButton 
                    className={styles.backButton}
                    ariaLabel="Go back to walkthrough"
                    onClick={navigateToForm}
                />
                <Title text="juicebox" className={styles.title} />
            </div>
            <div className={styles.lottieContainer}>
                <LottieAnimation className={styles.lottie} />
            </div>
            <div className={styles.text}>Thanks, {name}! Now it's time to get a reality check. &#13;This will take 2-3 minutes</div>
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
