import { NextResponse } from 'next/server';
import prisma from '@/shared/libs/prismadb';
import { createResetToken } from '@/shared/libs/tokens';
import sendMail from '@/shared/libs/sendEmail';
import { resetTemplateEmail } from '@/shared/emailTemplates/reset';


export async function POST(request: Request) {
    const body = await request.json();
    const { email } = body;


    if (!email) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    const reset_token = createResetToken({
        id: user.id,
    });

    const url = `${process.env.NEXTAUTH_URL}/reset/${reset_token}`;

    try {
        await sendMail(
            email,
            user.name || '',
            url,
            'Бережок - восстановление пароля',
            resetTemplateEmail,
        );
    } catch (e) {
        return NextResponse.json({}, {
            status: 400,
        });
    }
    
    return NextResponse.json({}, {
        status: 201,
    });
}