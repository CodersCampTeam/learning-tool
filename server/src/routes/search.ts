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
                res.send('No tags matching query');
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
                        { $project: { _id: 0, flashcards: 1 } }
                    ],
                    (err, results) => {
                        if (results.length < 1) {
                            res.send('No flashcards matching query');
                        } else {
                            res.send(results);
                        }
                    }
                );
            }
        } else {
            FlashcardCollection.aggregate(
                [
                    { $match: { isPublic: true, flashcards: { $exists: true, $not: { $size: 0 } } } },
                    { $project: { _id: 0, flashcards: 1 } }
                ],
                (err, results) => {
                    if (results.length < 1) {
                        res.send('No flashcards matching query');
                    } else {
                        res.send(results);
                    }
                }
            );
        }
    } catch (error) {
        next(error);
    }
});

export default router;
