import ClientOnly from '@/shared/components/ClientOnly/ClientOnly';
import ReservationsClient from '../../components/ReservationsClient/ReservationsClient';
import getCurrentUser from '@/app/serverActions/getCurrentUser';
import EmptyState from '@/shared/components/EmptyState/EmptyState';
import getReservations from '@/app/serverActions/getReservations';
import React from 'react';

interface IParams {
    page?: string;
}

const OrdersPage = async ({ searchParams }: { searchParams: IParams }) => {
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

    const { reservations, totalPages } = await getReservations({ ...searchParams, authorId: user.id });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='Не найдено ни одного бронирования'
                    subtitle='Похоже, никто не забронировал вашу собственность.'
                    showButton
                    buttonText='На главную'
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                totalPages={totalPages}
            />
        </ClientOnly>
    );
};

export default OrdersPage;