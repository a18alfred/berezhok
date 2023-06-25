'use client';

import React from 'react';
import { IReservation } from '@/shared/types/types';
import ListingCard from '@/app/components/Listing/ListingCard/ListingCard';
import PageSelector from '@/shared/components/PageSelector/PageSelector';
import useModal from '@/app/hooks/useModal';

interface ReservationsClientProps {
    reservations: IReservation[];
    totalPages: number;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({ reservations, totalPages }) => {
    const { openDeleteReservation } = useModal();
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const onCancel = (id: string) => {
        openDeleteReservation({ reservationId: id });
    };

    return (
        <>
            <div className='listings-list-wrapper listings-list-wrapper--secondary'>
                {reservations.map((reservation: IReservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        actionLabel='Отменить'
                        onAction={new Date(reservation.startDate) >= today ? onCancel : undefined}
                        faded={new Date(reservation.endDate) <= today}
                    />
                ))}
            </div>
            <PageSelector totalPages={totalPages} />
        </>
    );
};

export default ReservationsClient;
