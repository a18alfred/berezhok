import styles from './ListingSkeleton.module.scss';
import React from 'react';

const ListingSkeleton = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.headerWrapper}>
                    <h2></h2>
                    <div className={styles.headerInfo}>
                        <span className={styles.headerAddress}></span>
                        <span className={styles.headerShare}></span>
                    </div>
                </div>
                <div className={styles.image}></div>
                <div className={styles.infoReservation}>
                    <div className={styles.infoWrapper}>
                        <div>
                            <div className={styles.basicInfo}></div>
                            <div className={styles.basicInfo}></div>
                        </div>
                        <hr />
                        <div>
                            <div className={styles.basicInfo}></div>
                            <div className={styles.basicInfo}></div>
                        </div>
                        <hr />
                        <div>
                            <div className={styles.basicInfo}></div>
                            <div className={styles.basicInfo}></div>
                            <div className={styles.basicInfo}></div>
                            <div className={styles.basicInfo}></div>
                        </div>
                        <hr />
                        <div className={styles.map}></div>
                    </div>
                    <div className={styles.reservation}></div>
                </div>
            </div>
        </div>
    );
};

export default ListingSkeleton;
