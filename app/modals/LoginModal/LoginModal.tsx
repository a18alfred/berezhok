'use client';

import styles from './LoginModal.module.scss';
import React, { useEffect } from 'react';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import Input from '@/shared/components/Input/Text/InputText';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Heading from '@/shared/components/Heading/Heading';
import Button from '@/shared/components/Button/Button';
import { FaYandex } from 'react-icons/fa';
import useModal from '@/app/hooks/useModal';
import { toast } from 'react-hot-toast';
import useUserApi from '@/app/hooks/useUserApi';

const loginSchema = z.object({
    email: z.string().min(1, 'Введите email').email('Недействительный адрес'),
    password: z.string().min(1, 'Введите пароль').max(32),
});
export type LoginType = z.infer<typeof loginSchema>;

const LoginModal = () => {
    const { close, openRegister, openResetRequest } = useModal();
    const { isLoading, login, error } = useUserApi();

    const {
        watch,
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginType) => {
        login({
            provider: 'credentials',
            data,
            callback: () => {
                toast.success('Вы успешно вошли');
                close();
            },
        });
    };

    useEffect(() => {
        if (error.login)
            toast.error(error.login);
    }, [error.login]);

    return (
        <>
            <form
                className={styles.login__form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Heading
                    title='С возвращением!'
                    subtitle='Войдите, чтобы начать пользоваться Бережком'
                    center
                />
                <Input
                    id='email'
                    label='Email'
                    register={register}
                    error={errors.email?.message}
                    value={watch('email')}
                    required
                />
                <Input
                    id='password'
                    label='Пароль'
                    type='password'
                    register={register}
                    error={errors.password?.message}
                    value={watch('password')}
                    required
                />
                <p className={styles.login__passReset} onClick={openResetRequest}>
                    Забыли пароль?
                </p>
                <div className={styles.login__btnWrapper}>
                    <Button
                        type='submit'
                        isLoading={isLoading}
                        label={'Войти'}
                    />
                </div>
            </form>

            <hr className={styles.login__breaker} />

            <Button
                type='button'
                outline
                label='С помощью Yandex'
                disabled={isLoading}
                icon={FaYandex}
                iconProps={{ fill: '#F70000', strokeWidth: '20', stroke: '#F70000' }}
                onClick={() => signIn('yandex')}
            />
            <div className={styles.login__footer}>
                <p>
                    Первый раз у нас? <span onClick={openRegister}> Создайте аккаунт</span>
                </p>
            </div>
        </>
    );
};

export default LoginModal;