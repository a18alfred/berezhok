import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/serverActions/getCurrentUser';
import prisma from '@/shared/libs/prismadb';
import cloudinary from '@/shared/libs/cloudinary';

interface IParams {
    listingId?: string;
}

const getPublicId = (imageURL: string) => imageURL.split('/').pop()?.split('.')[0];

export async function DELETE(
    request: Request,
    { params }: { params: IParams },
) {
    const currentUser = await getCurrentUser();
    const { listingId } = params;

    if (!currentUser || !listingId) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    try {
        const listing = await prisma.listing.findMany({
            where: {
                id: listingId,
                userId: currentUser.id,
            },
        });
        if (listing.length === 0) {
            throw new Error('Объявление не найдено');
        }
        const imageSrc = listing[0].imageSrc;
        const publicId = getPublicId(imageSrc);

        if (publicId) {
            const result = await cloudinary.v2.uploader.destroy(`listings/${publicId}`);
            console.log(result);
        }

        await prisma.listing.deleteMany({
            where: {
                id: listingId,
                userId: currentUser.id,
            },
        });

    } catch (e) {
        console.log(e);
        return NextResponse.json({}, {
            status: 400,
        });
    }

    return NextResponse.json({}, {
        status: 200,
    });
}