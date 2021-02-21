import Joi from 'joi';
import mongoose from 'mongoose';

const sessionSettingsSchema = new mongoose.Schema({
    sessionHarmonogram: {
        type: Date,
        required: false
    }
});

const SessionSettings = mongoose.model('SessionSettings', sessionSettingsSchema);

function validateSessionSettings(sessionSettings: typeof SessionSettings): Joi.ValidationResult {
    const schema = Joi.object({
        sessionHarmonogram: Joi.date()
    });

    return schema.validate(sessionSettings);
}

export { SessionSettings, validateSessionSettings };
