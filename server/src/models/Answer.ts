import Joi from 'joi';
import mongoose from 'mongoose';

interface IAnswer extends mongoose.Document {
    flashcard: mongoose.Schema.Types.ObjectId;
    date: Date;
    isCorrect: boolean;
}

const answerSchema = new mongoose.Schema({
    flashcard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flashcard',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
});

const Answer = mongoose.model<IAnswer>('Answer', answerSchema);

function validateAnswer(flashcard: typeof Answer): Joi.ValidationResult {
    const schema = Joi.object({
        flashcardId: Joi.string().required(),
        date: Joi.date().required(),
        isCorrect: Joi.boolean().required()
    });

    return schema.validate(flashcard);
}

export { Answer, validateAnswer };
