import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import React from 'react';
import Heading from '@/shared/components/Heading/Heading';
import { SearchType } from '@/app/modals/SearchModal/SearchModal.config';
import InputText from '@/shared/components/Input/Text/InputText';
import styles from '../SearchModal.module.scss';

interface PriceStepProps {
    watch: UseFormWatch<SearchType>;
    register: UseFormRegister<SearchType>;
    errors: FieldErrors<SearchType>;
}

const PriceStep: React.FC<PriceStepProps> = ({
                                                 watch,
                                                 register,
                                                 errors,
                                             }) => {
    return (
        <>
            <Heading
                title='Ценовой диапазон'
                subtitle='Цена указывается за ночь'
                center
            />
            <div className={styles.price_wrapper}>
                <InputText
                    id='price_min'
                    label='От'
                    register={register}
                    error={errors.price_min?.message}
                    value={watch('price_min').toString()}
                    formatPrice
                    type='number'
                />
                <InputText
                    id='price_max'
                    label='До'
                    register={register}
                    error={errors.price_max?.message}
                    value={watch('price_max').toString()}
                    formatPrice
                    type='number'
                />
            </div>
        </>
    );
};

export default PriceStep;
