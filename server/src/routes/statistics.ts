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
        FlashcardCollection.aggregate(
            [
                { $sort: { max: -1 } },
                {
                    $lookup: {
                        from: 'flashcards',
                        localField: '_id',
                        foreignField: 'collectionId',
                        as: 'flashcard'
                    }
                },
                {
                    $lookup: {
                        from: 'answerhistories',
                        let: { order_item: '$owner', order_qty: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$flashcardCollection', '$$order_qty'] },
                                            { $eq: ['$user', '$$order_item'] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'stockdata'
                    }
                },
                {
                    $lookup: {
                        from: 'answers',
                        localField: 'stockdata.answers',
                        foreignField: '_id',
                        as: 'answers'
                    }
                },
                {
                    $addFields: {
                        countAnswers: {
                            $reduce: {
                                input: '$stockdata.answers',
                                initialValue: [],
                                in: { $setUnion: ['$$value', '$$this'] }
                            }
                        },
                        answers: { $arrayElemAt: ['$answers', 0] }
                    }
                },
                { $unwind: { path: '$flashcards', preserveNullAndEmptyArrays: true } },
                { $unwind: { path: '$countAnswers', preserveNullAndEmptyArrays: true } },
                { $unwind: { path: '$stockdata', preserveNullAndEmptyArrays: true } },
                { $unwind: { path: '$answers', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        CollectionName: { $first: '$name' },
                        user: { $first: '$owner' },
                        myflashcards: { $addToSet: '$flashcards' },
                        answers: {
                            $addToSet: {
                                id: '$countAnswers',
                                date: '$stockdata.sessionDate',
                                isCorrect: '$answers.isCorrect'
                            }
                        }
                    }
                },
                {
                    $match: {
                        user: user
                    }
                },
                {
                    $project: {
                        CollectionName: 1,
                        user: 1,
                        myflashcards: { $sum: { $size: '$myflashcards' } },
                        answers: 1,
                        finalMaxDate: {
                            $slice: ['$max', 1]
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

router.get('/collections', async (req: Request, res: Response, next) => {
    const user = new Mongo.ObjectID(req['user']._id);
    try {
        FlashcardCollection.aggregate(
            [
                { $sort: { max: -1 } },
                {
                    $lookup: {
                        from: 'flashcards',
                        localField: '_id',
                        foreignField: 'collectionId',
                        as: 'flashcard'
                    }
                },
                {
                    $lookup: {
                        from: 'answerhistories',
                        let: { order_item: '$owner', order_qty: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$flashcardCollection', '$$order_qty'] },
                                            { $eq: ['$user', '$$order_item'] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'stockdata'
                    }
                },
                {
                    $lookup: {
                        from: 'answers',
                        localField: 'stockdata.answers',
                        foreignField: '_id',
                        as: 'answers'
                    }
                },
                {
                    $addFields: {
                        countAnswers: {
                            $reduce: {
                                input: '$stockdata.answers',
                                initialValue: [],
                                in: { $setUnion: ['$$value', '$$this'] }
                            }
                        },
                        answers: { $arrayElemAt: ['$answers', 0] }
                    }
                },
                { $unwind: { path: '$flashcards', preserveNullAndEmptyArrays: true } },
                { $unwind: { path: '$countAnswers', preserveNullAndEmptyArrays: true } },
                { $unwind: { path: '$stockdata', preserveNullAndEmptyArrays: true } },
                { $unwind: { path: '$answers', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: {
                            users: '$_id'
                            // source: '$stockdata.sessionDate'
                        },

                        CollectionName: { $first: '$name' },
                        user: { $first: '$owner' },
                        myflashcards: { $addToSet: '$flashcards' },
                        max: {
                            $addToSet: {
                                id: '$countAnswers',
                                date: '$stockdata.sessionDate',
                                isCorrect: '$answers.isCorrect'
                            }
                        }
                    }
                },
                {
                    $match: {
                        user: user
                    }
                },
                {
                    $project: {
                        CollectionName: 1,
                        user: 1,
                        myflashcards: { $sum: { $size: '$myflashcards' } },

                        finalMaxDate: {
                            $slice: ['$max.date', -1]
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
