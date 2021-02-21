import Joi from 'joi';
import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    answer: {
        type: String,
        required: true
    },
    extraInfo: {
        type: String,
        required: false
    }
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

function validateFlashcard(flashcard: typeof Flashcard): Joi.ValidationResult {
    const schema = Joi.object({
        prompt: Joi.string().min(1).required(),
        imageUrl: Joi.string().min(1),
        answer: Joi.string().required(),
        extraInfo: Joi.string()
    });

    return schema.validate(flashcard);
}

export { Flashcard, validateFlashcard, flashcardSchema };
