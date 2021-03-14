import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { User } from '../models/User';

const runNotificationService = (): void => {
    if (process.env.EMAIL_ADDRESS && process.env.EMAIL_PSWD) {
        // Schedule checks every minute. Mail will be sent to user which
        // session time DD:MM:YYYY HH:MM:-- match current time
        cron.schedule('* * * * *', sendEmail);
    }
};

async function sendEmail(): Promise<void> {
    const dateMin = new Date();
    dateMin.setSeconds(0);

    const dateMax = new Date();
    dateMax.setSeconds(59);

    const users = await User.find({
        $and: [
            {
                'sessionSettings.sessionHarmonogram': {
                    $lte: dateMax
                }
            },
            {
                'sessionSettings.sessionHarmonogram': {
                    $gte: dateMin
                }
            }
        ]
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PSWD
        }
    });

    users.forEach((user) => {
        transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: user.email.toString(),
            subject: `Dear ${user.username.toString()}, your learning time has come!`,
            text: 'Your schedule notification has fired. Go and visit learning-app to review your learning set.'
        });
    });
}

export { runNotificationService };
