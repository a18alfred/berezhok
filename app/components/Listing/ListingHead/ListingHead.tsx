'use client';

import styles from './ListingHead.module.scss';
import Image from 'next/image';
import Heading from '@/shared/components/Heading/Heading';
import React from 'react';
import { IListingWithUser, IUser } from '@/shared/types/types';
import HeartButton from '@/shared/components/Button/HeartButton';
import Avatar from '@/shared/components/Avatar/Avatar';
import ShareButton from '@/shared/components/Button/ShareButton';
import getFullAddress from '@/shared/libs/getFullAddress';

interface ListingHeadProps {
    listing: IListingWithUser;
}

const ListingHead: React.FC<ListingHeadProps> = React.memo(({
                                                                listing,
                                                            }) => {
    const fullAddress = getFullAddress(listing);

    return (
        <>
            <div className={styles.headerWrapper}>
                <Heading
                    title={listing.title}
                />
                <div className={styles.headerInfo}>
                    <p className={styles.headerAddress}>{fullAddress}</p>
                    <ShareButton title={listing.title} />
                </div>
            </div>

            <div className={styles.imageWrapper}>
                <Image
                    src={listing.imageSrc}
                    fill
                    className={styles.image}
                    alt='Фото'
                />
                <div className={styles.btn}>
                    <HeartButton
                        listingId={listing.id}
                    />
                </div>
            </div>
        </>
    );
});

ListingHead.displayName = 'ListingHead';
export default ListingHead;