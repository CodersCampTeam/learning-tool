import express, { NextFunction, Request, Response } from 'express';
import { User, validateUser } from '../models/User';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('Użytkownik/czka już istnieje');

        const userName = await User.findOne({ username: req.body.username });
        if (userName) return res.status(400).send('Nazwa użytkownika/czki już istnieje');
        const salt = await bcrypt.genSalt(10);

        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt)
        });

        await user.save();
        res.send(200);
    } catch (error) {
        next(error);
    }
});

export default router;
