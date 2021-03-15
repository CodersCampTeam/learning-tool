import express, { Request, Response } from 'express';
import register from './register';
import login from './login';
import google from './google';
import { User, IUser } from '../models/User';
import { SessionSettings } from '../models/SessionSettings';
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

const isAuthenticated = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.use('/api/register', register);

router.use('/api/login', login);

router.use('/api/google', google);

router.use('/api/flashcard', isAuthenticated, flashcard);

router.use('/api/statistics', isAuthenticated, statistics);

router.use('/api/answer', isAuthenticated, answer);

router.use('/api/answer-history', isAuthenticated, answerHistory);

router.use('/api/settings', isAuthenticated, settings);


router.use('/api/flashcard-collection', isAuthenticated, flashcardCollection);

router.use('/api/search', isAuthenticated, search);

router.get('/api', async (req: Request, res: Response) => {
    // TODO: to remove
    const obj = await User.find();
    res.send(obj);
});

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        export interface User extends IUser {}
    }
}

router.post('/api', async (req: Request, res: Response) => {
    // Todo: to remove
    let sessionSettings = new SessionSettings({
        sessionHarmonogram: req.body.sessionHarmonogram
    });
    sessionSettings = await sessionSettings.save();

    let user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        isActive: req.body.isActive,
        isBlocked: req.body.isBlocked,
        avatarImg: req.body.avatarImg,
        sessionSettings: Date.now.toString()
    });

    user = await user.save();
    res.send(user);
});

router.get('/', isAuthenticated, (req: Request, res: Response) => {
    res.status(200).send(`response`);
    console.log(req.user?._id);
});

router.use(defaultHandler);
runNotificationService();

export { router as appRouter };
