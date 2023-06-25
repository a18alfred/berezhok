import styles from './ResetRequestModal.module.scss';
import Input from '@/shared/components/Input/Text/InputText';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/shared/components/Button/Button';
import { resetRequest } from '@/app/requests/user';
import { RequestStatusType } from '@/shared/types/types';
import { toast } from 'react-hot-toast';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

const resetRequestSchema = z.object({
    email: z.string().min(1, 'Введите email').email('Недействительный адрес'),
});
export type ResetRequestType = z.infer<typeof resetRequestSchema>;
const ResetRequestModal = () => {
    const [requestStatus, setRequestStatus] = useState<RequestStatusType>('idle');

    const {
        watch,
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<ResetRequestType>({
        resolver: zodResolver(resetRequestSchema),
    });

    const onSubmit = (data: ResetRequestType) => {
        setRequestStatus('isLoading');
        resetRequest({ email: data.email })
            .then(() => {
                setRequestStatus('success');
            })
            .catch(() => {
                setRequestStatus('error');
                toast.error('Что-то пошло не так');
            });
    };

    if (requestStatus === 'success')
        return (
            <div className={styles.wrapper}>
                <div className={styles.iconWrapper}>
                    <MdOutlineMarkEmailRead size={48} />
                </div>
                <p>На вашу почту отправлено письмо со ссылкой для восстановления пароля. Перейдите по ссылке и
                    придумайте
                    себе новый пароль.</p>
            </div>
        );

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.wrapper}
        >
            <p>Введите адрес вашей электронной почты</p>
            <Input
                id='email'
                label='Email'
                register={register}
                error={errors.email?.message}
                value={watch('email')}
                required
            />
            <div className={styles.btnWrapper}>
                <Button
                    disabled={requestStatus !== 'idle'}
                    type='submit'
                    isLoading={requestStatus === 'isLoading'}
                    label={'Продолжить'}
                />
            </div>
        </form>
    );
};

export default ResetRequestModal;

//На вашу почту отправлено письмо со ссылкой для восстановления пароля. Перейдите по ссылке и придумайте себе новый пароль.
