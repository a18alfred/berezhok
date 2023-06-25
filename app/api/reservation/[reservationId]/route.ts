import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/serverActions/getCurrentUser';
import prisma from '@/shared/libs/prismadb';

interface IParams {
    reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const { reservationId } = params;

    if (!reservationId) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } },
            ],
        },
    });

    return NextResponse.json(reservation);
}