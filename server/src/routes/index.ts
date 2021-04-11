import express, { Request, Response, static as serveStatic } from 'express';
import register from './register';
import login from './login';
import google from './google';
import { IUser } from '../models/User';
import flashcard from './flashcard';
import answer from './Answer';
import answerHistory from './AnswerHistory';
import flashcardCollection from './flashcardCollection';
import statistics from './statistics';
import settings from './settings';
import { defaultHandler } from '../middleware/errorHandlers';
import passport from 'passport';
import { runNotificationService } from '../services/NotificationService';
import search from './search';
import session from '../routes/Session';
import me from './me';
import * as path from 'path';
import profile from './profile';
import subscribe from './subscribe';

const isAuthenticated = passport.authenticate('jwt', { session: false });

const router = express.Router();

const publicPath = path.join(__dirname, '../../../client/build');

router.use('/api/register', register);

router.use('/api/login', login);

router.use('/api/google', google);

router.use('/api/flashcard', isAuthenticated, flashcard);

router.use('/api/statistics', isAuthenticated, statistics);

router.use('/api/answer', isAuthenticated, answer);

router.use('/api/answer-history', isAuthenticated, answerHistory);

router.use('/api/settings', isAuthenticated, settings);

router.use('/api/flashcard-collection', isAuthenticated, flashcardCollection);

router.use('/api/session', isAuthenticated, session);

router.use('/api/search', isAuthenticated, search);

router.use('/api/profile', isAuthenticated, profile);

router.use('/api/me', isAuthenticated, me);

router.use('/api/subscribe', isAuthenticated, subscribe);

// for any other requests, send `index.html` as a response
router.use(serveStatic(publicPath));
router.use('*', (req, res) => {
    // send `index.html` file from ./client
    return res.sendFile(path.join(publicPath, './index.html'));
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        export interface User extends IUser {}
    }
}

router.get('/', isAuthenticated, (req: Request, res: Response) => {
    res.status(200).send(`Access granted`);
});

router.use(defaultHandler);
runNotificationService();

export { router as appRouter };
