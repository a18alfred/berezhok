'use client';

import styles from './ListingReservation.module.scss';
import { Range } from 'react-date-range';
import Calendar from '@/shared/components/Input/Calendar/Calendar';
import Button from '@/shared/components/Button/Button';
import React, { useEffect, useMemo, useState } from 'react';
import { IListingWithUser, IReservation } from '@/shared/types/types';
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import useModal from '@/app/hooks/useModal';
import useUser from '@/app/hooks/useUser';
import { addDays } from 'date-fns';

import getFullAddress from '@/shared/libs/getFullAddress';
import { toast } from 'react-hot-toast';

const initialDateRange: Range = {
    startDate: addDays(new Date().setHours(0, 0, 0, 0), 1),
    endDate: addDays(new Date().setHours(0, 0, 0, 0), 2),
    key: 'selection',
};

interface ListingReservationProps {
    listing: IListingWithUser;
    reservations?: IReservation[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
                                                                   listing,
                                                                   reservations = [],


                                                               }) => {
    const { openLogin, openReservationConfirm } = useModal();
    const { user } = useUser();
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate,
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const onCreateReservation = () => {
        if (!user) {
            return openLogin();
        }

        if (!dateRange.startDate || !dateRange.endDate) return;

        const isDisabled = disabledDates.some((date) => {
            return date.toDateString() === dateRange.startDate?.toDateString() ||
                date.toDateString() === dateRange.endDate?.toDateString();
        });

        if (isDisabled) {
            toast.error('Дата занята');
            return;
        }

        openReservationConfirm({
            listingId: listing.id,
            listingTitle: listing.title,
            startDate: dateRange.startDate.toDateString(),
            endDate: dateRange.endDate.toDateString(),
            totalPrice,
            fullAddress: getFullAddress(listing),
        });
    };

    return (
        <div className={styles.wrapper}>
            <p className={styles.price}>
                <span className={styles.price__number}>
                     {listing.price} ₽
                </span>
                <span className={styles.price__text}>
                    ночь
                </span>
            </p>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => setDateRange(value.selection)}
            />
            <hr />
            <div className={styles.buttonWrapper}>
                <Button
                    label='Забронировать'
                    onClick={onCreateReservation}
                />
            </div>
            <hr />
            <p className={styles.totalPrice}
            >
                <span>
                    Всего
                </span>
                <span>
                    {totalPrice} ₽
                </span>
            </p>
        </div>
    );
};

export default ListingReservation;
