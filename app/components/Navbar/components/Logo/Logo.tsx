'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Logo.module.scss';

const Logo = () => {
    const router = useRouter();

    return (
        <div className={styles.logo} onClick={() => router.push('/')}>
            <Image
                priority={true}
                alt='Логотип'
                className={styles.logo__image}
                height={30}
                width={37}
                src={'/assets/svg/simple-logo.svg'}
            />
            <h1>БЕРЕЖОК</h1>
        </div>
    );
};

export default Logo;
