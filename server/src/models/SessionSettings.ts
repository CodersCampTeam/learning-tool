import Joi from 'joi';
import mongoose from 'mongoose';

const sessionSettingsSchema = new mongoose.Schema({
    userId: {
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        required: false
    },
    sessionHarmonogram: {
        type: Date,
        required: false
    }
});

const SessionSettings = mongoose.model('SessionSettings', sessionSettingsSchema);

function validateSessionSettings(sessionSettings: typeof SessionSettings): Joi.ValidationResult {
    const schema = Joi.object({
        userId: Joi.string(),
        sessionHarmonogram: Joi.date()
    });

    return schema.validate(sessionSettings);
}

export { SessionSettings, validateSessionSettings, sessionSettingsSchema };
