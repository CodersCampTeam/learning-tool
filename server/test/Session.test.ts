process.env['NODE_ENV'] = 'test';
import mongoose from 'mongoose';
import { Flashcard } from '../src/models/Flashcard';
import { FlashcardCollection } from '../src/models/FlashcardCollection';
import request from 'supertest';
import { server } from '../src/server';
import { AnswerHistory } from '../src/models/AnswerHistory';
import { User } from '../src/models/User';
import { Answer } from '../src/models/Answer';
import bcrypt from 'bcryptjs';

describe('session', () => {
    let token;
    let id;
    const expectedFlashcardsForRevision = [];
    const expectedNewFlashcards = [];

    beforeEach(async () => {
        const salt = await bcrypt.genSalt(10);
        await User.deleteOne({});
        const user = new User({
            username: 'testUserName',
            email: 'test@gmail.com',
            password: await bcrypt.hash('Password1!', salt)
        });
        await user.save();
        token = user.generateAuthToken();

        const flashcardCollection = new FlashcardCollection({ owner: user._id, name: 'collection1', isPublic: true });
        await flashcardCollection.save();
        id = flashcardCollection._id;

        const card1 = new Flashcard({
            prompt: 'question1',
            answer: 'answer1',
            isQuizQuestion: false,
            collectionId: id
        });
        await card1.save();

        const card2 = new Flashcard({
            prompt: 'question2',
            answer: 'answer2',
            isQuizQuestion: false,
            collectionId: id
        });
        await card2.save();

        const card3 = new Flashcard({
            prompt: 'question3',
            answer: 'answer3',
            isQuizQuestion: false,
            collectionId: id
        });
        await card3.save();

        const card4 = new Flashcard({
            prompt: 'question4',
            answer: 'answer4',
            isQuizQuestion: false,
            collectionId: id
        });
        await card4.save();

        const card5 = new Flashcard({
            prompt: 'question5',
            answer: 'answer5',
            isQuizQuestion: false,
            collectionId: id
        });
        await card5.save();

        const card6 = new Flashcard({
            prompt: 'question6',
            answer: 'answer6',
            isQuizQuestion: false,
            collectionId: id
        });
        await card6.save();

        const card7 = new Flashcard({
            prompt: 'question7',
            answer: 'answer7',
            isQuizQuestion: false,
            collectionId: id
        });
        await card7.save();

        expectedNewFlashcards.push(card5);
        expectedNewFlashcards.push(card6);
        expectedNewFlashcards.push(card7);

        const dateSession1 = new Date(2021, 0, 1);
        const dateSession2 = new Date(2021, 0, 3);
        const dateSession3 = new Date(2021, 0, 5);
        const dateSession4 = new Date(2021, 0, 7);

        const a1c1 = new Answer({ flashcardId: card1._id, date: dateSession1, isCorrect: false });
        await a1c1.save();
        const a2c1 = new Answer({ flashcardId: card1._id, date: dateSession2, isCorrect: true });
        await a2c1.save();
        const a3c1 = new Answer({ flashcardId: card1._id, date: dateSession3, isCorrect: true });
        await a3c1.save();
        const a4c1 = new Answer({ flashcardId: card1._id, date: dateSession4, isCorrect: true });
        await a4c1.save();

        const a1c2 = new Answer({ flashcardId: card2._id, date: dateSession1, isCorrect: false });
        await a1c2.save();
        const a2c2 = new Answer({ flashcardId: card2._id, date: new Date(2021, 0, 3), isCorrect: true });
        await a2c2.save();
        const a3c2 = new Answer({ flashcardId: card2._id, date: new Date(2021, 0, 5), isCorrect: false });
        await a3c2.save();
        const a4c2 = new Answer({ flashcardId: card2._id, date: new Date(2021, 0, 7), isCorrect: true });
        await a4c2.save();

        const a1c3 = new Answer({ flashcardId: card3._id, date: dateSession1, isCorrect: true });
        await a1c3.save();
        const a2c3 = new Answer({ flashcardId: card3._id, date: new Date(2021, 0, 3), isCorrect: true });
        await a2c3.save();
        const a3c3 = new Answer({ flashcardId: card3._id, date: new Date(2021, 0, 5), isCorrect: true });
        await a3c3.save();
        const a4c3 = new Answer({ flashcardId: card3._id, date: new Date(2021, 0, 7), isCorrect: true });
        await a4c3.save();

        const a1c4 = new Answer({ flashcardId: card4._id, date: dateSession1, isCorrect: true });
        await a1c4.save();
        const a2c4 = new Answer({ flashcardId: card4._id, date: new Date(2021, 0, 3), isCorrect: false });
        await a2c4.save();
        const a3c4 = new Answer({ flashcardId: card4._id, date: new Date(2021, 0, 5), isCorrect: false });
        await a3c4.save();
        const a4c4 = new Answer({ flashcardId: card4._id, date: new Date(2021, 0, 7), isCorrect: false });
        await a4c4.save();

        expectedFlashcardsForRevision.push(card2);
        expectedFlashcardsForRevision.push(card4);

        const answerHistory1 = new AnswerHistory({
            user: user._id,
            sessionDate: dateSession1,
            flashcardCollection: flashcardCollection._id,
            answers: [a1c1, a1c2, a1c3, a1c4]
        });
        await answerHistory1.save();

        const answerHistory2 = new AnswerHistory({
            user: user._id,
            sessionDate: dateSession2,
            flashcardCollection: flashcardCollection._id,
            answers: [a2c1, a2c2, a2c3, a2c4]
        });
        await answerHistory2.save();

        const answerHistory3 = new AnswerHistory({
            user: user._id,
            sessionDate: dateSession3,
            flashcardCollection: flashcardCollection._id,
            answers: [a3c1, a3c2, a3c3, a3c4]
        });
        await answerHistory3.save();

        const answerHistory4 = new AnswerHistory({
            user: user._id,
            sessionDate: dateSession4,
            flashcardCollection: flashcardCollection._id,
            answers: [a4c1, a4c2, a4c3, a4c4]
        });
        await answerHistory4.save();
    });

    afterEach(async () => {
        await Flashcard.deleteMany({});
        await FlashcardCollection.deleteMany({});
        await AnswerHistory.deleteMany({});
        await Answer.deleteMany({});
        await User.deleteMany({});
        expectedFlashcardsForRevision.length = 0;
        expectedNewFlashcards.length = 0;
        await server.close();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET /revision/:collectionId', () => {
        const exec = async () => {
            return await request(server)
                .get('/api/session/revision/' + id)
                .set('Cookie', `jwt=${token};`)
                .send({});
        };

        it('should return 404 if there is no flashcard collection with the given ID', async () => {
            id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should return 401 if the user is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return flashcard Ids that had any incorrect answers in last 3 sessions ', async () => {
            const res = await exec();
            console.log('body: ', res.body);
            expect(res.body.length).toBe(2);
            // expect(res.body).toEqual(expectedFlashcardsForRevision);
        });
    });

    describe('GET /learning/:collectionId', () => {
        const exec = async () => {
            return await request(server)
                .get('/api/session/learning/' + id)
                .set('Cookie', `jwt=${token};`)
                .send({});
        };
        it('should return flashcards that were not asked before', async () => {
            const res = await exec();
            expect(res.body.length).toBe(3);
        });
    });
});
