process.env['NODE_ENV'] = 'test';
import mongoose from 'mongoose';
import { FlashcardCollection } from '../src/models/FlashcardCollection';
import { User } from '../src/models/User';
import request from 'supertest';
import { server } from '../src/server';
import bcrypt from 'bcryptjs';

describe('flashcard collection routes', () => {
    let id;
    let flashcardCollection;
    let tokenOwner;
    let tokenNotOwner;
    let testUserNotOwner;
    let testUserOwner;
    let usedToken;
    let name;
    let owner;

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
            name: 'collection',
            owner: testUserOwner._id,
            isPublic: false,
            flashcards: [mongoose.Types.ObjectId()]
        });
        await flashcardCollection.save();
        id = flashcardCollection._id;
        tokenOwner = testUserOwner.generateAuthToken();
        tokenNotOwner = testUserNotOwner.generateAuthToken();
        usedToken = tokenOwner;
    });

    afterEach(async () => {
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
                .get('/api/flashcard-collection/' + id)
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
        it('should return a flashcard collection if the user is not the owner and the collection is public', async () => {
            usedToken = tokenNotOwner;
            flashcardCollection.isPublic = true;
            await flashcardCollection.save();
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', flashcardCollection.name);
            expect(res.body).toHaveProperty('owner');
            expect(res.body).toHaveProperty('_id');
        });
        it('should return a flashcard collection if the valid ID is passed', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', flashcardCollection.name);
            expect(res.body).toHaveProperty('owner');
            expect(res.body).toHaveProperty('_id');
            expect(flashcardCollection['flashcards']).not.toBeNull();
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
                .delete('/api/flashcard-collection/' + id)
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

        it('should delete the chosen flashcard collection', async () => {
            const res = await exec();
            const flashcardCollection = await FlashcardCollection.findById(id);
            expect(flashcardCollection).toBeNull();
            expect(res.status).toBe(204);
        });
    });

    describe('POST /:id', () => {
        const exec = async () => {
            return await request(server).post('/api/flashcard-collection').set('Cookie', `jwt=${usedToken};`).send({
                name,
                owner
            });
        };

        it('should return 401 if the user is not logged in', async () => {
            usedToken = '';
            owner = testUserOwner._id;
            name = 'flashcards';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 400 if no name was provided', async () => {
            name = null;
            owner = testUserOwner._id;
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"name" must be a string');
        });
        it('should return 400 if a name is less than 1 character', async () => {
            name = '';
            owner = testUserOwner._id;
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"name" is not allowed to be empty');
        });
        it('should return 400 if a name is more than 255 character', async () => {
            name = new Array(300).join('a');
            owner = testUserOwner._id;
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"name" length must be less than or equal to 255 characters long');
        });
        it('should return 400 if no owner was provided', async () => {
            owner = null;
            name = 'flashcards';
            const res = await exec();
            expect(res.status).toBe(400);
            expect(res.text).toBe('"owner" must be a string');
        });
        it('should save the flashcard collection if it is valid', async () => {
            owner = testUserOwner._id;
            name = 'flashcards';
            await exec();
            const flashcardCollection = await FlashcardCollection.find({ name: 'flashcards' });
            expect(flashcardCollection).not.toBeNull();
            expect(flashcardCollection['flashcards']).not.toBeNull();
        });
        it('should return the flashcard collection if it is valid', async () => {
            owner = testUserOwner._id;
            name = 'flashcards';
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'flashcards');
            expect(res.body).toHaveProperty('owner');
            expect(res.body).toHaveProperty('_id');
        });
    });
});
