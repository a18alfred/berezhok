'use client';

import Button from '@/shared/components/Button/Button';
import { useRouter } from 'next/navigation';

const HomeButton = () => {
    const router = useRouter();
    return (
        <Button
            onClick={() => router.push('/')}
            notFull={true}
            type='button'
            label='На главную'
        />
    );
};

export default HomeButton;
