import Joi from 'joi';
import mongoose from 'mongoose';

const AnswerHistory = mongoose.model(
    'AnswerHistory',
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        sessionDate: {
            type: Date,
            required: true
        },
        flashcardCollectionId: {
            type: String,
            required: true
        },
        answers: {
            type: Array,
            required: true,
            default: []
        }
    })
);

function validateAnswerHistory(answerHistory: typeof AnswerHistory): Joi.ValidationResult {
    const schema = Joi.object({
        user: Joi.string().required(),
        sessionDate: Joi.date().required(),
        flashcardCollectionId: Joi.string().required(),
        answers: Joi.array().default([]).required()
    });

    return schema.validate(answerHistory);
}

export { AnswerHistory, validateAnswerHistory };
