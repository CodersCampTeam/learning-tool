import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { appRouter } from './routes/index';
import { productionSetup } from './production';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { runNotificationService } from './services/NotificationService';
import fs from 'fs';
import path from 'path';
import App from '../../client/src/App';

import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

dotenv.config();
import './middleware/passport';
import swaggerDocument from './swaggerWrap';

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
let connection_uri = process.env.MONGODB_DEV_URI || 'mongodb://localhost/playground';

if (env === 'production') {
    productionSetup(app);
    connection_uri = process.env.MONGODB_PROD_URI || 'mongodb://localhost/learning-tool-database';
}

if (env === 'test') {
    connection_uri = process.env.MONGODB_TEST_URI || 'mongodb://localhost/learning-tool-database-test';
}

mongoose.connect(
    connection_uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    () => {
        if (env === 'development') console.log('connected to db');
    }
);

app.use(express.json());
app.use(cookieParser());
app.use(appRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// for any other requests, send `index.html` as a response
app.use('/home', (req, res) => {
    // read `index.html` file
    let indexHTML = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), {
        encoding: 'utf8'
    });

    // get HTML string from the `App` component
    const appHTML = ReactDOMServer.renderToString(
        <StaticRouter location={'/home'}>
            <App />
        </StaticRouter>
    );

    // populate `#app` element with `appHTML`
    indexHTML = indexHTML.replace('<div id="app"></div>', `<div id="app">${appHTML}</div>`);

    // set header and status
    res.contentType('text/html');
    res.status(200);

    return res.send(indexHTML);
});

const server = app.listen(port, function () {
    if (env === 'development') console.log('App listening on port: ' + port);
});

runNotificationService();

export { server };
