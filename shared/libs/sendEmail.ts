import nodemailer, { Transporter, TransportOptions } from 'nodemailer';

export default async function sendMail(
    to: string,
    name: string,
    url: string,
    subject: string,
    template: (url: any) => string,
) {

    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    } as TransportOptions);

    const html = template(url);

    await new Promise((resolve, reject) => {
        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(success);
            }
        });
    });

    const options = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    };
    await new Promise((resolve, reject) => {
        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}
