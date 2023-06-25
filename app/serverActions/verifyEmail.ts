import jwt from 'jsonwebtoken';
import prisma from '@/shared/libs/prismadb';

interface UserToken {
    id: string;
}

const verifyEmail = async (token: string): Promise<boolean> => {
    const userToken = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET!) as UserToken;

    const currentUser = await prisma.user.findUnique({
        where: {
            id: userToken.id,
        },
    });

    if (!currentUser) {
        return false;
    }

    if (currentUser.emailVerified) {
        return false;
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: userToken.id,
        },
        data: {
            emailVerified: new Date(),
        },
    });

    return true;
};

export default verifyEmail;