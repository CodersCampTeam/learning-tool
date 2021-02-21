import Joi from 'joi';
import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    }
});

const Token = mongoose.model('SessionSettings', tokenSchema);

function validateToken(token: typeof Token): Joi.ValidationResult {
    const schema = Joi.object({
        token: Joi.string().required()
    });

    return schema.validate(token);
}

export { Token, validateToken };
