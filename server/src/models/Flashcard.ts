import Joi from 'joi';
import mongoose from 'mongoose';

interface IFlashcard extends mongoose.Document {
    prompt: string;
    imageUrl: string;
    answer: string;
    extraInfo: string;
    collectionId: mongoose.Schema.Types.ObjectId;
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
    answer: {
        type: String,
        minLength: 1,
        maxLength: 4096,
        required: true
    },
    extraInfo: {
        type: String,
        minLength: 1,
        maxLength: 4096,
        required: false
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlashcardCollection'
    }
});

const Flashcard = mongoose.model<IFlashcard>('Flashcard', flashcardSchema);

function validateFlashcard(flashcard: typeof Flashcard): Joi.ValidationResult {
    const schema = Joi.object({
        prompt: Joi.string().min(1).max(4096).required(),
        imageUrl: Joi.string(),
        answer: Joi.string().min(1).max(4096).required(),
        extraInfo: Joi.string().min(1).max(4096),
        collectionID: Joi.string()
    });

    return schema.validate(flashcard);
}

function validateFlashcardUpdate(flashcard: typeof Flashcard): Joi.ValidationResult {
    const schema = Joi.object({
        prompt: Joi.string().min(1).max(4096),
        imageUrl: Joi.string(),
        answer: Joi.string().min(1).max(4096),
        extraInfo: Joi.string().min(1).max(4096),
        collectionID: Joi.string()
    });

    return schema.validate(flashcard);
}

export { Flashcard, validateFlashcard, validateFlashcardUpdate };
