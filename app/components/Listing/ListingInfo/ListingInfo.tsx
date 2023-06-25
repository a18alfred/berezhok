'use client';

import styles from './ListingInfo.module.scss';
import dynamic from 'next/dynamic';
import { IListingWithUser } from '@/shared/types/types';
import Avatar from '@/shared/components/Avatar/Avatar';
import React from 'react';
import ListingCategory from '@/app/components/Listing/ListingCategory/ListingCategory';
import amenities from '@/shared/constants/amenities';
import { useRouter } from 'next/navigation';

const MapWithPlacemark = dynamic(() => import('@/shared/components/MapWithPlacemark/MapWithPlacemark'), {
    ssr: false,
});

interface ListingInfoProps {
    listing: IListingWithUser;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ listing }) => {
    const router = useRouter();

    const guests = listing.guestCount === 1 ? 'гость' :
        listing.guestCount >= 2 && listing.guestCount <= 4 ? 'гостя' : 'гостей';
    const rooms = listing.roomCount === 1 ? 'комната' :
        listing.roomCount >= 2 && listing.roomCount <= 4 ? 'комнаты' : 'комнат';
    const bathrooms = listing.bathroomCount === 1 ? 'ванная' :
        listing.bathroomCount >= 2 && listing.bathroomCount <= 4 ? 'ванные' : 'ванн';

    const amenityList: JSX.Element[] = [];
    Object.values(amenities).forEach((amenity) => {
        const Icon = amenity.icon;
        if (!(listing as any)[amenity.name]) return null;
        amenityList.push(
            <div key={amenity.name}>
                <Icon size={24} />
                <span>{amenity.label}</span>
            </div>,
        );
    });

    const onUser = () => {
        router.push(`?userId=${listing.user.id}`);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.basicInfo}>

                <div className={styles.basicInfo__wrapper}>
                    <p onClick={onUser}>Сдаёт {listing.user?.name}</p>
                    <div className={styles.basicInfo__property}>
                    <span>
                        {listing.guestCount} {guests}
                    </span>
                        <span>·</span>
                        <span>
                        {listing.roomCount} {rooms}
                    </span>
                        <span>·</span>
                        <span>
                        {listing.bathroomCount} {bathrooms}
                    </span>
                    </div>

                </div>
                <Avatar src={listing.user?.image} size={40} onClick={onUser} />

            </div>

            <hr />

            <ListingCategory
                categoryName={listing.category}
            />

            <hr />

            <p className={styles.propertyDescription}>
                {listing.description}
            </p>

            <hr />

            {amenityList.length !== 0 &&
                <>
                    <div className={styles.amenitiesWrapper}>
                        <h6>Удобства</h6>
                        {amenityList}
                    </div>
                    <hr />
                </>
            }
            <MapWithPlacemark
                isDraggable={false}
                geo_lat={listing.geo_lat}
                geo_lon={listing.geo_lon}
            />
        </div>
    );
};

export default ListingInfo;
