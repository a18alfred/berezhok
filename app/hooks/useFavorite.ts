import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import useModal from '@/app/hooks/useModal';
import { IUser } from '@/shared/types/types';
import { favoriteListing, unFavoriteListing } from '@/app/requests/favorite';
import { useAppDispatch } from '@/shared/state/hooks';
import { add_favorite_listing, delete_favorite_listing, updateFavorite } from '@/shared/state/user/slice';
import useUser from '@/app/hooks/useUser';

interface IUseFavorite {
    listingId: string;
}

const useFavorite = ({ listingId }: IUseFavorite) => {
    const { user } = useUser();
    const dispatch = useAppDispatch();
    const { openLogin } = useModal();

    const isFavorite = useMemo(() => {
        const list = user?.favoriteIds || [];

        return list.includes(listingId);
    }, [user, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();

            if (!user) {
                return openLogin();
            }

            dispatch(updateFavorite({ listingId }));
        },
        [
            user,
            isFavorite,
            listingId,
            openLogin,
        ]);

    return {
        isFavorite,
        toggleFavorite,
    };
};

export default useFavorite;