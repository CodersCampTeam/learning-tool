import express, { Request, Response } from 'express';
import { SessionSettings, validateSessionSettings } from '../models/SessionSettings';
import { User } from '../models/User';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        const settings = new SessionSettings({
            sessionHarmonogram: req.body.sessionHarmonogram
        });
        const { error } = validateSessionSettings(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        } else await settings.save();

        user.sessionSettings = settings.id;

        res.send(user);
    } catch (error) {
        res.status(500).send('Something went wrong').end();
    }
});

export default router;
