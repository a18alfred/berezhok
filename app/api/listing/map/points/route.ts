import prisma from '@/shared/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const address_region = searchParams.get('address_region');

    if (!address_region) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const mapPoints = await prisma.listing.findMany({
        where: {
            address_region,
        },
        select: {
            id: true,
            geo_lat: true,
            geo_lon: true,
        },
    });

    return NextResponse.json({
        mapPoints,
    });
}