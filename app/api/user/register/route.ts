import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/shared/libs/prismadb';
import { createActivationToken } from '@/shared/libs/tokens';
import sendMail from '@/shared/libs/sendEmail';
import { activateTemplateEmail } from '@/shared/emailTemplates/activate';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
        return NextResponse.json({}, {
            status: 400,
        });
    }

    // Check if user with the same email already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return NextResponse.json({}, {
            status: 409,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
        },
    });

    const activation_token = createActivationToken({
        id: user.id,
    });

    const url = `${process.env.NEXTAUTH_URL}/activate/${activation_token}`;

    sendMail(
        email,
        name,
        url,
        'Бережок - подвердите почту',
        activateTemplateEmail,
    ).catch(e => console.log(e));

    return NextResponse.json({
        user,
    }, {
        status: 201,
    });
}
