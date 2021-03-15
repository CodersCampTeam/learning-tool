import express, { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { FlashcardCollection, IFlashcardCollection } from '../models/FlashcardCollection';
import { User } from '../models/User';
import { getRevisionList, getLearningList } from '../services/SessionEngine';

const router = express.Router();

router.get('/revision/:collectionId', async (req: Request, res: Response) => {
    const collectionId = req.params.collectionId;

    const collection = await FlashcardCollection.findById(collectionId).populate('flashcards');
    if (!collection) {
        return res.status(404).send(`Flashcard collection with ID ${collectionId} was not found`);
    }
    const loggedInUser = await User.findById(req.user?._id);
    if (!isAccessible(collection, loggedInUser?._id)) {
        return res.status(403).send(`Flashcard collection with ID ${collectionId} cannot be accessed by you`);
    }

    const revisionList = await getRevisionList(collection.id);
    res.status(200).send(revisionList);
});

router.get('/learning/:collectionId', async (req: Request, res: Response) => {
    const collectionId = req.params.collectionId;

    const collection = await FlashcardCollection.findById(collectionId).populate('flashcards');
    if (!collection) {
        return res.status(404).send(`Flashcard collection with ID ${collectionId} was not found`);
    }
    const loggedInUser = await User.findById(req.user?._id);
    if (!isAccessible(collection, loggedInUser?._id)) {
        return res.status(403).send(`Flashcard collection with ID ${collectionId} cannot be accessed by you`);
    }

    const learningList = await getLearningList(collection.id);
    res.status(200).send(learningList);
});

const isAccessible = (collection: IFlashcardCollection, loggedInUser: ObjectId | null): boolean => {
    return collection.owner === loggedInUser || collection.isPublic;
};

export default router;
