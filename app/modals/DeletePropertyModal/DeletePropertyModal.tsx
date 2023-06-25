import { useAppSelector } from '@/shared/state/hooks';
import { selectModalProps } from '@/shared/state/modal/slice';
import useModal from '@/app/hooks/useModal';
import Heading from '@/shared/components/Heading/Heading';
import styles from './DeletePropertyModal.module.scss';
import Button from '@/shared/components/Button/Button';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { deleteListing } from '@/app/requests/listing';

const DeletePropertyModal = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const props = useAppSelector(selectModalProps);
    const { close } = useModal();

    if (!props || !props.listingId) {
        close();
        return null;
    }

    const onDelete = () => {
        setIsLoading(true);
        deleteListing(props.listingId).then(() => {
            toast.success('Объявление удалено');
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
                title='Вы точно хотите удалить объявление?'
                subtitle='Нажмите подвердить, чтобы продолжить'
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

export default DeletePropertyModal;
