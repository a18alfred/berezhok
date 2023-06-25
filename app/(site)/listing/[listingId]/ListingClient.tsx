'use client';

import styles from './ListingClient.module.scss';
import React from 'react';

import { IListingWithUser, IReservation, IUser } from '@/shared/types/types';
import ListingHead from '@/app/components/Listing/ListingHead/ListingHead';
import ListingInfo from '@/app/components/Listing/ListingInfo/ListingInfo';
import ListingReservation from '@/app/components/Listing/ListingReservation/ListingReservation';

interface ListingClientProps {
    reservations?: IReservation[];
    listing: IListingWithUser;

}

const ListingClient: React.FC<ListingClientProps> = ({
                                                         listing,
                                                         reservations = [],

                                                     }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <ListingHead
                    listing={listing}
                />
                <div className={styles.info}>
                    <ListingInfo
                        listing={listing}
                    />
                    <div className={styles.reservation}>
                        <ListingReservation
                            listing={listing}
                            reservations={reservations}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingClient;
