import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as handlebars from 'handlebars'
import { MessageContent } from './messageContent';

const sendMail = async(to:string,randomNumber:number) => {

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })

    try{
        const testResult = await transport.verify();
    }
    catch(error){
        return;
    }

    const handlebarsOption = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    }; 
    

    const template = handlebars.compile(MessageContent)

    try{
        const sendResult = await transport.sendMail({
            from: process.env.SMTP_EMAIL,
            to,
            subject:"Validate your email",
            html:template({randomNumber: randomNumber})
        })
        console.log(sendResult)
    }
    catch(error){
        console.log(error)
    }
}


export default sendMail