import React from 'react';
import styles from './BarLoader.module.scss';

interface BarLoaderProps {
    isLoading: boolean;
}

const BarLoader: React.FC<BarLoaderProps> = ({ isLoading }) => {
    if (!isLoading) return null;
    return (
        <div className={styles.loader} />
    );
};

export default BarLoader;
