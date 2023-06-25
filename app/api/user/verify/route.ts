import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextResponse } from 'next/server';
import prisma from '@/shared/libs/prismadb';
import { createActivationToken } from '@/shared/libs/tokens';
import sendMail from '@/shared/libs/sendEmail';
import { activateTemplateEmail } from '@/shared/emailTemplates/activate';


export async function PUT() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email as string,
        },
    });

    if (!user) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    if (user.emailVerified) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const activation_token = createActivationToken({
        id: user.id,
    });

    const url = `${process.env.NEXTAUTH_URL}/activate/${activation_token}`;

    sendMail(
        session.user.email,
        user.name || '',
        url,
        'Бережок - подвердите почту',
        activateTemplateEmail,
    ).catch(e => console.log(e));

    return NextResponse.json({}, {
        status: 201,
    });
}