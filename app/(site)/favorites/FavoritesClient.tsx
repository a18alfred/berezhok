'use client';

import { IListing } from '@/shared/types/types';
import React from 'react';
import PageSelector from '@/shared/components/PageSelector/PageSelector';
import ListingCard from '@/app/components/Listing/ListingCard/ListingCard';

interface FavoritesClientProps {
    listings: IListing[];
    totalPages: number;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ listings, totalPages }) => {
    return (
        <>
            <div className='listings-list-wrapper listings-list-wrapper--secondary'>
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                    />
                ))}
            </div>
            <PageSelector totalPages={totalPages} />
        </>
    );
};

export default FavoritesClient;