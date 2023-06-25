'use client';

import {
    UseFormRegister,
} from 'react-hook-form';
import styles from './InputText.module.scss';
import React from 'react';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    isTextArea?: boolean;
    value: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<any>,
    error?: string
}

const InputText: React.FC<InputProps> = ({
                                             id,
                                             label,
                                             type = 'text',
                                             isTextArea,
                                             value,
                                             disabled,
                                             formatPrice,
                                             register,
                                             required,
                                             error,
                                         }) => {
    return (
        <div className={styles.wrapper}>
            {formatPrice && (
                <span className={styles.wrapper__sign}>₽</span>
            )}
            {isTextArea
                ? <textarea
                    id={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    placeholder=' '
                    className={`
                    ${styles.input} 
                    ${styles.textarea} 
                    ${error && styles['input--error']}
                    `}
                />
                : <input
                    id={id}
                    disabled={disabled}
                    {...register(id, type === 'number'
                        ? { required, valueAsNumber: true }
                        : { required })}
                    {...register(id, { required })}
                    placeholder=' '
                    type={type}
                    className={`
                    ${styles.input} 
                    ${formatPrice && styles['input--price']} 
                    ${error && styles['input--error']}
                    `}
                />
            }
            <label
                className={`
                ${styles.label} 
                ${formatPrice && styles['label--price']} 
                ${error && styles['label--error']}
                ${value && styles['label--value']}
                `}>
                {label}
            </label>

            {error &&
                <p className={styles.errorMessage}>
                    {error}
                </p>
            }

        </div>
    );
};

export default InputText;