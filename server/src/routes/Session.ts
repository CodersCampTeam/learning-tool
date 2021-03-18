import express, { Request, Response } from 'express';
import { FlashcardCollection } from '../models/FlashcardCollection';
import { checkCollectionPermissions } from '../services/checkCollectionPermissions';
import { getRevisionList, getLearningList } from '../services/SessionEngine';

const router = express.Router();

router.get('/revision/:collectionId', async (req: Request, res: Response, next) => {
    try {
        const collection = await FlashcardCollection.findById(req.params.collectionId).populate('flashcards');
        if (!collection) {
            return res.status(404).send('The flashcard collection with the given ID was not found.');
        }
        await checkCollectionPermissions(req, collection.id);

        const revisionList = await getRevisionList(collection.id);
        res.status(200).send(revisionList);
    } catch (error) {
        next(error);
    }
});

router.get('/learning/:collectionId', async (req: Request, res: Response, next) => {
    try {
        const collection = await FlashcardCollection.findById(req.params.collectionId).populate('flashcards');
        if (!collection) {
            return res.status(404).send('The flashcard collection with the given ID was not found.');
        }
        await checkCollectionPermissions(req, collection.id);

        const learningList = await getLearningList(collection.id);
        res.status(200).send(learningList);
    } catch (error) {
        next(error);
    }
});

export default router;
