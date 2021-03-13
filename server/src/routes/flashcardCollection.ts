import express, { Request, Response } from 'express';
import { Tag, assignUniqueTagsAndReturn } from '../models/Tag';
import { FlashcardCollection, validateFlashcardCollection } from '../models/FlashcardCollection';
import { Flashcard } from '../models/Flashcard';
import { checkCollectionPermissions } from '../services/checkCollectionPermissions';
const router = express.Router();

router.post('/', async (req: Request, res: Response, next) => {
    try {
        req.body.owner = `${req['user']._id}`;
        req.body.tags = await assignUniqueTagsAndReturn(req.body.tags);
        const flashcardCollection = new FlashcardCollection({
            owner: req.body.owner,
            name: req.body.name,
            isPublic: req.body.isPublic,
            tags: req.body.tags,
            flashcards: req.body.flashcards
        });
        const { error } = validateFlashcardCollection(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        await flashcardCollection.save();
        res.send(flashcardCollection);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req: Request, res: Response, next) => {
    try {
        const flashcardCollection = await FlashcardCollection.findById(req.params.id);
        if (!flashcardCollection) return res.status(404).send('The flashcard with the given ID was not found.');
        await checkCollectionPermissions(req, flashcardCollection._id);
        await flashcardCollection
            .populate({
                path: 'tags',
                model: Tag
            })
            .populate({
                path: 'flashcards',
                model: Flashcard
            });
        res.send(flashcardCollection);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req: Request, res: Response, next) => {
    try {
        const flashcardCollection = await FlashcardCollection.findById(req.params.id);
        if (!flashcardCollection) return res.status(404).send('The flashcard collection with a given ID was not found');
        await checkCollectionPermissions(req, flashcardCollection._id);
        await flashcardCollection.deleteOne();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
