import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api', (req: Request, res: Response) => {
    res.send(`response`);
});

router.get('/', (req: Request, res: Response) => {
    res.status(200).send(`response`);
});

export { router as appRouter };
