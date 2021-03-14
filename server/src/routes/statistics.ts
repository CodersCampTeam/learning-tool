import express, { Request, Response } from 'express';
import passport from 'passport';
import { Answer } from '../models/Answer';
import Mongo from 'mongodb';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    const user = new Mongo.ObjectID(req.user?._id);
    try {
        Answer.aggregate(
            [
                {
                    $lookup: {
                        from: 'answerhistories',
                        localField: '_id',
                        foreignField: 'answers',
                        as: 'answershist'
                    }
                },
                {
                    $lookup: {
                        from: 'flashcards',
                        localField: 'flashcard',
                        foreignField: '_id',
                        as: 'flashcards'
                    }
                },
                {
                    $lookup: {
                        from: 'flashcardcollections',
                        localField: 'flashcards.collectionId',
                        foreignField: '_id',
                        as: 'flashcardcollection'
                    }
                },
                {
                    $addFields: {
                        flashcardcollection: { $arrayElemAt: ['$flashcardcollection', 0] },
                        flashcards: { $arrayElemAt: ['$flashcards', 0] },
                        answershist: { $arrayElemAt: ['$answershist', 0] },
                        users: { $toString: '$users' }
                    }
                },
                {
                    $group: {
                        _id: '$answershist._id',
                        user: { $first: req.user?._id.toString() },
                        users: { $first: '$answershist.user' },
                        sessionDate: { $first: '$answershist.sessionDate' },
                        owner: { $first: '$flashcardcollection.owner' },
                        collectionName: { $first: '$flashcardcollection.name' },
                        isPublic: { $first: '$flashcardcollection.isPublic' },
                        answersTotal: { $sum: 1 },
                        correctAnswers: { $sum: { $cond: [{ $eq: ['$isCorrect', true] }, 1, 0] } },
                        wrongAnswers: { $sum: { $cond: [{ $eq: ['$isCorrect', false] }, 1, 0] } },
                        details: {
                            $push: {
                                date: '$date',
                                isCorrect: '$isCorrect'
                            }
                        }
                    }
                },
                {
                    $match: {
                        users: user
                    }
                }
            ],
            (err, results) => {
                res.send(JSON.stringify(results, null, 2));
            }
        );
    } catch (error) {
        res.status(500).send('Something went wrong').end();
    }
});

export default router;
