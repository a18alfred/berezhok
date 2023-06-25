'use client';

import styles from './ListingCard.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

import Button from '@/shared/components/Button/Button';
import HeartButton from '@/shared/components/Button/HeartButton';
import { IListing, IReservation } from '@/shared/types/types';
import categories from '@/shared/constants/categories';
import Link from 'next/link';

interface ListingCardProps {
    data: IListing;
    reservation?: IReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    faded?: boolean;
};

const ListingCard: React.FC<ListingCardProps> = React.memo(({
                                                                data,
                                                                reservation,
                                                                onAction,
                                                                disabled,
                                                                actionLabel,
                                                                faded,
                                                                actionId = '',
                                                            }) => {
    const router = useRouter();
    const cityName = data.address_city || data.address_settlement;

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId);
        }, [disabled, onAction, actionId]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);

    return (
        <Link
            href={`/listing/${data.id}`}
            className={`${styles.listingCard} ${faded && styles['listingCard--faded']}`}
        >
            <div className={styles.listingCard_wrapper}>
                <div className={styles.listingCard_imageWrapper}>
                    <Image
                        placeholder='blur'
                        blurDataURL={'/assets/svg/empty-image.svg'}
                        fill
                        className={styles.listingCard_image}
                        src={data.imageSrc}
                        alt='Объявление'
                    />
                    <div className={styles.listingCard_imageBtn}>
                        <HeartButton
                            listingId={data.id}
                        />
                    </div>
                </div>
                <p className={styles.listingCard_address}>
                    {data?.address_region}{cityName && data?.address_region !== cityName && `, ${cityName}`}
                </p>
                <p className={styles.listingCard_dates}>
                    {reservationDate || categories[data.category].label}
                </p>
                <p className={styles.listingCard_priceWrapper}>
                    <span>
                        {price} ₽
                    </span>
                    {!reservation && (
                        <span>ночь</span>
                    )}
                </p>
                {onAction && actionLabel && (
                    <div className={styles.listingCard_buttonWrapper}>
                        <Button
                            disabled={disabled}
                            small
                            label={actionLabel}
                            onClick={handleCancel}
                        />
                    </div>
                )}
            </div>
        </Link>
    );
});

ListingCard.displayName = 'ListingCard';

export default ListingCard;