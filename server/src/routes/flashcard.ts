import express, { Request, Response } from 'express';
import passport from 'passport';
import { Answer } from '../models/Answer';
import { Flashcard, validateFlashcard, validateFlashcardUpdate } from '../models/Flashcard';
import { FlashcardCollection } from '../models/FlashcardCollection';
import { checkCollectionPermissions } from '../services/checkCollectionPermissions';
const router = express.Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response, next) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id);
        if (!flashcard) return res.status(404).send('The flashcard with the given ID was not found.');
        await checkCollectionPermissions(req, flashcard.collectionId);
        res.send(flashcard);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response, next) => {
    try {
        const collection = await FlashcardCollection.findById(req.params.id);
        if (!collection) return res.status(404).send('The flashcard collection with the given ID was not found.');
        await checkCollectionPermissions(req as Request, collection.id);
        const flashcard = new Flashcard({
            prompt: req.body.prompt,
            imageUrl: req.body.imageUrl,
            collectionId: req.params.id,
            answers: req.body.answers,
            extraInfo: req.body.extraInfo,
            isQuizQuestion: req.body.isQuizQuestion,
            correctAnswer: req.body.correctAnswer
        });
        const { error } = validateFlashcard(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        collection.get('flashcards').push(flashcard.id);
        await collection.save();
        await flashcard.save();
        res.send(flashcard);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response, next) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id);
        if (!flashcard) return res.status(404).send('The flashcard with the given ID was not found.');
        await checkCollectionPermissions(req, flashcard.collectionId);
        const collection = await FlashcardCollection.findById(flashcard.collectionId);
        await collection.update({ $pull: { flashcards: flashcard._id } });
        await flashcard.deleteOne();

        await Answer.deleteMany({ flashcardId: req.params.id });

        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response, next) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id);
        if (!flashcard) return res.status(404).send('The flashcard with the given ID was not found.');
        await checkCollectionPermissions(req, flashcard.collectionId);
        const { error } = validateFlashcardUpdate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        await flashcard.updateOne({ $set: req.body });
        res.send(await Flashcard.findById(flashcard.id));
    } catch (error) {
        next(error);
    }
});

export default router;
