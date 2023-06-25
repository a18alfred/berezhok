import ClientOnly from '@/shared/components/ClientOnly/ClientOnly';
import EmptyState from '@/shared/components/EmptyState/EmptyState';
import React from 'react';
import getFavoriteListings from '@/app/serverActions/getFavoriteListings';
import FavoritesClient from '@/app/(site)/favorites/FavoritesClient';

interface IParams {
    page?: string;
}

const FavoritesPage = async ({ searchParams }: { searchParams: IParams }) => {
    const { listings, user, totalPages } = await getFavoriteListings({ ...searchParams });

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

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='Список пуст'
                    subtitle='Похоже, у вас нет избранных объявлений.'
                    showButton
                    buttonText='На главную'
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                totalPages={totalPages}
            />
        </ClientOnly>
    );
};

export default FavoritesPage;