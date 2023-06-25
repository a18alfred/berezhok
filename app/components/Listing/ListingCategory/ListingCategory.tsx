import React from 'react';
import styles from './ListingCategory.module.scss';
import categories from '@/shared/constants/categories';

interface ListingCategoryProps {
    categoryName: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({ categoryName }) => {
    if (!categories[categoryName]) return null;

    const Icon = categories[categoryName].icon;

    return (
        <div className={styles.wrapper}>
            <Icon size={40} />
            <div className={styles.categoryInfo}>
                <h6>
                    {categories[categoryName].label}
                </h6>
                <p>
                    {categories[categoryName].description}
                </p>
            </div>
        </div>
    );
};

export default ListingCategory;
