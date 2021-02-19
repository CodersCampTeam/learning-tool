import express from "express";
import helmet from "helmet";
import compression from "compression";

export const production_setup = (app: express.Express): void => {
    app.use(helmet());
    app.use(compression());
};
