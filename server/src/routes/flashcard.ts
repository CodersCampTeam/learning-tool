import express, { Request, Response } from 'express';
import { Flashcard, validateFlashcard } from '../models/Flashcard';
import { FlashcardCollection } from '../models/FlashcardCollection';
const router = express.Router();

router.put('/:id', async (req: Request, res: Response) => {
    const {error} = validateFlashcard(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const collection = await FlashcardCollection.findById(req.body.params.id);
    if(!collection) return res.status(404).send('There is no flashcard collection with a given ID');

    let flashcard = new Flashcard({
        FlashcardCollection: {//tu pytanie, czy nie potrzebujemy referencji w modelu flashcard
        _id: FlashcardCollection._id,
        name: FlashcardCollection.name
        },
        prompt: req.body.prompt,
        imageUrl: req.body.imageUrl,
        answer: req.body.answer,
        extraInfo: req.body.extraInfo
    }) 

    flashcard = await flashcard.save();
    res.send(flashcard);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const flashcard = await Flashcard.findByIdAndRemove(req.params.id);
    if(!flashcard) return res.status(404).send('The flashcard with the given ID was not found.');
    res.send(flashcard);
});

router.patch('/:id', async (req: Request, res: Response) => {
    const flashcard = await Flashcard.findById(req.params.id);
    if(!flashcard) return res.status(404).send('The flashcard with the given ID was not found.');

    const { error } = await validateFlashcard(req.body); //to dobrze zadziała przy patch? nie udało mi się wygooglować odpowiedzi
    if(error) return res.status(400).send(error.details[0].message);

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    Flashcard.update({_id: req.params.id}, {$set: updateOps})
        .exec()
        .then(result => { 
            res.status(200).json(result)})
        .catch(err => {
            res.status(500).json({ error: err})
        });
});


export default router;
