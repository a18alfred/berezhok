import styles from './ReservationModal.module.scss';
import Heading from '@/shared/components/Heading/Heading';
import React, { useState } from 'react';
import { useAppSelector } from '@/shared/state/hooks';
import useModal from '@/app/hooks/useModal';
import Button from '@/shared/components/Button/Button';
import { createReservation } from '@/app/requests/reservations';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { selectModalProps } from '@/shared/state/modal/slice';

const ReservationModal = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const props = useAppSelector(selectModalProps);
    const { close } = useModal();

    if (!props
        || !props.startDate
        || !props.endDate
        || !props.listingId
        || !props.listingTitle
        || !props.totalPrice
        || !props.fullAddress
    ) {
        close();
        return null;
    }

    const {
        listingTitle,
        listingId,
        fullAddress,
        totalPrice,
    } = props;

    const startDate = new Date(props.startDate);
    const endDate = new Date(props.endDate);

    const onConfirm = () => {
        setIsLoading(true);

        createReservation({
            totalPrice,
            startDate: startDate,
            endDate: endDate,
            listingId: listingId,
        }).then(() => {
            toast.success('Место забронировано!');
            close();
            router.push('/reservations');
        })
            .catch((e) => {
                console.log(e);
                setIsLoading(false);
                toast.error('Что-то пошло не так');
            });
    };

    return (
        <>
            <Heading
                title='Подтвердите бронирование'
                subtitle='Убедитесь, что даты указаны верно'
                center={true}
            />
            <div className={styles.infoWrapper}>
                <span>Место:</span>
                <span>{listingTitle}</span>
                <span>Адрес:</span>
                <span>{fullAddress}</span>

                <span>Заезд:</span>
                <span>{startDate.toLocaleDateString()}</span>

                <span>Выезд:</span>
                <span>{endDate.toLocaleDateString()}</span>
                <span>Цена:</span>
                <span>{totalPrice} ₽</span>
            </div>
            <div className={styles.buttonWrapper}>
                <Button
                    type='button'
                    outline
                    label='Отмена'
                    disabled={isLoading}
                    onClick={close}
                />
                <Button
                    type='button'
                    label='Подтвердить'
                    isLoading={isLoading}
                    onClick={onConfirm}
                />
            </div>
        </>
    );
};

export default ReservationModal;
