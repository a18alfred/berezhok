'use client';

import styles from './page.module.scss';
import HomeButton from '@/shared/components/Button/HomeButton';
import Heading from '@/shared/components/Heading/Heading';

const Error = () => {
    return (
        <>
            <Heading
                title='Упс! Что-то пошло не так.'
                subtitle='Время действия ссылки истекло или ваш аккаунт уже
                    активирован.'
                center
            />
            <div className={styles.btnWrapper}>
                <HomeButton />
            </div>
        </>
    );
};

export default Error;