import Joi from 'joi';
import mongoose from 'mongoose';

interface IAnswerHistory extends mongoose.Document {
    user: mongoose.Schema.Types.ObjectId;
    sessionDate: string;
    flashcardCollection: mongoose.Schema.Types.ObjectId;
    answers: mongoose.Schema.Types.ObjectId[];
}

const answerHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sessionDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    flashcardCollection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlashcardCollection',
        required: true
    },
    answers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Answer'
            }
        ],
        required: true,
        default: []
    }
});

const AnswerHistory = mongoose.model<IAnswerHistory>('AnswerHistory', answerHistorySchema);

function validateAnswerHistory(answerHistory: typeof AnswerHistory): Joi.ValidationResult {
    const schema = Joi.object({
        user: Joi.string().required(),
        flashcardCollection: Joi.string().required(),
        answers: Joi.array().default([]).required()
    });

    return schema.validate(answerHistory);
}

export { AnswerHistory, validateAnswerHistory };
