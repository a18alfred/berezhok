'use client';

import React from 'react';
import styles from './CategoryInput.module.scss';
import { ICategory } from '@/shared/types/types';

interface CategoryInputProps {
    category: ICategory;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
                                                         category,
                                                         selected,
                                                         onClick,
                                                     }) => {
    const Icon = category.icon;
    return (
        <div
            onClick={() => onClick(category.name)}
            className={`${styles.input} ${selected && styles['input--selected']}`}
        >
            <Icon className={styles.icon} />
            <label>
                {category.label}
            </label>
        </div>
    );
};

export default CategoryInput;