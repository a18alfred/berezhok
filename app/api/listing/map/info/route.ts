import prisma from '@/shared/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const listing = await prisma.listing.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            category: true,
            imageSrc: true,
            price: true,
        },
    });

    return NextResponse.json({
        ...listing,
    });
}