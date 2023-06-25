import { AxiosResponse } from 'axios';
import { makeRequest } from '@/shared/libs/makeRequest';
import { DaDataAddress } from 'react-dadata';

interface DadataSuggestions {
    suggestions: DaDataAddress[];
}

export const fetchAddressByCoords = (lat: number, lon: number): Promise<AxiosResponse<DadataSuggestions>> => {
    return makeRequest({
        url: `https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address/?lat=${lat}&lon=${lon}&radius_meters=50&count=1`,
        method: 'GET',
        headers: {
            Authorization: 'Token ' + process.env.NEXT_PUBLIC_DADATA_KEY,
            accept: 'application/json',
        },
    });
};