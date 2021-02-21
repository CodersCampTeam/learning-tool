import Joi from 'joi';
import mongoose from 'mongoose';

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
    }
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

function validateFlashcard(flashcard: typeof Flashcard): Joi.ValidationResult {
    const schema = Joi.object({
        prompt: Joi.string().min(1).max(4096).required(),
        imageUrl: Joi.string(),
        answer: Joi.string().min(1).max(4096).required(),
        extraInfo: Joi.string().min(1).max(4096)
    });

    return schema.validate(flashcard);
}

export { Flashcard, validateFlashcard };
