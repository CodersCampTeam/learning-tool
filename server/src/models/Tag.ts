import Joi from 'joi';
import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    tag: {
        type: String,
        minLength: 1,
        maxLength: 30,
        lowercase: true,
        trim: true,
        required: true
    }
});

const Tag = mongoose.model('Tag', tagSchema);

function validateTag(tag: typeof Tag): Joi.ValidationResult {
    const schema = Joi.object({
        tag: Joi.string().min(1).max(30).trim().lowercase().required()
    });

    return schema.validate(tag);
}

export { Tag, validateTag, tagSchema };
