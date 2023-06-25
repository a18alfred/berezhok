import { NextResponse } from 'next/server';

import prisma from '@/shared/libs/prismadb';
import getCurrentUser from '@/app/serverActions/getCurrentUser';

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const body = await request.json();
    const {
        listingId,
        startDate,
        endDate,
        totalPrice,
    } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const overlappingReservations = await prisma.reservation.findMany({
        where: {
            listingId,
            AND: [
                {
                    OR: [
                        { startDate: { lte: startDate }, endDate: { gte: startDate } },
                        { startDate: { lte: endDate }, endDate: { gte: endDate } },
                        { startDate: { gte: startDate }, endDate: { lte: endDate } },
                    ],
                },
            ],
        },
    });

    if (overlappingReservations.length > 0) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                },
            },
        },
    });

    return NextResponse.json(listingAndReservation);
}