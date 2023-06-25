'use client';

import styles from './CategoryBox.module.scss';
import qs from 'query-string';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { ICategory } from '@/shared/types/types';
import Link from 'next/link';

interface CategoryBoxProps {
    category: ICategory;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
                                                     category,
                                                     selected,
                                                 }) => {
    const Icon = category.icon;
    return (
        <Link
            href={selected
                ? { pathname: '/' }
                : { pathname: '/', query: { category: category.name } }
            }
            className={`
            ${styles.wrapper}
            ${selected && styles['wrapper--selected']}
            `}
        >
            <Icon size={20} />
            <label>
                {category.label}
            </label>
        </Link>
    );
};

export default CategoryBox;