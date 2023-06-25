import React from 'react';
import Heading from '@/shared/components/Heading/Heading';

export const metadata = {
    title: 'БЕРЕЖОК - Забронировано вами',
};
const ReservationsLayout = ({ children }: { children: React.ReactNode, }) => {
    return (
        <>
            <Heading
                title='Забронировано вами'
                subtitle='Места, которые вы забронировали'
            />
            {children}
        </>
    );
};
export default ReservationsLayout;