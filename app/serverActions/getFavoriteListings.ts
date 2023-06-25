import prisma from '@/shared/libs/prismadb';

import getCurrentUser from './getCurrentUser';
import { IListing, IUser } from '@/shared/types/types';
import { RESULTS_PER_FETCH } from '@/shared/constants/settings';


interface IParams {
    page?: string;
}

interface GetFavoriteListingsResult {
    listings: IListing[],
    user: IUser | null,
    totalPages: number,
}

const getFavoriteListings = async (params: IParams): Promise<GetFavoriteListingsResult> => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser)
            return {
                listings: [],
                user: null,
                totalPages: 0,
            };


        const pageToGet = parseInt(params.page || '1');

        const totalCount = await prisma.listing.count({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])],
                },
            },
        });

        const totalPages = Math.ceil(totalCount / RESULTS_PER_FETCH);

        const favorites = await prisma.listing.findMany({
            skip: pageToGet * RESULTS_PER_FETCH - RESULTS_PER_FETCH,
            take: RESULTS_PER_FETCH,
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])],
                },
            },
        });

        return {
            listings: favorites.map((favorite) => ({
                ...favorite,
                createdAt: favorite.createdAt.toString(),
            })),
            totalPages,
            user: currentUser,

        };
    } catch (error: any) {
        throw new Error(error);
    }
};

export default getFavoriteListings;