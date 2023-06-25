import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/shared/libs/prismadb';
import { RESULTS_PER_FETCH } from '@/shared/constants/settings';

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

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    let query: any = {};

    searchParams.forEach((value, key) => {
        if (specialKeys.hasOwnProperty(key)) return;

        if (value) {
            query[key] = numberKeys.hasOwnProperty(key)
                ? { gte: parseInt(value) }
                : value;
        }
    });
    
    const wifi = searchParams.get('wifi');
    if (wifi === 'true') query.wifi = true;

    const airConditioner = searchParams.get('airConditioner');
    if (airConditioner === 'true') query.airConditioner = true;

    const geo_lat_min = searchParams.get('geo_lat_min');
    const geo_lat_max = searchParams.get('geo_lat_max');
    const geo_lon_min = searchParams.get('geo_lon_min');
    const geo_lon_max = searchParams.get('geo_lon_max');
    if (geo_lat_min && geo_lat_max && geo_lon_min && geo_lon_max) {
        query.geo_lat = {
            gte: parseFloat(geo_lat_min),
            lte: parseFloat(geo_lat_max),
        };
        query.geo_lon = {
            gte: parseFloat(geo_lon_min),
            lte: parseFloat(geo_lon_max),
        };
    }

    const price_min = searchParams.get('price_min');
    const price_max = searchParams.get('price_max');
    if (price_min && price_max) {
        query.price = {
            gte: parseInt(price_min),
            lte: parseInt(price_max),
        };
    }

    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
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

    const page = parseInt(searchParams.get('page') || '1');

    try {
        const totalCount = await prisma.listing.count({
            where: query,
        });


        const listings = await prisma.listing.findMany({
            skip: page * RESULTS_PER_FETCH - RESULTS_PER_FETCH,
            take: RESULTS_PER_FETCH,
            where: query,
            orderBy: {
                createdAt: 'desc',
            },
        });
        const totalPages = Math.ceil(totalCount / RESULTS_PER_FETCH);

        return NextResponse.json({
            meta: {
                page,
                totalPages,
                totalCount,
            },
            listings: listings,
        });
    } catch (e) {
        console.log(e);
        return NextResponse.json({}, {
            status: 400,
        });
    }


}