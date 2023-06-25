import styles from './DeleteReservationModal.module.scss';
import Button from '@/shared/components/Button/Button';
import React, { useState } from 'react';
import Heading from '@/shared/components/Heading/Heading';
import { useRouter } from 'next/navigation';
import useModal from '@/app/hooks/useModal';
import { useAppDispatch, useAppSelector } from '@/shared/state/hooks';
import { deleteReservation } from '@/app/requests/reservations';
import { toast } from 'react-hot-toast';
import { selectModalProps } from '@/shared/state/modal/slice';

const DeleteReservationModal = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const props = useAppSelector(selectModalProps);
    const { close } = useModal();

    if (!props || !props.reservationId) {
        close();
        return null;
    }
    const onDelete = () => {
        setIsLoading(true);
        deleteReservation(props.reservationId).then(() => {
            toast.success('Бронирование отменено');
            router.refresh();
        }).catch(() => {
            toast.error('Что-то пошло не так');
        }).finally(() => {
            close();
        });
    };

    return (
        <>
            <Heading
                title='Вы точно хотите отменить бронирование?'
                subtitle='Нажмите подвердить для отмены'
                center={true}
            />
            <div className={styles.buttonWrapper}>
                <Button
                    type='button'
                    outline
                    label='Назад'
                    disabled={isLoading}
                    onClick={close}
                />
                <Button
                    type='button'
                    label='Подтвердить'
                    isLoading={isLoading}
                    onClick={onDelete}
                />
            </div>
        </>
    );
};

export default DeleteReservationModal;
