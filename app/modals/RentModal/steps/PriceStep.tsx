import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ListingType } from '@/app/modals/RentModal/RentModal.config';
import React from 'react';
import Heading from '@/shared/components/Heading/Heading';
import InputText from '@/shared/components/Input/Text/InputText';

interface PriceStepProps {
    watch: UseFormWatch<ListingType>;
    register: UseFormRegister<ListingType>;
    errors: FieldErrors<ListingType>;
}

const PriceStep: React.FC<PriceStepProps> = ({
                                                 watch,
                                                 register,
                                                 errors,
                                             }) => {
    return (
        <>
            <Heading
                title='Введите цену'
                subtitle='Укажите цену за ночь'
                center
            />
            <InputText
                id='price'
                label='Цена за ночь'
                register={register}
                error={errors.price?.message}
                value={watch('price').toString()}
                formatPrice
                type='number'
            />
        </>
    );
};

export default PriceStep;
