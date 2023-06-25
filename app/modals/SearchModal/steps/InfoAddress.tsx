'use client';

import { UseFormWatch } from 'react-hook-form';
import React from 'react';
import Heading from '@/shared/components/Heading/Heading';
import Counter from '@/shared/components/Input/Counter/Counter';
import styles from '../SearchModal.module.scss';
import amenities from '@/shared/constants/amenities';
import Checkbox from '@/shared/components/Input/Checkbox/Checkbox';
import { SearchType } from '@/app/modals/SearchModal/SearchModal.config';

interface InfoStepProps {
    watch: UseFormWatch<SearchType>;
    setCustomValue: (id: any, value: any) => void;
}

const InfoStep: React.FC<InfoStepProps> = ({ watch, setCustomValue }) => {
    return (
        <>
            <Heading
                title='Дополнительные параметры'
                subtitle='Для более точного поиска'
                center
            />

            <Counter
                onChange={(value) => setCustomValue('guestCount', value)}
                value={watch('guestCount')}
                title='Гости'
                subtitle='Сколько гостей приедет?'
            />
            <hr />
            <Counter
                onChange={(value) => setCustomValue('roomCount', value)}
                value={watch('roomCount')}
                title='Комнаты'
                subtitle='Сколько комнат вам необходимо?'
            />
            <hr />
            <Counter
                onChange={(value) => setCustomValue('bathroomCount', value)}
                value={watch('bathroomCount')}
                title='Ванны'
                subtitle='Сколько ванных комнат вам нужно?'
            />
            <hr />

            <div className={styles.checkbox_wrapper}>
                <h4>Удобства</h4>
                {Object.values(amenities).map((amenity) => (
                    <Checkbox
                        key={amenity.name}
                        checked={watch(amenity.name as any)}
                        onChange={(value) => setCustomValue(amenity.name, value)}
                        title={amenity.label}
                    />
                ))}
            </div>
        </>
    );
};

export default InfoStep;
