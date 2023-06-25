import { AxiosResponse } from 'axios';
import { makeRequest } from '@/shared/libs/makeRequest';
import { ListingType } from '@/app/modals/RentModal/RentModal.config';
import { DaDataAddress } from 'react-dadata';
import { IListing } from '@/shared/types/types';
import getDbReadyAddress from '@/shared/libs/getDbReadyAddress';

interface CreateNewListingProps {
    listing: ListingType;
    imageBase64: string;
    address: DaDataAddress;
}

export const createNewListing = ({ listing, imageBase64, address }: CreateNewListingProps): Promise<AxiosResponse> => {
    const requestData = {
        category: listing.category,
        title: listing.title,
        description: listing.description,
        guestCount: listing.guestCount,
        roomCount: listing.roomCount,
        bathroomCount: listing.bathroomCount,
        price: listing.price,
        wifi: listing.wifi,
        airConditioner: listing.airConditioner,
        imageBase64: imageBase64,
        ...getDbReadyAddress(address),
        geo_lat: parseFloat(address.geo_lat || '55.761231082721615'),
        geo_lon: parseFloat(address.geo_lon || '37.608905931350705'),
    };

    return makeRequest({
        url: `/api/listing/create`,
        method: 'POST',
        data: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

interface GetListingsProps {
    query: string;
    page: number;
}

interface GetListingsResult {
    meta: {
        page: string;
        totalPages: number;
        totalCount: number;
    };
    listings: IListing[];
}

export const getListings = ({ query, page }: GetListingsProps): Promise<AxiosResponse<GetListingsResult>> => {
    return makeRequest({
        url: `/api/listing/all?${query}&page=${page}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const deleteListing = (listingId: string): Promise<AxiosResponse> => {
    return makeRequest({
        url: `/api/listing/delete/${listingId}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

interface SimpleListingPoint {
    id: string,
    geo_lat: number,
    geo_lon: number
}

interface GetListingsMapPointsResult {
    mapPoints: SimpleListingPoint[];
}

export const getListingsMapPoints = (region: string): Promise<AxiosResponse<GetListingsMapPointsResult>> => {
    return makeRequest({
        url: `/api/listing/map/points?address_region=${region}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export interface GetListingsMapInfoResult {
    id: string;
    category: string;
    imageSrc: string;
    price: number;
}

export const getListingsMapInfo = (id: string): Promise<AxiosResponse<GetListingsMapInfoResult>> => {
    return makeRequest({
        url: `/api/listing/map/info?id=${id}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
