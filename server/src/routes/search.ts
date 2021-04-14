import express, { Request, Response } from 'express';
import { FlashcardCollection } from '../models/FlashcardCollection';
import { Tag } from '../models/Tag';
import escapeRegex from '../utils/regex';

const router = express.Router();

router.get('/', async function (req: Request, res: Response, next) {
    try {
        if (req.query.search) {
            const regex = new RegExp(escapeRegex(req.query.search), 'gi');
            const tag = await Tag.findOne({ tag: regex });
            if (tag === null) {
                res.status(404).send('No tags matching query');
            } else {
                FlashcardCollection.aggregate(
                    [
                        {
                            $match: {
                                isPublic: true,
                                tags: tag._id,
                                flashcards: { $exists: true, $not: { $size: 0 } }
                            }
                        },
                        {
                            $project: {
                                flashcards: 1,
                                name: 1,
                                owner: 1,
                                subscribedUsers: { $ifNull: ['$subscribedUsers', []] },
                                isSubscribed: {
                                    $in: [req['user']._id, '$subscribedUsers']
                                },
                                isOwned: { $eq: ['$owner', req['user']._id] }
                            }
                        },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'owner',
                                foreignField: '_id',
                                as: 'owner'
                            }
                        },
                        {
                            $set: {
                                owner: '$owner.username'
                            }
                        }
                    ],
                    (err, results) => {
                        if (results.length < 1) {
                            res.status(404).send('No flashcards matching query');
                        } else {
                            res.status(200).send(results);
                        }
                    }
                );
            }
        } else {
            FlashcardCollection.aggregate(
                [
                    { $match: { isPublic: true, flashcards: { $exists: true, $not: { $size: 0 } } } },
                    {
                        $project: {
                            flashcards: 1,
                            name: 1,
                            owner: 1,
                            subscribedUsers: { $ifNull: ['$subscribedUsers', []] },
                            isSubscribed: {
                                $in: [req['user']._id, '$subscribedUsers']
                            },
                            isOwned: { $eq: ['$owner', req['user']._id] }
                        }
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'owner',
                            foreignField: '_id',
                            as: 'owner'
                        }
                    },
                    {
                        $set: {
                            owner: '$owner.username'
                        }
                    }
                ],
                (err, results) => {
                    if (results.length < 1) {
                        res.status(404).send('No flashcards matching query');
                    } else {
                        res.status(200).send(results);
                    }
                }
            );
        }
    } catch (error) {
        next(error);
    }
});

export default router;
