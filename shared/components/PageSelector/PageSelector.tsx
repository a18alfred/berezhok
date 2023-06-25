'use client';

import React from 'react';
import styles from './PageSelector.module.scss';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

interface PageSelectorProps {
    totalPages: number;
}

type PageSelectorNumber = number | '...'

const PageSelector: React.FC<PageSelectorProps> = React.memo(({ totalPages }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const query = new URLSearchParams(searchParams || '');
    const page: number = parseInt(searchParams?.get('page') || '1');
    const isBack = page > 1;
    const isForward = page < totalPages;
    const numberElements = [];
    const onBack = () => {
        if (isBack) {
            query.set('page', String(page - 1));
            router.push(`${pathname}?${query.toString()}`);
        }
    };

    const onForward = () => {
        if (isForward) {
            query.set('page', String(page + 1));
            router.push(`${pathname}?${query.toString()}`);
        }
    };

    const onNumberClick = (number: PageSelectorNumber) => {
        if (number !== '...') {
            query.set('page', String(number));
            router.push(`${pathname}?${query.toString()}`);
        }
    };

    for (let i = 1; i <= page + 1; i++) {
        if (i > totalPages) break;

        if (i > 2 && totalPages >= 5 && page >= 4) {
            if (i === 3) {
                numberElements.push(
                    <NumberElement
                        key={i}
                        number={'...'}
                        isActive={false}
                        clickHandler={onNumberClick}
                    />,
                );
                continue;
            }
            if (page !== totalPages) {
                if (i < page) continue;
            } else if (i < totalPages - 1) continue;
        }
        numberElements.push(
            <NumberElement
                key={i}
                number={i}
                isActive={page === i}
                clickHandler={onNumberClick}
            />,
        );
    }

    return (
        <div className={styles.wrapper}>
            <IoIosArrowBack
                size={20}
                className={`${styles.arrow} ${isBack && styles['arrow--active']}`}
                onClick={onBack}
            />
            {numberElements}
            <IoIosArrowForward
                size={20}
                className={`${styles.arrow} ${isForward && styles['arrow--active']}`}
                onClick={onForward}
            />
        </div>
    );
});

PageSelector.displayName = 'PageSelector';
export default PageSelector;

interface NumberElementProps {
    number: PageSelectorNumber;
    isActive: boolean;
    clickHandler: (number: PageSelectorNumber) => void;
}

const NumberElement = ({ number, isActive, clickHandler }: NumberElementProps) => {
    const onClick = () => {
        clickHandler(number);
    };

    return (
        <span className={`${styles.number} ${isActive && styles['number--active']}`} onClick={onClick}>
                {number}
            </span>
    );
};
