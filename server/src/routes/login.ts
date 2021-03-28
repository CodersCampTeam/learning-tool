import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send(200);
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({
                    message: info ? info.message : 'Logowanie nie powiodło się',
                    user: user
                });
            }
            req.login(user, { session: false }, (error) => {
                if (error) res.send(err);
                const token = user.generateAuthToken();
                return res.cookie('jwt', token, { expires: new Date(Date.now() + 9999999) }).json({ token, user });
            });
        })(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default router;
