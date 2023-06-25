'use client';

import styles from './Loader.module.scss';
import { SpinnerLoaderXl } from '@/shared/components/Loader/SpinnerLoader';

const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <SpinnerLoaderXl />
        </div>
    );
};

export default Loader;