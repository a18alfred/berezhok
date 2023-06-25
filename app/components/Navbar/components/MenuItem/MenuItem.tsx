'use client';

import React from 'react';
import styles from './MenuItem.module.scss';

interface MenuItemProps {
    onClick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
    return (
        <div onClick={onClick} className={styles.item}>
            {label}
        </div>
    );
};

export default MenuItem;