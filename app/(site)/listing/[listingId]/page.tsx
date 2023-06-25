import ListingClient from './ListingClient';
import EmptyState from '@/shared/components/EmptyState/EmptyState';
import ClientOnly from '@/shared/components/ClientOnly/ClientOnly';
import getListingById from '@/app/serverActions/getListingById';
import getReservations from '@/app/serverActions/getReservations';

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const { reservations } = await getReservations({ ...params, endDate: new Date() });

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservations={reservations}
            />
        </ClientOnly>
    );
};

export default ListingPage;