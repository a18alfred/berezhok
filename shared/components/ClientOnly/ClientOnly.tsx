'use client';

import React, { useState, useEffect } from 'react';
import Loader from '@/shared/components/Loader/Loader';

interface ClientOnlyProps {
    children: React.ReactNode;
    withLoader?: boolean;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({
                                                   children,
                                                   withLoader,
                                               }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        if (withLoader) return <Loader />;
        else return null;
    }

    return (
        <>
            {children}
        </>
    );
};

export default ClientOnly;