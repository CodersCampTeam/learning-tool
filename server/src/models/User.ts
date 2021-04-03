/* eslint-disable no-useless-escape */
import Joi from 'joi';
import mongoose, { Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import passwordComplexity from 'joi-password-complexity';
import { ISessionSettings, sessionSettingsSchema } from './SessionSettings';

export interface IUser extends Document {
    id: string;
    username: string;
    password: string;
    email: string;
    isActive: boolean;
    isBlocked: boolean;
    avatarImg: string;
    sessionSettings: ISessionSettings;
    generateAuthToken: () => string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 1024,
        required: false
    },
    username: {
        type: String,
        minLength: 2,
        maxLength: 30,
        unique: true,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: false
    },
    isBlocked: {
        type: Boolean,
        default: false,
        required: false
    },
    avatarImg: {
        type: String,
        required: false
    },
    sessionSettings: {
        type: sessionSettingsSchema,
        required: false,
        default: () => ({})
    },
    googleId: {
        type: String
    },
    id: {
        type: String
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY || 'privateKey');
};

const User = mongoose.model<IUser>('User', userSchema);

function validateUser(user: IUser): Joi.ValidationResult {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: passwordComplexity().required(),
        username: Joi.string().min(2).max(30).required(),
        isActive: Joi.boolean().default(true),
        isBlocked: Joi.boolean().default(false),
        avatarImg: Joi.string(),
        sessionSettings: Joi.string()
    });

    return schema.validate(user);
}

function validateUserProfile(user: IUser): Joi.ValidationResult {
    const schema = Joi.object({
        email: Joi.string().email(),
        password: passwordComplexity(),
        username: Joi.string().min(2).max(30)
    });

    return schema.validate(user);
}

export { User, validateUser, validateUserProfile };
