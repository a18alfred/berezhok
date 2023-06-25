import React from 'react';
import Heading from '@/shared/components/Heading/Heading';

export const metadata = {
    title: 'БЕРЕЖОК - Ваши объявления',
};
const PropertiesLayout = ({ children }: { children: React.ReactNode, }) => {
    return (
        <>
            <Heading
                title='Ваши объявления'
                subtitle='Недвижимость, которую вы сдаете в аренду'
            />
            {children}
        </>
    );
};
export default PropertiesLayout;