import Joi from 'joi';
import mongoose from 'mongoose';

const statisticsSchema = new mongoose.Schema({
    longestSeries: {
        type: Number,
        min: 0,
        required: false
    },
    flashcardsLearnt: {
        type: Number,
        min: 0,
        required: false
    },
    flashcardsInRepetitions: {
        type: Number,
        min: 0,
        required: false
    }
});

const Statistics = mongoose.model('Statistics', statisticsSchema);

function validateStatistics(statistics: typeof Statistics): Joi.ValidationResult {
    const schema = Joi.object({
        longestSeries: Joi.number().min(0),
        flashcardsLearnt: Joi.number().min(0),
        flashcardsInRepetitions: Joi.number().min(0)
    });

    return schema.validate(statistics);
}

export { Statistics, validateStatistics, statisticsSchema };
