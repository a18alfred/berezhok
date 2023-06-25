import ClientOnly from '@/shared/components/ClientOnly/ClientOnly';
import getCurrentUser from '@/app/serverActions/getCurrentUser';
import EmptyState from '@/shared/components/EmptyState/EmptyState';
import React from 'react';
import getListings from '@/app/serverActions/getListings';
import PropertiesClient from '@/app/(site)/properties/PropertiesClient';

interface IParams {
    page?: string;
}

const PropertiesPage = async ({ searchParams }: { searchParams: IParams }) => {
    const user = await getCurrentUser();

    if (!user) {
        return (
            <ClientOnly>
                <EmptyState
                    title='Отсутствие авторизации'
                    subtitle='Пожалуйста, войдите под своим логином'
                />
            </ClientOnly>
        );
    }

    const { listings, totalPages } = await getListings({ ...searchParams, userId: user.id });

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='Список пуст'
                    subtitle='Вы не сдаёте жильё в аренду.'
                    showButton
                    buttonText='На главную'
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                totalPages={totalPages}
            />
        </ClientOnly>
    );
};

export default PropertiesPage;