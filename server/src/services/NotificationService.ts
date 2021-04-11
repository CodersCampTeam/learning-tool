import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { User } from '../models/User';

const runNotificationService = (): void => {
    if (process.env.EMAIL_ADDRESS && process.env.EMAIL_PSWD && process.env.JEST_WORKER_ID === undefined) {
        // Schedule checks every hour. Mail will be sent to user which
        // session time DD:MM:YYYY HH:--:-- match current time
        cron.schedule('0 * * * *', sendEmail);
    }
};

async function sendEmail(): Promise<void> {
    const today = new Date();
    const todayDay = today.getDay();
    const todayHour = today.getUTCHours();

    const users = await User.find({
        'sessionSettings.sessionHarmonogram': todayDay,
        'sessionSettings.hour': todayHour,
        'sessionSettings.isActive': true
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
