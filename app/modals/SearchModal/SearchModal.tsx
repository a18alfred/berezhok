'use client';

import styles from './SearchModal.module.scss';
import React, { useState } from 'react';
import { DaDataAddress, DaDataSuggestion } from 'react-dadata';
import { searchSchema, SearchType, STEPS } from './SearchModal.config';
import { Range } from 'react-date-range';
import { useRouter } from 'next/navigation';
import { addDays, formatISO } from 'date-fns';
import Button from '@/shared/components/Button/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CategoryStep from '@/app/modals/SearchModal/steps/CategoryStep';
import AddressStep from '@/app/modals/SearchModal/steps/AddressStep';
import InfoAddress from '@/app/modals/SearchModal/steps/InfoAddress';
import PriceStep from '@/app/modals/SearchModal/steps/PriceStep';
import DateStep from '@/app/modals/SearchModal/steps/DateStep';
import qs from 'query-string';
import useModal from '@/app/hooks/useModal';
import getDbReadyAddress from '@/shared/libs/getDbReadyAddress';
import { useAppDispatch, useAppSelector } from '@/shared/state/hooks';
import { save_search_params, selectListingLastSearchParams } from '@/shared/state/listing/slice';

const SearchModal = () => {
    const { close } = useModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const dispatch = useAppDispatch();
    const lastSearchParams = useAppSelector(selectListingLastSearchParams);
    const [address, setAddress] = useState<DaDataSuggestion<DaDataAddress> | undefined>(lastSearchParams.address);
    const [category, setCategory] = useState<string | undefined>(lastSearchParams.category);
    const [dateRange, setDateRange] = useState<Range>(
        lastSearchParams.dateRange
            ? lastSearchParams.dateRange
            : {
                startDate: addDays(new Date().setHours(0, 0, 0, 0), 1),
                endDate: addDays(new Date().setHours(0, 0, 0, 0), 2),
                key: 'selection',
            },
    );

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
    } = useForm<SearchType>({
        resolver: zodResolver(searchSchema),
        defaultValues: lastSearchParams.details,
    });

    const setCustomValue = (id: any, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const onBack = () => {
        setStep((value) => value - 1);
        clearErrors();
    };

    const onError = () => {
        if (step !== STEPS.PRICE)
            setStep((value) => value + 1);
    };

    const onNext = (data: SearchType) => {
        if (step !== STEPS.PRICE) {
            setStep((value) => value + 1);
            return;
        }

        let updatedQuery: any = { ...data };

        if (category)
            updatedQuery.category = category;

        if (address?.data) {
            updatedQuery = { ...updatedQuery, ...getDbReadyAddress(address.data) };
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true, skipEmptyString: true });

        dispatch(save_search_params({
            dateRange,
            address,
            category,
            details: data,
        }));

        router.push(url);
        close();
    };

    switch (step) {
        case STEPS.CATEGORY:
            contentBody =
                <CategoryStep
                    category={category}
                    setCategory={setCategory}
                />;
            break;
        case STEPS.ADDRESS:
            contentBody =
                <AddressStep
                    address={address}
                    setAddress={setAddress}
                />;
            break;
        case STEPS.DATE:
            contentBody =
                <DateStep
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                />;
            break;
        case STEPS.INFO:
            contentBody = <InfoAddress
                watch={watch}
                setCustomValue={setCustomValue}
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

    return (
        <>
            <div className={styles.body_wrapper}>
                {contentBody}
            </div>
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
                    onClick={handleSubmit(onNext, onError)}
                    type='button'
                    label={step === STEPS.PRICE ? 'Искать' : 'Продолжить'}
                />
            </div>
        </>
    );
};

export default SearchModal;
