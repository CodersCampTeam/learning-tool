/* eslint-disable no-useless-escape */
import Joi from 'joi';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 50,
        required: true
    },
    username: {
        type: String,
        minLength: 2,
        maxLength: 30,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: false
    },
    isBlocked: {
        type: Boolean,
        detault: false,
        required: false
    },
    avatarImg: {
        type: String,
        required: false
    },
    sessionSettings: {
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SessionSettings'
        },
        required: false
    }
});

const User = mongoose.model('User', userSchema);

function validateUser(user: typeof User): Joi.ValidationResult {
    const schema = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(8).max(50).required(),
        username: Joi.string().min(2).max(30).required(),
        isActive: Joi.boolean().default(true),
        isBlocked: Joi.boolean().default(false),
        avatarImg: Joi.string().required(),
        sessionSettings: Joi.string()
    });

    return schema.validate(user);
}

export { User, userSchema, validateUser };
