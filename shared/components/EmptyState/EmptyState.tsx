'use client';

import styles from './EmptyState.module.scss';
import { useRouter } from 'next/navigation';
import Button from '@/shared/components/Button/Button';
import Heading from '@/shared/components/Heading/Heading';
import React from 'react';

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showButton?: boolean;
    buttonText?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
                                                   title = 'Ничего не найдено',
                                                   subtitle = 'Попробуйте заменить или удалить некоторые фильтры поиска.',
                                                   showButton,
                                                   buttonText = 'Сбросить фильры',
                                               }) => {
    const router = useRouter();

    return (
        <div className={styles.wrapper}>
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div className={styles.btn_wrapper}>
                {showButton && (
                    <Button
                        outline
                        label={buttonText}
                        onClick={() => router.push('/')}
                    />
                )}
            </div>
        </div>
    );
};

export default EmptyState;