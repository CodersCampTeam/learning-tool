import express, { Request, Response } from 'express';
import { Answer, validateAnswer } from '../models/Answer';
const router = express.Router();

router.post('/', async (req: Request, res: Response, next) => {
    try {
        const answer = new Answer({
            flashcardId: req.body.flashcardId,
            date: req.body.date,
            isCorrect: req.body.isCorrect
        });
        const { error } = validateAnswer(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else await answer.save();
        res.status(201).send(answer);
    } catch (error) {
        next(error);
    }
});

export default router;
