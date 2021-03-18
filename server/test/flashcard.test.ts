import mongoose from 'mongoose';
import { Flashcard } from '../src/models/Flashcard';
import { FlashcardCollection } from '../src/models/FlashcardCollection';
import { User } from '../src/models/User';
import request from 'supertest';
import { server } from '../src/server';
import bcrypt from 'bcryptjs';

describe('flashcard routes', () => {
    let flashcard;
    let id;
    let newPrompt;
    let newAnswer;
    let flashcardCollection;
    let collectionId;
    let tokenOwner;
    let tokenNotOwner;
    let testUserNotOwner;
    let testUserOwner;
    let usedToken;
    let isQuizQuestion = false;

    beforeAll(async () => {
        const salt = await bcrypt.genSalt(10);
        await User.deleteOne({});
        testUserOwner = new User({
            username: 'testUserName',
            email: 'test@gmail.com',
            password: await bcrypt.hash('Password1!', salt)
        });
        await testUserOwner.save();
        testUserNotOwner = new User({
            username: 'testUserName2',
            email: 'test2@gmail.com',
            password: await bcrypt.hash('Password2!', salt)
        });
        await testUserNotOwner.save();
    });
    beforeEach(async () => {
        flashcardCollection = new FlashcardCollection({
            name: '123',
            owner: testUserOwner,
            isPublic: false,
            isQuizQuestion: false
        });
        await flashcardCollection.save();
        collectionId = flashcardCollection._id;
        newPrompt = 'prompt1';
        newAnswer = ['answer1'];
        flashcard = new Flashcard({
            prompt: newPrompt,
            answers: newAnswer,
            collectionId: collectionId,
            isQuizQuestion: false
        });
        await flashcard.save();
        id = flashcard._id;
        tokenOwner = testUserOwner.generateAuthToken();
        tokenNotOwner = testUserNotOwner.generateAuthToken();
        usedToken = tokenOwner;
    });

    afterEach(async () => {
        await Flashcard.deleteOne({});
        await FlashcardCollection.deleteOne({});
        await server.close();
    });

    afterAll(async () => {
        await User.deleteOne({});
        await mongoose.disconnect();
    });

    describe('GET /:id', () => {
        const exec = async () => {
            return await request(server)
                .get('/api/flashcard/' + id)
                .set('Cookie', `jwt=${usedToken};`)
                .send({});
        };
        it('should return 401 if the user is not logged in', async () => {
            usedToken = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });
        it('should return 403 if the user is not the owner and the collection is private', async () => {
            usedToken = tokenNotOwner;
            const res = await exec();
            expect(res.status).toBe(403);
        });
        it('should return a flashcard if the user is not the owner and the collection is public', async () => {
            usedToken = tokenNotOwner;
            flashcardCollection.isPublic = true;
            await flashcardCollection.save();
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('prompt', flashcard.prompt);
            expect(res.body).toHaveProperty('answer', flashcard.answer);
            expect(res.body).toHaveProperty('collectionId');
        });
        it('should return a flashcard if the valid ID is passed', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('prompt', flashcard.prompt);
            expect(res.body).toHaveProperty('collectionId');
            expect(res.body).toHaveProperty('answers', flashcard.answers.toObject());
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
            return await request(server)
                .delete('/api/flashcard/' + id)
                .set('Cookie', `jwt=${usedToken};`)
                .send({});
        };
        it('should return 403 if the user is not the owner and the collection is private', async () => {
            usedToken = tokenNotOwner;
            const res = await exec();
            expect(res.status).toBe(403);
        });
        it('should return 403 if the user is not the owner and the collection is public', async () => {
            usedToken = tokenNotOwner;
            flashcardCollection.isPublic = true;
            await flashcardCollection.save();
            const res = await exec();
            expect(res.status).toBe(403);
        });
        it('should return 401 if the user is not logged in', async () => {
            usedToken = '';
            const res = await exec();
            expect(res.status).toBe(401);
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
                .set('Cookie', `jwt=${usedToken};`)
                .send({ prompt: newPrompt, answers: newAnswer, isQuizQuestion });
        };

        it('should return 403 if the user is not the owner and the collection is private', async () => {
            usedToken = tokenNotOwner;
            const res = await exec();
            expect(res.status).toBe(403);
        });
        it('should return 403 if the user is not the owner and the collection is public', async () => {
            usedToken = tokenNotOwner;
            flashcardCollection.isPublic = true;
            await flashcardCollection.save();
            const res = await exec();
            expect(res.status).toBe(403);
        });
        it('should return 401 if the user is not logged in', async () => {
            usedToken = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

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
            expect(res.text).toBe('"answers" must be an array');
        });
        it('should return 400 if an answer is less than 1 character', async () => {
            newAnswer = [''];
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"answers[0]" is not allowed to be empty');
        });
        it('should return 400 if an answer is more than 4096 character', async () => {
            newAnswer = [new Array(5000).join('a')];
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"answers[0]" length must be less than or equal to 4096 characters long');
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
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('collectionId');
            expect(res.body).toHaveProperty('prompt', newPrompt);
            expect(res.body).toHaveProperty('answers', newAnswer);
        });

        it('flashcard of quiz question type shall be added', async () => {
            isQuizQuestion = true;
            newAnswer = ['ans1', 'ans2', 'ans3', 'ans4'];
            const res = await exec();
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('isQuizQuestion', isQuizQuestion);
            expect(res.body).toHaveProperty('prompt', newPrompt);
            expect(res.body).toHaveProperty('answers', newAnswer);
        });

        it('flashcard shall have only one answer', async () => {
            isQuizQuestion = false;
            newAnswer = ['ans1', 'ans2', 'ans3', 'ans4'];
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"answers" must contain less than or equal to 1 items');
        });
    });

    describe('PATCH /:id', () => {
        let newExtraInfo: string;
        let newAnswer: string[];
        const exec = async () => {
            return await request(server)
                .patch('/api/flashcard/' + id)
                .set('Cookie', `jwt=${usedToken};`)
                .send({ prompt: newPrompt, answers: newAnswer, extraInfo: newExtraInfo });
        };
        beforeEach(async () => {
            newExtraInfo = 'more';
            newAnswer = ['answer2'];
        });
        it('should return 401 if the user is not logged in', async () => {
            usedToken = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });
        it('should return 403 if the user is not the owner and the collection is private', async () => {
            usedToken = tokenNotOwner;
            const res = await exec();
            expect(res.status).toBe(403);
        });
        it('should return 403 if the user is not the owner and the collection is public', async () => {
            usedToken = tokenNotOwner;
            flashcardCollection.isPublic = true;
            await flashcardCollection.save();
            const res = await exec();
            expect(res.status).toBe(403);
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
            newAnswer = [null];
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"answers[0]" must be a string');
        });
        it('should return 400 if an answer is less than 1 character', async () => {
            newAnswer = [''];
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"answers[0]" is not allowed to be empty');
        });
        it('should return 400 if an answer is more than 4096 character', async () => {
            newAnswer = [new Array(5000).join('a')];
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"answers[0]" length must be less than or equal to 4096 characters long');
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
            expect(res.body).toHaveProperty('answers', newAnswer);
            expect(res.body).toHaveProperty('extraInfo', newExtraInfo);
        });
    });
});
