'use client';

import { IListing } from '@/shared/types/types';
import React from 'react';
import ListingCard from '@/app/components/Listing/ListingCard/ListingCard';
import PageSelector from '@/shared/components/PageSelector/PageSelector';
import useModal from '@/app/hooks/useModal';

interface PropertiesClientProps {
    listings: IListing[];
    totalPages: number;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings, totalPages }) => {
    const { openDeleteProperty } = useModal();
    const onDelete = (id: string) => {
        openDeleteProperty({ listingId: id });
    };

    return (
        <>
            <div className='listings-list-wrapper listings-list-wrapper--secondary'>
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        actionLabel='Удалить объявление'
                        onAction={onDelete}
                    />
                ))}
            </div>
            <PageSelector totalPages={totalPages} />
        </>
    );
};

export default PropertiesClient;
