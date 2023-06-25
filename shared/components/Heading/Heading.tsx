'use client';

import React from 'react';
import styles from './Heading.module.scss';

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
                                             title,
                                             subtitle,
                                             center,
                                         }) => {
    return (
        <div className={`${styles.heading} ${center && styles['heading--center']}`}>
            <h2>
                {title}
            </h2>
            {subtitle &&
                <p>
                    {subtitle}
                </p>
            }
        </div>
    );
};

export default Heading;