import express, { Request, Response } from 'express';
import { SessionSettings, validateSessionSettings } from '../models/SessionSettings';
const router = express.Router();

router.post('/', async (req: Request, res: Response, next) => {
    try {
        const user = req['user'];

        const settings = new SessionSettings({
            isActive: req.body.isActive,
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

router.put('/harmonogram', async (req: Request, res: Response, next) => {
    try {
        const user = req['user'];

        user.sessionSettings.sessionHarmonogram = req.body.harmonogram;

        await user.save();

        res.status(200).send(user.sessionSettings);
    } catch (error) {
        next(error);
    }
});

router.put('/activate', async (req: Request, res: Response, next) => {
    try {
        const user = req['user'];

        if (user.sessionSettings) {
            user.sessionSettings.isActive = req.body.isActive;
            user.sessionSettings.hour = req.body.hour;
        } else {
            const settings = new SessionSettings();
            settings.isActive = req.body.isActive;
            settings.hour = req.body.hour;
            user.sessionSettings = settings;
        }
        await user.save();

        res.status(200).send(user.sessionSettings);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req: Request, res: Response, next) => {
    try {
        const user = req['user'];

        res.status(200).send(user.sessionSettings);
    } catch (error) {
        next(error);
    }
});

export default router;
