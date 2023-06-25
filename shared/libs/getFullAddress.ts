import { IListingWithUser } from '@/shared/types/types';

const getFullAddress = (listing: IListingWithUser): string => {
    const regionName = listing.address_region !== listing.address_city && listing.address_region;

    return (regionName ? regionName : '') +
        (listing.address_city ? (regionName ? ', ' : '') + listing.address_city : '') +
        (listing.address_settlement ? ', ' + listing.address_settlement : '') +
        (listing.address_street ? ', ' + listing.address_street : '') +
        (listing.address_house ? ', ' + listing.address_house : '') +
        (listing.address_block ? ', ' + listing.address_block : '') +
        (listing.address_flat ? ', ' + listing.address_flat : '');
};

export default getFullAddress;