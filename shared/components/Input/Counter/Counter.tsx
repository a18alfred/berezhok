'use client';

import React, { useCallback } from 'react';
import styles from './Counter.module.scss';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
                                             title,
                                             subtitle,
                                             value,
                                             onChange,
                                         }) => {
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const onReduce = useCallback(() => {
        if (value === 0) {
            return;
        }

        onChange(value - 1);
    }, [onChange, value]);

    return (
        <div className={styles.counter}>
            <div className={styles.counter__title}>
                <h4>
                    {title}
                </h4>
                <p>
                    {subtitle}
                </p>
            </div>

            <div className={styles.counter__body}>
                <button
                    onClick={onReduce}
                    className={styles.counter__btn}
                >
                    <AiOutlineMinus />
                </button>
                <p className={styles.counter__value}>
                    {value}
                </p>
                <button
                    onClick={onAdd}
                    className={styles.counter__btn}
                >
                    <AiOutlinePlus />
                </button>
            </div>
        </div>
    );
};

export default Counter;