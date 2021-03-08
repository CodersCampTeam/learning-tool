import express, { Request, Response } from 'express';
import register from './register';
import login from './login';
import google from './google';
import { User, IUser } from '../models/User';
import passport from 'passport';
// TODO: to remove
import { SessionSettings } from '../models/SessionSettings';
import flashcard from './flashcard';
import answer from './Answer';
import flashcardCollection from './flashcardCollection';
import { defaultHandler } from '../middleware/errorHandlers';

const router = express.Router();

router.use('/api/register', register);

router.use('/api/login', login);

router.use('/api/google', google);

router.use('/api/flashcard', flashcard);

router.use('/api/answer', answer);

router.use('/api/flashcard-collection', flashcardCollection);

router.get('/api', async (req: Request, res: Response) => {
    // TODO: to remove
    const obj = await User.find().populate('sessionSettings');
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
        sessionSettings: sessionSettings._id.toString()
    });

    user = await user.save();
    res.send(user);
});

router.get('/', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
    res.status(200).send(`response`);
    console.log(req.user?._id);
});

router.use(defaultHandler);

export { router as appRouter };
