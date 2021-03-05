import { NextFunction, Request, Response } from 'express';
import { Flashcard } from '../models/Flashcard';
import { FlashcardCollection } from '../models/FlashcardCollection';

export default async function (req: Request, res: Response, next: NextFunction): Promise<any> {
    const collectionPath = req.path === '/api/flashcard-collection' || req.path === '/api/flashcard-collection/:id';
    const flashcardPath = req.path === '/api/flashcard' || req.path === '/api/flashcard/:id';
    let collectionId;
    if (collectionPath || (flashcardPath && req.method === 'PUT')) {
        collectionId = req.params.id;
    } else if (flashcardPath) {
        const flashcard = await Flashcard.findById(req.params.id);
        collectionId = await flashcard.collectionId;
    }
    const collection = await FlashcardCollection.findById(collectionId);
    if (req.user.id !== collection.owner && (!collection.isPublic || req.method !== 'GET')) {
        return res.status(403).send('Access denied.');
    }

    next();
}
