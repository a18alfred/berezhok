import {
    FetchListingsByPayload,
    FetchListingsByResult,
    ListingSearchParams,
    ListingState,
} from '@/shared/state/listing/types';
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, ThunkApi } from '@/shared/state';
import { getListings } from '@/app/requests/listing';
import { IListing } from '@/shared/types/types';

const initialSearchParams: ListingSearchParams = {
    dateRange: undefined,
    category: undefined,
    address: undefined,
    details: {
        guestCount: 2,
        roomCount: 1,
        bathroomCount: 1,
        price_min: 0,
        price_max: 100000,
        wifi: false,
        airConditioner: false,
    },
};

const initialState: ListingState = {
    isLoading: false,
    listingById: {},
    listingByQuery: {},
    lastSearchParams: initialSearchParams,
    error: null,
};

export const fetchListingsByQuery = createAsyncThunk<FetchListingsByResult, FetchListingsByPayload, ThunkApi>(
    'user/fetchListings',
    async (props, { getState }) => {
        const { query, page } = props;
        const { listingByQuery } = getState().listing;
        if (listingByQuery[query] && listingByQuery[query].currentPage && listingByQuery[query].totalPages) {
            const { totalPages, currentPage } = listingByQuery[query];
            if (page > totalPages || page <= currentPage) throw new Error('Cтраница уже загружена');
        }

        const resp = await getListings({ query, page });


        let listingIds: string[] = [];
        let listingById: Record<string, IListing> = {};

        resp.data.listings.forEach((listing) => {
            listingIds.push(listing.id);
            listingById[listing.id] = listing;
        });

        return {
            listingIds,
            listingById,
            page,
            totalPages: resp.data.meta.totalPages,
            totalCount: resp.data.meta.totalCount,
        };
    },
);

export const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        save_search_params: (state, action: PayloadAction<ListingSearchParams>) => {
            state.lastSearchParams = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListingsByQuery.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchListingsByQuery.fulfilled, (state, action) => {
                state.listingById = { ...state.listingById, ...action.payload.listingById };
                state.listingByQuery[action.meta.arg.query || '/'] = {
                    currentPage: action.payload.page,
                    totalPages: action.payload.totalPages,
                    totalCount: action.payload.totalCount,
                    ids: state.listingByQuery[action.meta.arg.query || '/']
                        ? [...state.listingByQuery[action.meta.arg.query || '/'].ids, ...action.payload.listingIds]
                        : action.payload.listingIds,
                };
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchListingsByQuery.rejected, (state, action) => {
                state.isLoading = false;
                state.listingByQuery[action.meta.arg.query || '/'] = {
                    currentPage: 0,
                    totalPages: 0,
                    totalCount: 0,
                    ids: [],
                };
                state.error = action.error.message || 'Что-то пошло не так';
            });
    },
});

export const {
    save_search_params,
} = listingSlice.actions;
export default listingSlice.reducer;

export const selectListingById = (state: RootState) => state.listing.listingById;

export const selectListingByQuery = (state: RootState) => state.listing.listingByQuery;
export const selectListingIsLoading = (state: RootState) => state.listing.isLoading;
export const selectListingLastSearchParams = (state: RootState) => state.listing.lastSearchParams;
export const selectListingQuery = createSelector(
    [
        (state: RootState) => state.listing,
        (state: RootState, query: string) => query,
    ],
    (listing, query) => listing.listingByQuery[query || '/'],
);