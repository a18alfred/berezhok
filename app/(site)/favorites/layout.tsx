import React from 'react';
import Heading from '@/shared/components/Heading/Heading';

export const metadata = {
    title: 'БЕРЕЖОК - Избранное',
};
const FavoriteLayout = ({ children }: { children: React.ReactNode, }) => {
    return (
        <>
            <Heading
                title='Избранное'
                subtitle='Список мест, которые вам понравились'
            />
            {children}
        </>
    );
};
export default FavoriteLayout;