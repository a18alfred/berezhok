import styles from './ListingCard.module.scss';
import React from 'react';

const ListingSkeleton = () => {
    return (
        <div
            className={styles.listingCard}
        >
            <div className={styles.listingCard_wrapper}>
                <div className={styles.listingSkeleton_imageWrapper}>
                </div>
                <p className={styles.listingSkeleton_address}>
                </p>
                <p className={styles.listingSkeleton_dates}>
                </p>
                <p className={styles.listingSkeleton_price}>
                </p>
            </div>
        </div>
    );
};

export default ListingSkeleton;