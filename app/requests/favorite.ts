import { AxiosResponse } from 'axios';
import { makeRequest } from '@/shared/libs/makeRequest';

export const favoriteListing = (listingId: string): Promise<AxiosResponse> => {
    return makeRequest({
        url: `/api/favorite/${listingId}`,
        method: 'POST',
    });
};

export const unFavoriteListing = (listingId: string): Promise<AxiosResponse> => {
    return makeRequest({
        url: `/api/favorite/${listingId}`,
        method: 'DELETE',
    });
};