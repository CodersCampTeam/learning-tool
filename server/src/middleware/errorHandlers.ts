import { NextFunction, Request, Response } from 'express';

const defaultHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err['kind'] === 'ObjectId') {
        res.status(400).send('Invalid ID.').end();
    } else if (err['kind'] === 'noPermission') {
        res.status(403).send('You do not have permission to access this resource').end();
    } else {
        res.status(500).send('Ooops! Something went wrong.').end();
    }
    next(err);
};

const consoleLogHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    // eslint-disable-next-line no-console
    console.log(err);
    next(err);
};

export { defaultHandler, consoleLogHandler };
