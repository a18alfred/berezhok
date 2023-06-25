import styles from '@/app/(site)/activate/[token]/page.module.scss';
import React from 'react';

export const metadata = {
    title: 'БЕРЕЖОК - Подтверждения адреса электронной почты',
};
const ActivateLayout = ({ children }: { children: React.ReactNode, }) => {
    return (
        <section className={styles.wrapper}>
            {children}
        </section>
    );
};
export default ActivateLayout;