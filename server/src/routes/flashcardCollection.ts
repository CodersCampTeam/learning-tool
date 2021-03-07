import express, { Request, Response } from 'express';
import { Tag } from '../models/Tag';
import { FlashcardCollection, validateFlashcardCollection } from '../models/FlashcardCollection';
import { Flashcard } from '../models/Flashcard';
import passport from 'passport';
import { checkCollectionPermissions } from '../services/checkCollectionPermissions';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), (req: Request, res: Response, next) => {
    try {
        const flashcardCollection = new FlashcardCollection({
            owner: req.body.owner,
            name: req.body.name,
            isPublic: req.body.isPublic,
            tags: req.body.tags,
            flashcards: req.body.flashcards
        });
        const { error } = validateFlashcardCollection(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        flashcardCollection.save();
        res.send(flashcardCollection);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response, next) => {
    try {
        const flashcardCollection = await FlashcardCollection.findById(req.params.id);
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

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response, next) => {
    try {
        const flashcardCollection = await FlashcardCollection.findById(req.params.id);
        if (!flashcardCollection) return res.status(404).send('The flashcardCollection does not exist');
        await checkCollectionPermissions(req, flashcardCollection._id);
        await flashcardCollection.deleteOne();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
