'use client';

import styles from './Button.module.scss';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useFavorite from '@/app/hooks/useFavorite';
import React from 'react';

interface HeartButtonProps {
    listingId: string;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId }) => {

    const { isFavorite, toggleFavorite } = useFavorite({
        listingId,
    });

    return (
        <div
            onClick={toggleFavorite}
            className={styles.heartButton}>
            <AiOutlineHeart
                size={28}
                className={styles.heartButton__iconOutline}
            />
            <AiFillHeart
                size={24}
                className={`
                ${styles.heartButton__iconFill} 
                ${isFavorite && styles['heartButton__iconFill--selected']}
                `}
            />
        </div>
    );
};

export default HeartButton;