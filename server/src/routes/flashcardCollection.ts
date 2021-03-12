import express, { Request, Response } from 'express';
import { Tag, assignUniqueTagsAndReturn } from '../models/Tag';
import { FlashcardCollection, validateFlashcardCollection } from '../models/FlashcardCollection';
import { Flashcard } from '../models/Flashcard';
import { User } from '../models/User';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const owner = await User.findOne({ username: req.body.owner });
        const flashcardCollection = new FlashcardCollection({
            owner: owner._id,
            name: req.body.name,
            isPublic: req.body.isPublic,
            tags: await assignUniqueTagsAndReturn(req.body.tags),
            flashcards: req.body.flashcards
        });
        const { error } = validateFlashcardCollection(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        await flashcardCollection.save();
        res.send(flashcardCollection);
    } catch (error) {
        res.status(500).send('Something went wrong').end();
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const flashcardCollection = await FlashcardCollection.findById(req.params.id)
            .populate({
                path: 'tags',
                model: Tag
            })
            .populate({
                path: 'flashcards',
                model: Flashcard
            });

        if (flashcardCollection.isPublic) {
            res.send(flashcardCollection);
        } else {
            res.status(403).send('You do not have access to this flashcard collection').end();
        }
    } catch (error) {
        res.status(500).send('Something went wrong').end();
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const flashcardCollection = await FlashcardCollection.findByIdAndRemove(req.params.id);
        if (!flashcardCollection) return res.status(404).send('The flashcardCollection does not exist');
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Something went wrong').end();
    }
});

export default router;
