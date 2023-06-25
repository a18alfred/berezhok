'use client';

import React from 'react';
import styles from './Button.module.scss';
import { IconType, IconBaseProps } from 'react-icons';
import SpinnerLoader from '@/shared/components/Loader/SpinnerLoader';

interface ButtonProps {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    isLoading?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    iconProps?: IconBaseProps;
    type?: 'button' | 'submit';
    notFull?: boolean;
}

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           onClick,
                                           disabled,
                                           isLoading,
                                           outline,
                                           small,
                                           icon: Icon,
                                           iconProps,
                                           type = 'button',
                                           notFull,
                                       }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
            ${styles.button} 
            ${outline && styles['button--outline']} 
            ${small && styles['button--small']}
            ${isLoading && styles['button--loading']}
            ${notFull && styles['button--notFull']}
            `}
        >
            {
                isLoading
                    ? <SpinnerLoader />
                    : <>
                        {Icon && <Icon size={24} className={styles.button__icon} {...iconProps} />}
                        {label}
                    </>
            }
        </button>
    );
};

export default Button;
