'use client';

import styles from './RegisterModal.module.scss';
import { signIn } from 'next-auth/react';
import { SlSocialVkontakte } from 'react-icons/sl';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
    useForm,
} from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/shared/components/Button/Button';
import Heading from '@/shared/components/Heading/Heading';
import InputText from '@/shared/components/Input/Text/InputText';
import useModal from '@/app/hooks/useModal';
import useUserApi from '@/app/hooks/useUserApi';
import { passRegex } from '@/shared/constants/regex';
import { FaYandex } from 'react-icons/fa';

const registerSchema = z
    .object({
        name: z.string().min(1, 'Введите имя').max(100),
        email: z.string().min(1, 'Введите email').email('Недействительный адрес'),
        password: z.string().min(1, 'Введите пароль').max(32, 'Пароль должен быть не более 32 символов')
            .regex(passRegex, 'Пароль должен содержать от 8 до 32 символов, включать хотя бы одну заглавную латинскую букву, одну строчную, одну цифру и специальный символ'),
    });

export type RegisterType = z.infer<typeof registerSchema>;
const RegisterModal = () => {
    const { openLogin } = useModal();
    const { isLoading, register: registerUser, error } = useUserApi();

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterType) => {
        registerUser({
            data,
            callback: () => {
                toast.success('Вы успешно зарегестрировались');
                openLogin();
            },
        });
    };

    useEffect(() => {
        if (error.register)
            toast.error(error.register);
    }, [error.register]);

    return (
        <>
            <form
                className={styles.registerModal}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Heading
                    title='Добро пожаловать на Бережок!'
                    subtitle='Создайте аккаунт'
                    center={true}
                />
                <InputText
                    id='email'
                    label='Email'
                    value={watch('email')}
                    disabled={isLoading}
                    register={register}
                    error={errors.email?.message}
                    required
                />
                <InputText
                    id='name'
                    label='Имя'
                    value={watch('name')}
                    disabled={isLoading}
                    register={register}
                    error={errors.name?.message}
                    required
                />
                <InputText
                    id='password'
                    label='Пароль'
                    value={watch('password')}
                    type='password'
                    disabled={isLoading}
                    register={register}
                    error={errors.password?.message}
                    required
                />
                <div className={styles.registerModal__btnWrapper}>
                    <Button
                        type='submit'
                        isLoading={isLoading}
                        label={'Продолжить'}
                    />
                </div>
            </form>
            <hr className={styles.registerModal__breaker} />

            <Button
                type='button'
                outline
                label='С помощью Yandex'
                disabled={isLoading}
                icon={FaYandex}
                iconProps={{ fill: '#F70000', strokeWidth: '20', stroke: '#F70000' }}
                onClick={() => signIn('yandex')}
            />

            <div className={styles.registerModal_footer}>
                <p>
                    Уже зарегистрированы? <span onClick={openLogin}>Войдите</span>
                </p>
            </div>
        </>
    );
};

export default RegisterModal;