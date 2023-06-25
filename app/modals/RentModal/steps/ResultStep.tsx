'use client';

import { RequestStatusType } from '@/shared/types/types';
import React from 'react';
import Heading from '@/shared/components/Heading/Heading';
import styles from '@/app/modals/RentModal/RentModal.module.scss';
import { SpinnerLoaderXl } from '@/shared/components/Loader/SpinnerLoader';
import Button from '@/shared/components/Button/Button';
import useModal from '@/app/hooks/useModal';

interface ResultStepProps {
    request: RequestStatusType;
}

const ResultStep: React.FC<ResultStepProps> = ({ request }) => {
    const { close } = useModal();

    if (request === 'idle') return null;

    if (request === 'isLoading') return (
        <>
            <Heading
                title='Мы загружаем ваше объявление'
                subtitle='Это может занять до минуты '
                center
            />
            <div className={styles.loader}>
                <SpinnerLoaderXl />
            </div>
        </>
    );

    return (
        <>
            <Heading
                title={request === 'success'
                    ? 'Ваше объявление опубликовано'
                    : 'Что-то пошло не так'}
                subtitle={request === 'success'
                    ? 'Теперь оно видно всем'
                    : 'Подождите некоторое время и попробуйте снова'}
                center
            />

            <div className={styles.loader}>
                <Button
                    type='button'
                    label={'Закрыть'}
                    onClick={close}
                />
            </div>
        </>
    );
};

export default ResultStep;
