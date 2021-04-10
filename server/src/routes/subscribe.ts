import express, { Request, Response } from 'express';
import { FlashcardCollection } from '../models/FlashcardCollection';
const router = express.Router();

router.post('/', async (req: Request, res: Response, next) => {
    try {
        const user = req['user'];
        const flashcardCollection = await FlashcardCollection.findById(req.body.id);
        if (!flashcardCollection)
            return res.status(404).send('The flashcard collection with the given ID was not found.');
        if (user._id !== flashcardCollection.owner && flashcardCollection?.subscribedUsers.indexOf(user._id) === -1)
            await flashcardCollection.updateOne({ $push: { subscribedUsers: [user._id] } });
        res.status(200).send(await FlashcardCollection.findById(flashcardCollection.id));
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req: Request, res: Response, next) => {
    try {
        const user = req['user'];
        const flashcardCollection = await FlashcardCollection.findById(req.params.id);
        if (!flashcardCollection)
            return res.status(404).send('The flashcard collection with the given ID was not found.');
        await flashcardCollection.updateOne({ $pull: { subscribedUsers: user._id } });
        res.status(200).send(await FlashcardCollection.findById(flashcardCollection.id));
    } catch (error) {
        next(error);
    }
});

export default router;
