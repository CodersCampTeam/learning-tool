import express, { Request, Response } from 'express';
import { AnswerHistory, validateAnswerHistory } from '../models/AnswerHistory';
const router = express.Router();

router.post('/', async (req: Request, res: Response, next) => {
    try {
        req.body.user = `${req['user']._id}`;
        const answerHistory = new AnswerHistory({
            user: req.body.user,
            sessionDate: req.body.sessionDate,
            flashcardCollection: req.body.flashcardCollection,
            answers: req.body.answers
        });
        const { error } = validateAnswerHistory(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else await answerHistory.save();
        res.status(201).send('Session data successfully saved');
        res.send(answerHistory);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req: Request, res: Response, next) => {
    try {
        const history = await AnswerHistory.findById(req.params.id);
        if (!history) return res.status(404).send('The answer history with the given ID was not found.');
        res.status(200).send(history);
    } catch (error) {
        next(error);
    }
});

export default router;
