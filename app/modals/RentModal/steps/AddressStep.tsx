'use client';

import styles from '@/app/modals/RentModal/RentModal.module.scss';
import Heading from '@/shared/components/Heading/Heading';
import React from 'react';
import 'react-dadata/dist/react-dadata.css';
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from 'react-dadata';

interface AddressStepProps {
    address: DaDataSuggestion<DaDataAddress> | undefined;
    setAddress: React.Dispatch<React.SetStateAction<DaDataSuggestion<DaDataAddress> | undefined>>;
    resetError: () => void;
}

const AddressStep: React.FC<AddressStepProps> = ({ address, setAddress, resetError }) => {
        return (
            <>
                <Heading
                    title='Где находится ваше место?'
                    subtitle='Введите адрес'
                    center
                />
                <div className={styles.address_input}>
                    <AddressSuggestions
                        token={process.env.NEXT_PUBLIC_DADATA_KEY as string}
                        value={address}
                        onChange={data => {
                            setAddress(data);
                            resetError();
                        }}
                    />
                </div>
            </>
        );
    }
;

export default AddressStep;
