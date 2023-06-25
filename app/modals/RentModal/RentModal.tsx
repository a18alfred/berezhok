'use client';

import React, { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import styles from './RentModal.module.scss';
import CategoryStep from '@/app/modals/RentModal/steps/CategoryStep';
import AddressStep from '@/app/modals/RentModal/steps/AddressStep';
import Button from '@/shared/components/Button/Button';
import { listingSchema, ListingType, STEPS } from '@/app/modals/RentModal/RentModal.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { DaDataAddress, DaDataSuggestion } from 'react-dadata';
import MapStep from '@/app/modals/RentModal/steps/MapStep';
import InfoStep from '@/app/modals/RentModal/steps/InfoStep';
import ImageStep from '@/app/modals/RentModal/steps/ImageStep';
import DescriptionStep from '@/app/modals/RentModal/steps/DescriptionStep';
import PriceStep from '@/app/modals/RentModal/steps/PriceStep';
import { RequestStatusType } from '@/shared/types/types';
import ResultStep from '@/app/modals/RentModal/steps/ResultStep';
import { createNewListing } from '@/app/requests/listing';
import { useRouter } from 'next/navigation';

const RentModal = () => {
    const [request, setRequest] = useState<RequestStatusType>('idle');
    const [address, setAddress] = useState<DaDataSuggestion<DaDataAddress> | undefined>(undefined);
    const [uploadedImage, setUploadedImage] = useState<string | undefined>(undefined);
    const [error, setError] = useState('');
    const [step, setStep] = useState(STEPS.CATEGORY);
    let contentBody: JSX.Element | null = null;
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        clearErrors,
        formState: {
            errors,
        },
        reset,
    } = useForm<ListingType>({
        resolver: zodResolver(listingSchema),
        defaultValues: {
            guestCount: 0,
            roomCount: 0,
            bathroomCount: 0,
            price: 0,
            wifi: false,
            airConditioner: false,
        },
    });

    const validateStep = (errorData: FieldErrors<ListingType>): boolean => {
        switch (step) {
            case STEPS.CATEGORY:
                if (errorData.category?.message) {
                    setError(errorData.category?.message);
                    return false;
                }
                break;
            case STEPS.ADDRESS:
                if (!address?.data?.geo_lat) {
                    setError('Вы должны указать точный адрес');
                    return false;
                }
                break;
            case STEPS.IMAGES:
                if (!uploadedImage) {
                    setError('Вы должны загрузить фото');
                    return false;
                }
                break;
            case STEPS.DESCRIPTION:
                if (errorData.title?.message || errorData.description?.message) {
                    return false;
                }
                break;
            case STEPS.PRICE:
                if (errorData.price?.message) {
                    return false;
                }
                break;
        }
        return true;
    };

    const resetError = () => {
        if (error) setError('');
    };

    const setCustomValue = (id: any, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const onBack = () => {
        resetError();
        setStep((value) => value - 1);
    };

    const onNext = (errorData: FieldErrors<ListingType>) => {
        if (!validateStep(errorData)) return;
        resetError();
        clearErrors();
        if (step !== STEPS.PRICE)
            setStep((value) => value + 1);
    };

    const onSubmit = async (data: ListingType) => {
        if (!uploadedImage || !address) return;
        setStep((value) => value + 1);
        setRequest('isLoading');
        try {
            await createNewListing({
                listing: data,
                imageBase64: uploadedImage,
                address: address.data,
            });
            router.refresh();
            setRequest('success');
        } catch (e) {
            setRequest('error');
            console.log(e);
        }
    };

    switch (step) {
        case STEPS.CATEGORY:
            contentBody = <CategoryStep
                watch={watch}
                resetError={resetError}
                setCustomValue={setCustomValue}
            />;
            break;
        case STEPS.ADDRESS:
            contentBody = <AddressStep
                address={address}
                setAddress={setAddress}
                resetError={resetError}
            />;
            break;
        case STEPS.MAP:
            contentBody = <MapStep
                address={address}
                setAddress={setAddress}
            />;
            break;
        case STEPS.INFO:
            contentBody = <InfoStep
                watch={watch}
                setCustomValue={setCustomValue}
            />;
            break;
        case STEPS.IMAGES:
            contentBody = <ImageStep
                resetError={resetError}
                uploadedImage={uploadedImage}
                setUploadedImage={setUploadedImage}
            />;
            break;
        case STEPS.DESCRIPTION:
            contentBody = <DescriptionStep
                watch={watch}
                register={register}
                errors={errors}
            />;
            break;
        case STEPS.PRICE:
            contentBody = <PriceStep
                watch={watch}
                register={register}
                errors={errors}
            />;
            break;
    }

    if (step === STEPS.RESULT)
        return <ResultStep request={request} />;

    return (
        <>
            <div className={styles.body_wrapper}>
                {contentBody}
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.btn_wrapper}>
                {step != STEPS.CATEGORY &&
                    <Button
                        type='button'
                        onClick={onBack}
                        label={'Назад'}
                        outline
                    />
                }
                <Button
                    onClick={handleSubmit(onSubmit, onNext)}
                    type='button'
                    label={step === STEPS.PRICE ? 'Добавить' : 'Продолжить'}
                />
            </div>
        </>
    );
};

export default RentModal;
