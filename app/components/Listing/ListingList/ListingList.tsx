'use client';

import { useSearchParams } from 'next/navigation';
import useListingByQuery from '@/app/hooks/useListingByQuery';
import EmptyState from '@/shared/components/EmptyState/EmptyState';
import ListingCard from '@/app/components/Listing/ListingCard/ListingCard';
import LoadingSkeletons from '@/app/components/LoadingSkeletons/LoadingSkeletons';
import { useMemo } from 'react';
import { RESULTS_PER_FETCH } from '@/shared/constants/settings';

const ListingList = () => {
    const searchParams = useSearchParams();
    const query = searchParams?.toString() || '/';
    const { isLoading, listingsByQuery, listingById, loader, page } = useListingByQuery(query);

    const listToDisplay = useMemo<string[]>(() => {
        if (!listingsByQuery[query]) return [];
        return listingsByQuery[query].ids.slice(0, page * RESULTS_PER_FETCH);
    }, [page, query, listingsByQuery]);

    if (listingsByQuery[query]?.ids.length === 0) {
        return (
            <EmptyState showButton />
        );
    }

    return (
        <>
            <div className='listings-list-wrapper'>
                {listToDisplay.map((id: string) => (
                    <ListingCard
                        key={id}
                        data={listingById[id]}
                    />
                ))}
                {isLoading && <LoadingSkeletons />}
            </div>
            <div ref={loader} />
        </>

    );
};

export default ListingList;
