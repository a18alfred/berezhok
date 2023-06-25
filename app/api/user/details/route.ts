import { NextResponse } from 'next/server';
import prisma from '@/shared/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({
            user: null,
        });
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email as string,
        },
    });

    if (!currentUser) {
        return NextResponse.json({
            user: null,
        });
    }

    return NextResponse.json({
        user: {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
        },
    });
}