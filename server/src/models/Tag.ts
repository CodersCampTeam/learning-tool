import Joi from 'joi';
import mongoose from 'mongoose';

interface ITag extends mongoose.Document {
    tag: string;
}

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

const Tag = mongoose.model<ITag>('Tag', tagSchema);

function validateTag(tag: typeof Tag): Joi.ValidationResult {
    const schema = Joi.object({
        tag: Joi.string().min(1).max(30).trim().lowercase().required()
    });

    return schema.validate(tag);
}

async function assignUniqueTagsAndReturn(tags: string[]): Promise<string[]> {
    try {
        const allTags = [];
        for (const element of tags) {
            const tagPresent = await Tag.findOne({ tag: element });
            if (tagPresent) {
                allTags.push(tagPresent.id);
            } else {
                const tag = new Tag({
                    tag: element
                });
                tag.save();
                allTags.push(tag.id);
            }
        }
        return allTags;
    } catch (error) {
        console.log('Assigning tags failed.');
    }
}

export { Tag, validateTag, assignUniqueTagsAndReturn };
