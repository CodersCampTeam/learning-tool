import Joi from 'joi';
import mongoose from 'mongoose';

interface IFlashcard extends mongoose.Document {
    prompt: string;
    imageUrl: string;
    answers: string[];
    extraInfo: string;
    isQuizQuestion: boolean;
    correctAnswer: number;
}

const flashcardSchema = new mongoose.Schema({
    prompt: {
        type: String,
        minLength: 1,
        maxLength: 4096,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    answers: {
        type: [
            {
                type: String,
                minLength: 1,
                maxLength: 4096,
                required: true
            }
        ],
        required: true,
        default: []
    },
    extraInfo: {
        type: String,
        minLength: 1,
        maxLength: 4096,
        required: false
    },
    isQuizQuestion: {
        type: Boolean,
        required: true
    },
    correctAnswer: {
        type: Number,
        required: false,
        default: 0
    }
});

const Flashcard = mongoose.model<IFlashcard>('Flashcard', flashcardSchema);

function validateFlashcard(flashcard: typeof Flashcard): Joi.ValidationResult {
    const schema = Joi.object({
        prompt: Joi.string().min(1).max(4096).required(),
        imageUrl: Joi.string(),
        answers: Joi.array()
            .items(Joi.string().min(1).max(4096))
            .when('isQuizQuestion', { is: true, then: Joi.array().min(1).required() })
            .when('isQuizQuestion', { is: false, then: Joi.array().min(1).max(1).required() })
            .required(),
        extraInfo: Joi.string().min(1).max(4096),
        isQuizQuestion: Joi.boolean().default(false).required(),
        correctAnswer: Joi.number().default(0)
    });

    return schema.validate(flashcard);
}

function validateFlashcardUpdate(flashcard: typeof Flashcard): Joi.ValidationResult {
    const schema = Joi.object({
        prompt: Joi.string().min(1).max(4096),
        imageUrl: Joi.string(),
        answers: Joi.array()
            .items(Joi.string().min(1).max(4096))
            .when('isQuizQuestion', { is: true, then: Joi.array().min(1).required() })
            .when('isQuizQuestion', { is: false, then: Joi.array().min(1).max(1).required() }),
        extraInfo: Joi.string().min(1).max(4096),
        isQuizQuestion: Joi.boolean(),
        correctAnswer: Joi.number()
    });

    return schema.validate(flashcard);
}

export { Flashcard, validateFlashcard, validateFlashcardUpdate };
