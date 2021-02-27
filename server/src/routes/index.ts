import express, { Request, Response } from 'express';

// TODO: to remove
import { SessionSettings } from '../models/SessionSettings';
import { User } from '../models/User';
import flashcard from './flashcard';
import flashcardCollection from './flashcardCollection'

const router = express.Router();
router.use('/api/flashcard', flashcard);

router.use('/api/flashcardCollection', flashcardCollection);


router.get('/api', async (req: Request, res: Response) => {
    // TODO: to remove
    const obj = await User.find().populate('sessionSettings');
    res.send(obj);
});

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

router.get('/', (req: Request, res: Response) => {
    res.status(200).send(`response`);
});

export { router as appRouter };
