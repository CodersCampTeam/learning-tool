import Joi from 'joi';
import mongoose from 'mongoose';

const flashcardCollectionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        minLength: 1,
        maxLength: 255,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    tags: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tag'
            }
        ],
        default: [],
        validate: [(tagsArr) => tagsArr.length <= 5, 'You can assign only 5 tags']
    },
    flashcards: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Flashcard'
            }
        ],
        default: []
    }
});

const FlashcardCollection = mongoose.model('FlashcardCollection', flashcardCollectionSchema);

function validateFlashcardCollection(flashcardCollection: typeof FlashcardCollection): Joi.ValidationResult {
    const schema = Joi.object({
        owner: Joi.string().required(),
        name: Joi.string().min(1).max(255).required(),
        isPublic: Joi.boolean().default(false),
        tags: Joi.array().default([]),
        flashcards: Joi.array().default([])
    });

    return schema.validate(flashcardCollection);
}

export { FlashcardCollection, validateFlashcardCollection };