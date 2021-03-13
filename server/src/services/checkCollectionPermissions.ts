import { ObjectId } from 'mongoose';
import { FlashcardCollection } from '../models/FlashcardCollection';

const checkCollectionPermissions = async (req, collectionId: ObjectId): Promise<void> => {
    const collection = await FlashcardCollection.findById(collectionId);
    if (`${collection.owner}` !== `${req.user._id}` && (!collection.isPublic || req.method !== 'GET')) {
        throw { ...new Error(), kind: 'noPermission' };
    }
};

export { checkCollectionPermissions };
