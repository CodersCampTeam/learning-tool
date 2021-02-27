import express, { Request, Response } from 'express';
import { FlashcardCollection, validateFlashcardCollection } from '../models/FlashcardCollection';
const router = express.Router();

router.post('/', (req: Request, res: Response)=>{
    try {
        const flashcardCollection = new FlashcardCollection({
            owner: req.body.owner,
            name: req.body.name,
            isPublic: req.body.isPublic,
            tags: req.body.tags,
            flashcards: req.body.flashcards
        })
        const {error} = validateFlashcardCollection(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        flashcardCollection.save();
        res.send(flashcardCollection);

    } catch (error) {
        res.status(500).send('Something went wrong').end();
    }
});

router.delete('/:id', async (req: Request, res: Response)=>{
    
    try {
        const flashcardCollection = await FlashcardCollection.findByIdAndRemove(req.params.id);
        if (!flashcardCollection) return res.status(404).send('The flashcardCollection does not exist');
        res.status(204).send();

    } catch (error) {
        res.status(500).send('Something went wrong').end();
    }
})



export default router;