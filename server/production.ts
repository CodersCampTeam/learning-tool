import express from "express"
import helmet from 'helmet';
import compression from 'compression';

module.exports = function (app: express.Express) {
    app.use(helmet());
    app.use(compression());
}