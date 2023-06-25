'use client';

import styles from './page.module.scss';
import HomeButton from '@/shared/components/Button/HomeButton';
import { useState } from 'react';
import { RequestStatusType } from '@/shared/types/types';
import Heading from '@/shared/components/Heading/Heading';
import ResetForm, { ResetPassType } from '@/app/(site)/reset/[token]/ResetForm';
import { changePasswordRequest } from '@/app/requests/user';

interface IParams {
    token: string;
}

const ResetPage = ({ params }: { params: IParams }) => {
    const [requestStatus, setRequestStatus] = useState<RequestStatusType>('idle');

    const onSubmit = (data: ResetPassType) => {
        setRequestStatus('isLoading');
        changePasswordRequest({ token: params.token, password: data.password })
            .then(() => {
                setRequestStatus('success');
            })
            .catch(() => {
                setRequestStatus('error');
            });
    };

    if (requestStatus === 'error')
        return (
            <>
                <Heading
                    title='Упс! Что-то пошло не так.'
                    subtitle='Время действия ссылки истекло, попробуйте восстановить пароль заново.'
                    center
                />

                <div className={styles.btnWrapper}>
                    <HomeButton />
                </div>
            </>
        );

    if (requestStatus === 'success')
        return (
            <>
                <Heading
                    title='Пароль успешно изменён'
                    subtitle='Теперь вы можете войти в свою учетную запись и продолжить пользоваться нашим сервисом.'
                    center
                />

                <div className={styles.btnWrapper}>
                    <HomeButton />
                </div>
            </>
        );

    return (
        <>
            <Heading
                title='Восстановление пароля'
                subtitle='Введите новый пароль'
                center
            />
            <ResetForm onSubmit={onSubmit} isLoading={requestStatus === 'isLoading'} />
        </>
    );
};

export default ResetPage;
