import { useAppDispatch, useAppSelector } from '@/shared/state/hooks';
import {
    fetchListingsByQuery,
    selectListingById,
    selectListingByQuery,
    selectListingIsLoading,
} from '@/shared/state/listing/slice';
import { useEffect, useRef, useState } from 'react';

const useListingByQuery = (query: string) => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectListingIsLoading);
    const listingById = useAppSelector(selectListingById);
    const listingsByQuery = useAppSelector(selectListingByQuery);
    const loader = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setPage(0);
    }, [query]);


    useEffect(() => {
        const handleObserver = async (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            const hasMore = listingsByQuery[query]
                ? page < listingsByQuery[query].totalPages
                : true;
            const lastFetchedPage = listingsByQuery[query] ? listingsByQuery[query].currentPage : 0;
            if (!isLoading && target.isIntersecting && hasMore) {
                if (page + 1 > lastFetchedPage)
                    dispatch(fetchListingsByQuery({
                        query: query,
                        page: page + 1,
                    }));
                setPage(prev => prev + 1);
            }
        };

        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '300px',
            threshold: 0,
        });

        if (loader.current) {
            observer.observe(loader.current);
        }

        if (page === 0 && listingsByQuery[query]) setPage(1);

        return () => {
            observer.disconnect();
        };

    }, [page, isLoading, setPage, listingsByQuery, dispatch, query]);

    return {
        loader,
        isLoading,
        listingsByQuery,
        listingById,
        page,
    };
};

export default useListingByQuery;