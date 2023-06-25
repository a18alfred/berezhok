'use client';

import styles from './Avatar.module.scss';
import Image from 'next/image';
import React from 'react';

interface AvatarProps {
    src: string | null | undefined;
    size?: number;
    onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ src, size = 30, onClick }) => {
    return (
        <Image
            onClick={() => {
                if (onClick) onClick();
            }}
            className={styles.avatar}
            height={size}
            width={size}
            alt='Аватар'
            src={src || '/assets/images/avatar-placeholder.png'}
        />
    );
};

export default Avatar;
