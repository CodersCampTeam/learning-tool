import express, { Request, Response } from 'express';
import Mongo from 'mongodb';
import { AnswerHistory } from '../models/AnswerHistory';
import { FlashcardCollection } from '../models/FlashcardCollection';

const router = express.Router();

router.get('/header', async (req: Request, res: Response, next) => {
    const user = new Mongo.ObjectID(req['user']._id);
    try {
        FlashcardCollection.aggregate(
            [
                { $unwind: { path: '$flashcards', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$owner',
                        mycollections: { $addToSet: '$name' },
                        user: { $first: '$owner' },
                        myflashcards: { $addToSet: '$flashcards' }
                    }
                },
                {
                    $match: {
                        user: user
                    }
                },
                {
                    $project: {
                        mycollections: { $sum: { $size: '$mycollections' } },
                        user: 1,
                        myflashcards: { $sum: { $size: '$myflashcards' } }
                    }
                }
            ],
            (err, results) => {
                res.send(JSON.stringify(results, null, 2));
            }
        );
    } catch (error) {
        next(error);
    }
});

router.get('/headerHistory', async (req: Request, res: Response, next) => {
    const user = new Mongo.ObjectID(req['user']._id);
    try {
        AnswerHistory.aggregate(
            [
                { $unwind: { path: '$answers', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$user',
                        user: { $first: '$user' },
                        session: { $addToSet: '$_id' },
                        answerSession: { $addToSet: '$answers' }
                    }
                },
                {
                    $match: {
                        user: user
                    }
                },
                {
                    $project: {
                        answers: { $sum: { $size: '$answerSession' } },
                        session: { $sum: { $size: '$session' } }
                    }
                }
            ],
            (err, results) => {
                res.send(JSON.stringify(results, null, 2));
            }
        );
    } catch (error) {
        next(error);
    }
});

router.get('/collection', async (req: Request, res: Response, next) => {
    const user = new Mongo.ObjectID(req['user']._id);
    try {
        AnswerHistory.aggregate(
            [
                { $sort: { max: -1 } },
                {
                    $lookup: {
                        from: 'flashcardcollections',
                        localField: 'flashcardCollection',
                        foreignField: '_id',
                        as: 'flashcardCollection'
                    }
                },
                {
                    $lookup: {
                        from: 'answers',
                        localField: 'answers',
                        foreignField: '_id',
                        as: 'answers'
                    }
                },
                {
                    $sort: { maxDate: -1 }
                },
                {
                    $sort: { answerss: -1 }
                },
                {
                    $addFields: {
                        countAnswers: {
                            $reduce: {
                                input: '$flashcardCollection.flashcards',
                                initialValue: [],
                                in: { $setUnion: ['$$value', '$$this'] }
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: { coll: { $first: '$flashcardCollection._id' }, user: '$user' },
                        CollectionName: { $first: '$flashcardCollection.name' },
                        user: { $first: '$user' },
                        owner: { $first: '$flashcardCollection.owner' },
                        lastSession: { $max: '$sessionDate' },
                        flashcards: { $addToSet: '$countAnswers' },
                        maxDate: {
                            $push: {
                                date: '$sessionDate',
                                id: '$answers._id',
                                isCorrect: '$answers.isCorrect',
                                total: { $size: '$answers.isCorrect' },
                                correctAnswers: {
                                    $size: {
                                        $filter: {
                                            input: '$answers',
                                            as: 'e',
                                            cond: { $eq: ['$$e.isCorrect', true] }
                                        }
                                    }
                                },
                                wrongAnswers: {
                                    $size: {
                                        $filter: {
                                            input: '$answers',
                                            as: 'e',
                                            cond: { $eq: ['$$e.isCorrect', false] }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    $match: {
                        user: user
                    }
                },
                { $unwind: { path: '$flashcards', preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        CollectionName: 1,
                        owner: 1,
                        answers: 1,
                        flashcards: { $sum: { $size: '$flashcards' } },
                        maxDate: {
                            $slice: ['$maxDate', -1]
                        }
                    }
                }
            ],
            (err, results) => {
                res.send(JSON.stringify(results, null, 2));
            }
        );
    } catch (error) {
        next(error);
    }
});

export default router;
