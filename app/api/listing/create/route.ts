import { NextResponse } from 'next/server';
import cloudinary from '@/shared/libs/cloudinary';
import getCurrentUser from '@/app/serverActions/getCurrentUser';
import prisma from '@/shared/libs/prismadb';

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({}, {
            status: 401,
        });
    }

    const body = await request.json();
    const imageBase64 = body.imageBase64;

    const listing = {
        title: body.title,
        description: body.description,
        category: body.category,
        roomCount: body.roomCount,
        bathroomCount: body.bathroomCount,
        guestCount: body.guestCount,
        address_county: body.address_county,
        address_region: body.address_region,
        address_area: body.address_area,
        address_city: body.address_city,
        address_city_district: body.address_city_district,
        address_settlement: body.address_settlement,
        address_street: body.address_street,
        address_house: body.address_house,
        address_block: body.address_block,
        address_flat: body.address_flat,
        geo_lat: body.geo_lat,
        geo_lon: body.geo_lon,
        wifi: body.wifi,
        airConditioner: body.airConditioner,
        price: body.price,
    };

    try {
        const uploadResponse = await cloudinary.v2.uploader.upload(imageBase64, {
            folder: 'listings',
            upload_preset: process.env.CLOUDINARY_CLOUD_PRESET,
        });

        const createdListing = await prisma.listing.create({
            data: {
                ...listing,
                imageSrc: uploadResponse.secure_url,
                userId: currentUser.id,
            },
        });

        return NextResponse.json({ createdListing }, {
            status: 201,
        });
        
    } catch (e) {
        console.log(e);
        return NextResponse.json({}, {
            status: 400,
        });
    }
}