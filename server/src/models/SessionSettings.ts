import Joi from 'joi';
import mongoose from 'mongoose';
import { NotificationsTypes } from './Enums';

interface ISessionSettings extends mongoose.Document {
    sessionHarmonogram: string[];
    notificationsType: NotificationsTypes;
    isActive: boolean;
}

const sessionSettingsSchema = new mongoose.Schema({
    sessionHarmonogram: {
        type: [
            {
                type: String,
                required: true
            }
        ],
        default: []
    },
    notificationsType: {
        type: NotificationsTypes,
        default: NotificationsTypes.EMAIL,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false,
        required: true
    }
});

const SessionSettings = mongoose.model<ISessionSettings>('SessionSettings', sessionSettingsSchema);

function validateSessionSettings(sessionSettings: typeof SessionSettings): Joi.ValidationResult {
    const schema = Joi.object({
        sessionHarmonogram: Joi.array().default([]),
        notificationsType: Joi.string().valid(...Object.values(NotificationsTypes)),
        isActive: Joi.boolean()
    });

    return schema.validate(sessionSettings);
}

export { ISessionSettings, SessionSettings, sessionSettingsSchema, validateSessionSettings };
