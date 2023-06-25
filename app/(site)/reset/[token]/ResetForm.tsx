'use client';

import styles from './page.module.scss';

import React from 'react';
import InputText from '@/shared/components/Input/Text/InputText';
import Button from '@/shared/components/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { passRegex } from '@/shared/constants/regex';

export const resetPassSchema = z
    .object({
        password: z.string().min(1, 'Введите пароль').max(32, 'Пароль должен быть не более 32 символов')
            .regex(passRegex, 'Пароль должен содержать от 8 до 32 символов, включать хотя бы одну заглавную латинскую букву, одну строчную, одну цифру и специальный символ'),
    });

export type ResetPassType = z.infer<typeof resetPassSchema>;

interface ResetFormProps {
    onSubmit: (data: ResetPassType) => void;
    isLoading: boolean;
}

const ResetForm: React.FC<ResetFormProps> = ({ onSubmit, isLoading }) => {
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPassType>({
        resolver: zodResolver(resetPassSchema),
    });

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
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

            <Button
                type='submit'
                isLoading={isLoading}
                label={'Продолжить'}
            />
        </form>
    );
};

export default ResetForm;
