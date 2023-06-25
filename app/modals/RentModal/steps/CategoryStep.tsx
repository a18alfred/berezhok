'use client';

import styles from '../RentModal.module.scss';
import Heading from '@/shared/components/Heading/Heading';
import categories from '@/shared/constants/categories';
import CategoryInput from '@/shared/components/Input/Category/CategoryInput';
import React from 'react';
import { UseFormWatch } from 'react-hook-form';
import { ListingType } from '@/app/modals/RentModal/RentModal.config';
import CategoryBox from '@/shared/components/CategoryBox/CategoryBox';

interface CategoryStepProps {
    watch: UseFormWatch<ListingType>;
    resetError: () => void;
    setCustomValue: (id: any, value: any) => void;
}

const CategoryStep: React.FC<CategoryStepProps> = ({ watch, setCustomValue, resetError }) => {
    const currentCategory = watch('category');

    return (
        <>
            <Heading
                title='Что из перечисленного лучше всего описывает ваше место?'
                subtitle='Выберите категорию'
                center
            />
            <div className={styles.category_list}>
                {Object.values(categories).map((item) => (
                    <div key={item.label} className={styles.category_wrapper}>
                        <CategoryInput
                            category={item}
                            onClick={() => {
                                resetError();
                                setCustomValue('category', item.name);
                            }}
                            selected={currentCategory === item.name}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default CategoryStep;
