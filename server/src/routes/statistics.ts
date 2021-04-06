import express, { Request, Response } from 'express';
import Mongo from 'mongodb';
import { FlashcardCollection } from '../models/FlashcardCollection';

const router = express.Router();

router.get('/header', async (req: Request, res: Response, next) => {
    const user = new Mongo.ObjectID(req['user']._id);
    try {
        FlashcardCollection.aggregate(
            [
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
                        localField: 'owner',
                        foreignField: 'user',
                        as: 'answers'
                    }
                },
                {
                    $addFields: {
                        countAnswers: {
                            $reduce: {
                                input: '$answers.answers',
                                initialValue: [],
                                in: { $setUnion: ['$$value', '$$this'] }
                            }
                        }
                    }
                },
                { $unwind: { path: '$countAnswers', preserveNullAndEmptyArrays: true } },
                { $unwind: { path: '$flashcards', preserveNullAndEmptyArrays: true } },
                { $unwind: { path: '$answers', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$owner',
                        mycollections: { $addToSet: '$name' },
                        user: { $first: '$owner' },
                        myflashcards: { $addToSet: '$flashcards' },
                        session: { $addToSet: '$answers._id' },
                        answerSession: { $addToSet: '$countAnswers' }
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
                        myflashcards: { $sum: { $size: '$myflashcards' } },
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
                        answers: 1
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
