'use client';

import styles from './SpinnerLoader.module.scss';

const SpinnerLoader = () => {
    return (
        <span className={styles.loader}></span>
    );
};

export default SpinnerLoader;

export const SpinnerLoaderXl = () => {
    return (
        <span className={styles.loaderXl}></span>
    );
};
