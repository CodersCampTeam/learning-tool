import express, { NextFunction, Request, Response } from 'express';
import { User, validateUserProfile } from '../models/User';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req['user'];
        user.password = '';
        res.status(200).send(JSON.stringify(user));
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req['user'];
        const { error } = validateUserProfile(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        if (req.body.username) {
            const usernamedb = await User.findOne({
                $and: [{ username: req.body.username }, { _id: { $ne: user._id } }]
            });
            if (usernamedb) return res.status(400).send('Nazwa użytkownika/czki już istnieje');
            user.username = req.body.username;
        }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        if (req.body.email) {
            const emaildb = await User.findOne({
                $and: [{ email: req.body.email }, { _id: { $ne: user._id } }]
            });
            if (emaildb) return res.status(400).send('Email już istnieje');
            user.email = req.body.email;
        }
        await user.save();
        res.send(200);
    } catch (error) {
        next(error);
    }
});

export default router;
