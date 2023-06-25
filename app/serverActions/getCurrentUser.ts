import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/shared/libs/prismadb';
import { IUser } from '@/shared/types/types';

export const getSession = async () => {
    return await getServerSession(authOptions);
};


const getCurrentUser = async (): Promise<IUser | null> => {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified:
                currentUser.emailVerified?.toISOString() || null,
        };
        
    } catch (error: any) {
        return null;
    }
};

export default getCurrentUser;