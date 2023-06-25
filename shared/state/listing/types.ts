import { IListing } from '@/shared/types/types';
import { SearchType } from '@/app/modals/SearchModal/SearchModal.config';
import { DaDataAddress, DaDataSuggestion } from 'react-dadata';
import { Range } from 'react-date-range';

type ListingByQuery = {
    [key in string]: {
        currentPage: number
        totalPages: number
        totalCount: number
        ids: string[]
    }
}

export interface ListingSearchParams {
    address: DaDataSuggestion<DaDataAddress> | undefined,
    category: string | undefined,
    dateRange: Range | undefined,
    details: SearchType
}

export interface ListingState {
    isLoading: boolean
    listingById: Record<string, IListing>;
    listingByQuery: ListingByQuery;
    lastSearchParams: ListingSearchParams
    error: string | null,
}

export interface FetchListingsByPayload {
    query: string;
    page: number;
}

export interface FetchListingsByResult {
    listingById: Record<string, IListing>;
    listingIds: string[];
    page: number;
    totalPages: number;
    totalCount: number;
}