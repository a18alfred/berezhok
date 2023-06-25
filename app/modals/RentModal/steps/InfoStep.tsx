'use client';

import Heading from '@/shared/components/Heading/Heading';
import Counter from '@/shared/components/Input/Counter/Counter';
import { UseFormWatch } from 'react-hook-form';
import { ListingType } from '@/app/modals/RentModal/RentModal.config';
import React from 'react';
import Checkbox from '@/shared/components/Input/Checkbox/Checkbox';
import styles from '../RentModal.module.scss';
import amenities from '@/shared/constants/amenities';

interface InfoStepProps {
    watch: UseFormWatch<ListingType>;
    setCustomValue: (id: any, value: any) => void;
}

const InfoStep: React.FC<InfoStepProps> = ({ watch, setCustomValue }) => {
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');

    return (
        <>
            <Heading
                title='Поделитесь основными сведениями о вашем месте'
                subtitle='Что вы предлагаете?'
                center
            />

            <Counter
                onChange={(value) => setCustomValue('guestCount', value)}
                value={guestCount}
                title='Гости'
                subtitle='Сколько гостей вы допускаете?'
            />
            <hr />
            <Counter
                onChange={(value) => setCustomValue('roomCount', value)}
                value={roomCount}
                title='Комнаты'
                subtitle='Сколько у вас комнат?'
            />
            <hr />
            <Counter
                onChange={(value) => setCustomValue('bathroomCount', value)}
                value={bathroomCount}
                title='Ванны'
                subtitle='Сколько у вас ванных комнат?'
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
