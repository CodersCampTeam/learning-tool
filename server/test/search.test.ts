import mongoose from 'mongoose';
import { FlashcardCollection } from '../src/models/FlashcardCollection';
import { User } from '../src/models/User';
import request from 'supertest';
import { server } from '../src/server';
import bcrypt from 'bcryptjs';
import { assignUniqueTagsAndReturn, Tag } from '../src/models/Tag';
import { Flashcard } from '../src/models/Flashcard';

describe('search route', () => {
    let idFlashcard;
    let idFlashcardSecond;
    let flashcardCollection;
    let flashcardCollectionSecond;
    let token;
    let testUser;
    let flashcard;
    let flashcardSecond;
    let newAnswer;
    let newPrompt;
    let searchTag;

    beforeAll(async () => {
        const salt = await bcrypt.genSalt(10);
        await User.deleteOne({});
        testUser = new User({
            username: 'testUserName',
            email: 'test@gmail.com',
            password: await bcrypt.hash('Password1!', salt)
        });
        await testUser.save();
    });
    beforeEach(async () => {
        flashcardCollection = new FlashcardCollection({
            name: '123',
            owner: testUser,
            isPublic: true,
            isQuizQuestion: false
        });
        await flashcardCollection.save();
        newPrompt = 'prompt1';
        newAnswer = ['answer1'];
        flashcard = new Flashcard({
            prompt: newPrompt,
            answers: newAnswer,
            collectionId: flashcardCollectionSecond,
            isQuizQuestion: false
        });
        await flashcard.save();
        idFlashcard = flashcard._id;
        flashcardCollection.flashcards = [idFlashcard];
        await flashcardCollection.save();
        flashcardCollectionSecond = new FlashcardCollection({
            name: '1234',
            owner: testUser,
            isPublic: true,
            isQuizQuestion: false,
            tags: await assignUniqueTagsAndReturn(['typescript', 'express'])
        });
        await flashcardCollectionSecond.save();
        flashcardSecond = new Flashcard({
            prompt: newPrompt,
            answers: newAnswer,
            collectionId: flashcardCollectionSecond.id,
            isQuizQuestion: false
        });
        await flashcardSecond.save();
        idFlashcardSecond = flashcardSecond._id;
        flashcardCollectionSecond.flashcards = [idFlashcardSecond];
        await flashcardCollectionSecond.save();
        searchTag = 'typescript';
    });

    afterEach(async () => {
        await Flashcard.deleteMany({});
        await FlashcardCollection.deleteMany({});
        await server.close();
    });

    afterAll(async () => {
        await User.deleteOne({});
        await Tag.deleteOne({});
        await mongoose.disconnect();
    });

    describe('GET', () => {
        const exec = async () => {
            return await request(server)
                .get('/api/search')
                .set('Cookie', `jwt=${token};`)
                .query({ search: searchTag })
                .send({});
        };
        it('should return 401 if the user is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });
        it('should return all flashcards if nothing is typed in', async () => {
            token = testUser.generateAuthToken();
            searchTag = '';
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        flashcards: [idFlashcard.toString()]
                    }),
                    expect.objectContaining({
                        flashcards: [idFlashcardSecond.toString()]
                    })
                ])
            );
        });
        it('should return flashcard with specific tag', async () => {
            token = testUser.generateAuthToken();
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        flashcards: [idFlashcardSecond.toString()]
                    })
                ])
            );
        });
        it('should return flashcard when part of the tag is typed in', async () => {
            token = testUser.generateAuthToken();
            searchTag = 'ex';
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        flashcards: [idFlashcardSecond.toString()]
                    })
                ])
            );
        });
        it('should return 404 if there is no tag matching query', async () => {
            token = testUser.generateAuthToken();
            searchTag = 'react';
            const res = await exec();
            expect(res.status).toBe(404);
            expect(res.text).toBe('No tags matching query');
        });
    });
});
