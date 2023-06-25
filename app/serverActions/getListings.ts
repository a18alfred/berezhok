import prisma from '@/shared/libs/prismadb';
import { IListing } from '@/shared/types/types';
import { RESULTS_PER_FETCH } from '@/shared/constants/settings';

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    category?: string;
    geo_lat_min?: string,
    geo_lat_max?: string,
    geo_lon_min?: string,
    geo_lon_max?: string,
    price_min?: string,
    price_max?: string,
    page?: string,
    address_county?: string,
    address_region?: string,
    address_area?: string,
    address_city?: string,
    address_city_district?: string,
    address_settlement?: string,
    address_street?: string,
    address_house?: string,
    address_block?: string,
    address_flat?: string,
    wifi?: string,
    airConditioner?: string,
}

interface GetListingsResult {
    listings: IListing[],
    totalPages: number,
}

const specialKeys = {
    startDate: true,
    endDate: true,
    geo_lat_min: true,
    geo_lat_max: true,
    geo_lon_min: true,
    geo_lon_max: true,
    price_min: true,
    price_max: true,
    page: true,
    wifi: true,
    airConditioner: true,
};

const numberKeys = {
    roomCount: true,
    bathroomCount: true,
    guestCount: true,
};

const getListings = async (params: IListingsParams): Promise<GetListingsResult> => {
    try {
        const {
            category,
            startDate,
            endDate,
            geo_lat_min,
            geo_lat_max,
            geo_lon_min,
            geo_lon_max,
            price_min,
            price_max,
            page,
            wifi,
            airConditioner,
        } = params;

        let query: any = {};

        for (const [key, value] of Object.entries(params)) {
            if (specialKeys.hasOwnProperty(key)) continue;

            if (value) {
                query[key] = numberKeys.hasOwnProperty(key)
                    ? { gte: parseInt(value) }
                    : value;
            }
        }

        if (category) query.category = category;
        if (wifi === 'true') query.wifi = true;
        if (airConditioner === 'true') query.airConditioner = true;

        const pageToGet = parseInt(page || '1');

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate },
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate },
                            },
                        ],
                    },
                },
            };
        }

        if (geo_lon_min && geo_lon_max && geo_lat_min && geo_lat_max) {
            query.geo_lat = {
                gte: parseFloat(geo_lat_min),
                lte: parseFloat(geo_lat_max),
            };
            query.geo_lon = {
                gte: parseFloat(geo_lon_min),
                lte: parseFloat(geo_lon_max),
            };
        }

        if (price_min && price_max) {
            query.price = {
                gte: parseInt(price_min),
                lte: parseInt(price_max),
            };
        }

        const totalCount = await prisma.listing.count({
            where: query,
        });

        const totalPages = Math.ceil(totalCount / RESULTS_PER_FETCH);

        const listings = await prisma.listing.findMany({
            skip: pageToGet * RESULTS_PER_FETCH - RESULTS_PER_FETCH,
            take: RESULTS_PER_FETCH,
            where: query,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return {
            listings: listings.map((listing) => ({
                ...listing,
                createdAt: listing.createdAt.toISOString(),
            })),
            totalPages,
        };
    } catch (error: any) {
        return {
            listings: [],
            totalPages: 0,
        };

    }
};

export default getListings;