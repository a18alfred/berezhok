'use client';

import { useEffect } from 'react';
import Heading from '@/shared/components/Heading/Heading';
import Button from '@/shared/components/Button/Button';

const GlobalError = ({ error, reset }: { error: Error; reset: () => void; }) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
        <body>
        <div className={'main-error'}>
            <Heading
                title='Упс! Что-то пошло не так.'
                subtitle='У нас ошибка. Повторите вашу попытку позже.'
                center
            />
            <Button
                onClick={reset}
                notFull={true}
                type='button'
                label='На главную'
            />
        </div>
        </body>
        </html>
    );
};
export default GlobalError;