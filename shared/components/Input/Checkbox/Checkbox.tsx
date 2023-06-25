'use client';

import styles from './Checkbox.module.scss';
import React, { ChangeEvent } from 'react';

interface CheckboxProps {
    checked: boolean;
    title: string;
    onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ title, onChange, checked }) => {
    const onCheck = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    return (
        <div className={styles.wrapper}>
            <input
                checked={checked}
                className={styles.checkbox}
                type='checkbox'
                onChange={onCheck}
            />
            <p
                onClick={() => onChange(!checked)}
                className={styles.title}
            >
                {title}
            </p>
        </div>
    );
};

export default Checkbox;
