'use client';

import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from 'react-dadata';
import React from 'react';
import Heading from '@/shared/components/Heading/Heading';
import styles from '../SearchModal.module.scss';

interface AddressStepProps {
    address: DaDataSuggestion<DaDataAddress> | undefined;
    setAddress: React.Dispatch<React.SetStateAction<DaDataSuggestion<DaDataAddress> | undefined>>;
}

const AddressStep: React.FC<AddressStepProps> = ({ address, setAddress }) => {
    return (
        <>
            <Heading
                title='Где вы ищете?'
                subtitle='Введите регион, населённый пункт или конкретный адрес'
                center
            />
            <div className={styles.address_input}>
                <AddressSuggestions
                    token={process.env.NEXT_PUBLIC_DADATA_KEY as string}
                    value={address}
                    onChange={data => {
                        setAddress(data);
                    }}
                />
            </div>
        </>
    );
};

export default AddressStep;
