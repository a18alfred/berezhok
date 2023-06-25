import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/serverActions/getCurrentUser';
import prisma from '@/shared/libs/prismadb';

export async function PUT(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const body = await request.json();
    const favoriteIds = body.favoriteIds;

    if (!favoriteIds) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        },
    });

    return NextResponse.json({ user }, {
        status: 200,
    });
}