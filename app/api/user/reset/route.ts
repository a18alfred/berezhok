import { NextResponse } from 'next/server';
import prisma from '@/shared/libs/prismadb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface UserToken {
    id: string;
    iat: number;
    exp: number;
}

export async function PUT(request: Request) {
    const body = await request.json();
    const { password, token } = body;

    const blacklistedToken = await prisma.blacklistedToken.findUnique({
        where: {
            token: token,
        },
    });

    const userToken = jwt.verify(token, process.env.RESET_TOKEN_SECRET!) as UserToken;

    const user = await prisma.user.findUnique({
        where: {
            id: userToken.id,
        },
    });

    if (blacklistedToken || userToken.exp <= Math.floor(Date.now() / 1000) || !user) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await prisma.user.update({
        where: {
            id: userToken.id,
        },
        data: {
            hashedPassword,
        },
    });

    await prisma.blacklistedToken.create({
        data: {
            token,
        },
    });

    return NextResponse.json({
        updatedUser,
    }, {
        status: 201,
    });
}