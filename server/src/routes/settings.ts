import express, { Request, Response } from 'express';
import { SessionSettings, validateSessionSettings } from '../models/SessionSettings';
const router = express.Router();

router.post('/', async (req: Request, res: Response, next) => {
    try {
        const user = req['user'];

        const settings = new SessionSettings({
            sessionHarmonogram: new Date(req.body.sessionHarmonogram),
            notificationsType: req.body.notificationsType
        });
        const { error } = validateSessionSettings(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        user.sessionSettings = settings;
        await user.save();

        res.status(200).send(settings);
    } catch (error) {
        next(error);
    }
});

export default router;
