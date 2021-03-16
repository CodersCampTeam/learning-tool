import Joi from 'joi';
import mongoose from 'mongoose';
import { NotificationsTypes } from './Enums';

interface ISessionSettings extends mongoose.Document {
    sessionHarmonogram: string;
    notificationsType: NotificationsTypes;
}

const sessionSettingsSchema = new mongoose.Schema({
    sessionHarmonogram: {
        type: String,
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
        sessionHarmonogram: Joi.string(),
        notificationsType: Joi.string().valid(...Object.values(NotificationsTypes))
    });

    return schema.validate(sessionSettings);
}

export { ISessionSettings, SessionSettings, sessionSettingsSchema, validateSessionSettings };
