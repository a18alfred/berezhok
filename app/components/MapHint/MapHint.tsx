'use client';

import styles from './MapHint.module.scss';
import { HiMap } from 'react-icons/hi';
import Link from 'next/link';

const MapHint = () => {
    return (
        <Link className={styles.wrapper} href={'/map'}>
            <span>Показать карту</span>
            <HiMap size={18} />
        </Link>
    );
};

export default MapHint;
