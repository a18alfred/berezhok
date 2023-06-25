import React from 'react';
import Heading from '@/shared/components/Heading/Heading';

export const metadata = {
    title: 'БЕРЕЖОК - Забронировано у вас',
};
const OrdersLayout = ({ children }: { children: React.ReactNode, }) => {
    return (
        <>
            <Heading
                title='Забронировано у вас'
                subtitle='Бронирования на вашу недвижимость'
            />
            {children}
        </>
    );
};
export default OrdersLayout;