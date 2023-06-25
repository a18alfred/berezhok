'use client';

import ListingList from '@/app/components/Listing/ListingList/ListingList';
import ClientOnly from '@/shared/components/ClientOnly/ClientOnly';
import MapHint from '@/app/components/MapHint/MapHint';

const Home = () => {
    return (
        <ClientOnly>
            <ListingList />
            <MapHint />
        </ClientOnly>
    );
};

export default Home;