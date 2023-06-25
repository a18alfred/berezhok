'use client';

import Heading from '@/shared/components/Heading/Heading';
import React, { Dispatch, SetStateAction } from 'react';
import categories from '@/shared/constants/categories';
import styles from '../SearchModal.module.scss';
import CategoryInput from '@/shared/components/Input/Category/CategoryInput';

interface CategoryStepProps {
    category: string | undefined;
    setCategory: Dispatch<SetStateAction<string | undefined>>;
}

const CategoryStep: React.FC<CategoryStepProps> = ({ category, setCategory }) => {
    return (
        <>
            <Heading
                title='Что вы ищете?'
                subtitle='Выберите категорию или продолжите без'
                center
            />
            <div className={styles.category_list}>
                {Object.values(categories).map((item) => (
                    <div key={item.label} className={styles.category_wrapper}>
                        <CategoryInput
                            category={item}
                            onClick={() => {
                                if (category !== item.name)
                                    setCategory(item.name);
                                else setCategory('');
                            }}
                            selected={category === item.name}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default CategoryStep;
