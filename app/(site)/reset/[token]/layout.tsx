import styles from './page.module.scss';
import React from 'react';
import ClientOnly from '@/shared/components/ClientOnly/ClientOnly';

export const metadata = {
    title: 'БЕРЕЖОК - Восстановление пароля',
};
const ActivateLayout = ({ children }: { children: React.ReactNode, }) => {
    return (
        <ClientOnly>
            <section className={styles.wrapper}>
                {children}
            </section>
        </ClientOnly>
    );
};
export default ActivateLayout;