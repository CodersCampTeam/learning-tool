import express, { Request, Response } from 'express';
import { Flashcard, validateFlashcard } from '../models/Flashcard';
import { FlashcardCollection } from '../models/FlashcardCollection';
const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id);
        if (!flashcard) return res.status(404).send('The flashcard with the given ID was not found.');
        res.send(flashcard);
    } catch (error) {
        res.status(400).send('Invalid ID.');
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const collection = await FlashcardCollection.findById(req.params.id);
        if (!collection) return res.status(404).send('The flashcard collection with the given ID was not found.');
        const flashcard = new Flashcard({
            prompt: req.body.prompt,
            imageUrl: req.body.imageUrl,
            answer: req.body.answer,
            extraInfo: req.body.extraInfo
        });
        const { error } = validateFlashcard(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        await collection['flashcards'].push(flashcard);
        await collection.save();
        await flashcard.save();
        res.send(flashcard);
    } catch (error) {
        res.status(500).send('Ooops! Something went wrong.');
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const flashcard = await Flashcard.findByIdAndRemove(req.params.id);
        if (!flashcard) return res.status(404).send('The flashcard with the given ID was not found.');
        res.status(204);
    } catch (error) {
        return res.status(400).send('Invalid ID.');
    }
});

router.patch('/:id', async (req: Request, res: Response) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id);
        if (!flashcard) return res.status(404).send('The flashcard with the given ID was not found.');
        await flashcard.updateOne({ $set: req.body });
        res.send(await Flashcard.findById(flashcard.id));
    } catch (error) {
        res.status(500).send('Ooops! Something went wrong.');
    }
});

export default router;
