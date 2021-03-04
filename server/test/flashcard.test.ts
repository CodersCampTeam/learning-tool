process.env['NODE_ENV'] = 'test';
import mongoose from 'mongoose';
import { Flashcard } from '../src/models/Flashcard';
import { FlashcardCollection } from '../src/models/FlashcardCollection';
import request from 'supertest';
import { server } from '../src/server';

describe('flashcard routes', () => {
    let flashcard;
    let id;
    let newPrompt;
    let newAnswer;
    let flashcardCollection;
    let collectionId;

    beforeEach(async () => {
        flashcardCollection = new FlashcardCollection({ name: '123' });
        await flashcardCollection.save();
        collectionId = flashcardCollection._id;
        newPrompt = 'prompt1';
        newAnswer = 'answer1';
        flashcard = new Flashcard({ prompt: newPrompt, answer: newAnswer, collectionId: collectionId });
        await flashcard.save();
        id = flashcard._id;
    });

    afterEach(async () => {
        await Flashcard.deleteOne({});
        await FlashcardCollection.deleteOne({});
        await server.close();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET /:id', () => {
        const exec = async () => {
            return await request(server).get('/api/flashcard/' + id);
        };
        it('should return a flashcard if the valid ID is passed', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('prompt', flashcard.prompt);
            expect(res.body).toHaveProperty('answer', flashcard.answer);
            expect(res.body).toHaveProperty('collectionId');
        });
        it('should return 400 if the invalid ID is passed', async () => {
            id = '123';
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('Invalid ID.');
        });
        it('should return 404 if there is no flashcard with the given ID', async () => {
            id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        });
    });
    describe('DELETE /:id', () => {
        const exec = async () => {
            return await request(server).delete('/api/flashcard/' + id);
        };
        it('should return 400 if the invalid ID is passed', async () => {
            id = '123';
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('Invalid ID.');
        });
        it('should return 404 if there is no flashcard with the given ID', async () => {
            id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should delete the chosen flashcard', async () => {
            const res = await exec();
            const flashcard = await Flashcard.findById(id);
            expect(flashcard).toBeNull();
            expect(res.status).toBe(204);
            expect(flashcardCollection['flashcards']).not.toHaveProperty('flashcard._id');
        });
    });

    describe('PUT /:id', () => {
        const exec = async () => {
            return await request(server)
                .put('/api/flashcard/' + collectionId)
                .send({ prompt: newPrompt, answer: newAnswer });
        };

        it('should return 400 if the invalid ID is passed', async () => {
            collectionId = '123';
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('Invalid ID.');
        });
        it('should return 404 if there is no flashcard collection with the given ID', async () => {
            collectionId = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        });
        it('should return 400 if no prompt was provided', async () => {
            newPrompt = null;
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"prompt" must be a string');
        });
        it('should return 400 if a prompt is less than 1 character', async () => {
            newPrompt = '';
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"prompt" is not allowed to be empty');
        });
        it('should return 400 if a prompt is more than 4096 character', async () => {
            newPrompt = new Array(5000).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"prompt" length must be less than or equal to 4096 characters long');
        });
        it('should return 400 if no answer was provided', async () => {
            newAnswer = null;
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"answer" must be a string');
        });
        it('should return 400 if an answer is less than 1 character', async () => {
            newAnswer = '';
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"answer" is not allowed to be empty');
        });
        it('should return 400 if an answer is more than 4096 character', async () => {
            newAnswer = new Array(5000).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"answer" length must be less than or equal to 4096 characters long');
        });
        it('should save the flashcard if it is valid', async () => {
            await exec();
            const flashcard = await Flashcard.findById(id);
            expect(flashcard).not.toBeNull();
        });
        it('should save the updated flashcard collection if the flashcard is valid', async () => {
            await exec();
            flashcardCollection = await FlashcardCollection.findById(collectionId);
            expect(flashcardCollection['flashcards']).not.toBeNull();
        });
        it('should return the flashcard if it is valid', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('collectionId');
            expect(res.body).toHaveProperty('prompt', newPrompt);
            expect(res.body).toHaveProperty('answer', newAnswer);
        });
    });

    describe('PATCH /:id', () => {
        let newExtraInfo: string;
        let newAnswer2: string;
        const exec = async () => {
            return await request(server)
                .patch('/api/flashcard/' + id)
                .send({ prompt: newPrompt, answer: newAnswer2, extraInfo: newExtraInfo });
        };
        beforeEach(async () => {
            newExtraInfo = 'more';
            newAnswer2 = 'answer2';
        });

        it('should return 400 if the invalid ID is passed', async () => {
            id = '123';
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('Invalid ID.');
        });
        it('should return 404 if there is no flashcard with the given ID', async () => {
            id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        });
        it('should return 400 if no answer was provided', async () => {
            newAnswer2 = null;
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"answer" must be a string');
        });
        it('should return 400 if an answer is less than 1 character', async () => {
            newAnswer2 = '';
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"answer" is not allowed to be empty');
        });
        it('should return 400 if an answer is more than 4096 character', async () => {
            newAnswer2 = new Array(5000).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"answer" length must be less than or equal to 4096 characters long');
        });
        it('should save the flashcard if it is valid', async () => {
            await exec();
            const flashcard = await Flashcard.findById(id);
            expect(flashcard).not.toBeNull();
        });
        it('should return the flashcard if it is valid', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('collectionId');
            expect(res.body).toHaveProperty('prompt', newPrompt);
            expect(res.body).toHaveProperty('answer', newAnswer2);
            expect(res.body).toHaveProperty('extraInfo', newExtraInfo);
        });
    });
});
