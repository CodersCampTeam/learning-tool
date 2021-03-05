import express, { Request, Response } from 'express';
import { Answer, validateAnswer } from '../models/Answer';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const answer = new Answer({
            flashcard: req.body.flashcardId,
            date: req.body.Date,
            isCorrect: req.body.isCorrect
        });
        const { error } = validateAnswer(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else await answer.save();
        res.status(201).send('Session data successfully saved');
        res.send(answer);
    } catch (error) {
        res.status(500).send('Something went wrong').end();
    }
});
