import { UseFormRegister, UseFormWatch, FieldErrors } from 'react-hook-form';
import { ListingType } from '@/app/modals/RentModal/RentModal.config';
import React from 'react';
import Heading from '@/shared/components/Heading/Heading';
import InputText from '@/shared/components/Input/Text/InputText';

interface DescriptionStepProps {
    watch: UseFormWatch<ListingType>;
    register: UseFormRegister<ListingType>;
    errors: FieldErrors<ListingType>;
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({
                                                             watch,
                                                             register,
                                                             errors,
                                                         }) => {
    return (
        <>
            <Heading
                title='Как бы вы описали ваше место?'
                subtitle='Добавьте описания деталей и особенностей'
                center
            />
            <InputText
                id='title'
                label='Название'
                register={register}
                error={errors.title?.message}
                value={watch('title')}
            />
            <InputText
                id='description'
                label='Описание'
                register={register}
                error={errors.description?.message}
                value={watch('description')}
                isTextArea={true}
            />
        </>
    );
};

export default DescriptionStep;
