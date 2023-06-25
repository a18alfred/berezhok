import prisma from '@/shared/libs/prismadb';
import { IReservation } from '@/shared/types/types';
import { RESULTS_PER_FETCH } from '@/shared/constants/settings';

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
    page?: string;
    endDate?: Date;
}

interface GetReservationsResult {
    reservations: IReservation[],
    totalPages: number,
    page: number,
}

const getReservations = async (params: IParams): Promise<GetReservationsResult> => {
    try {
        const { listingId, userId, authorId, page, endDate } = params;
        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (endDate) {
            query.endDate = {
                gte: endDate,
            };
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = { userId: authorId };
        }

        const pageToGet = parseInt(page || '1');
        const toTake = listingId && endDate ? undefined : RESULTS_PER_FETCH;

        const totalCount = await prisma.reservation.count({
            where: query,
        });

        const totalPages = toTake ? Math.ceil(totalCount / RESULTS_PER_FETCH) : 1;

        const reservations = await prisma.reservation.findMany({
            skip: pageToGet * RESULTS_PER_FETCH - RESULTS_PER_FETCH,
            take: toTake,
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return {
            reservations: reservations.map(
                (reservation) => ({
                    ...reservation,
                    createdAt: reservation.createdAt.toISOString(),
                    startDate: reservation.startDate.toISOString(),
                    endDate: reservation.endDate.toISOString(),
                    listing: {
                        ...reservation.listing,
                        createdAt: reservation.listing.createdAt.toISOString(),
                    },
                })),
            totalPages,
            page: pageToGet,
        };
    } catch (error: any) {
        throw new Error(error);
    }
};

export default getReservations;