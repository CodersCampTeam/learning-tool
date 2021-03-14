import Joi from 'joi';
import mongoose from 'mongoose';
import { NotificationsTypes } from './Enums';

interface ISessionSettings extends mongoose.Document {
    sessionHarmonogram: Date;
}

const sessionSettingsSchema = new mongoose.Schema({
    sessionHarmonogram: {
        type: Date,
        required: true
    },
    notificationsType: {
        type: NotificationsTypes,
        default: NotificationsTypes.EMAIL
    }
});

const SessionSettings = mongoose.model<ISessionSettings>('SessionSettings', sessionSettingsSchema);

function validateSessionSettings(sessionSettings: typeof SessionSettings): Joi.ValidationResult {
    const schema = Joi.object({
        sessionHarmonogram: Joi.date(),
        notificationsType: Joi.string().valid(...Object.values(NotificationsTypes))
    });

    return schema.validate(sessionSettings);
}

export { SessionSettings, sessionSettingsSchema, validateSessionSettings };
