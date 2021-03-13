import Joi from 'joi';
import mongoose from 'mongoose';

interface ISessionSettings extends mongoose.Document {
    sessionHarmonogram: Date;
}

const sessionSettingsSchema = new mongoose.Schema({
    sessionHarmonogram: {
        type: Date,
        required: false
    }
});

const SessionSettings = mongoose.model<ISessionSettings>('SessionSettings', sessionSettingsSchema);

function validateSessionSettings(sessionSettings: typeof SessionSettings): Joi.ValidationResult {
    const schema = Joi.object({
        sessionHarmonogram: Joi.date()
    });

    return schema.validate(sessionSettings);
}

export { SessionSettings, sessionSettingsSchema, validateSessionSettings };
