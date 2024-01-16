import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import { MessageContent } from './messageContent';


const sendMail = async (to: string, randomNumber: number) => {
    // use nodemailer to create an email sent by gmail
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    try {
        await transport.verify();
    } catch (error) {
        return;
    }
    // customed Message for code email
    const template = handlebars.compile(MessageContent);

    try {
        const sendResult = await transport.sendMail({
            from: process.env.SMTP_EMAIL,
            to,
            subject: 'Validate your email',
            html: template({ randomNumber: randomNumber }),
        });
        console.log(sendResult);
    } catch (error) {
        console.log(error);
    }
};

export default sendMail;
