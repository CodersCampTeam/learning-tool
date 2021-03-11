import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { appRouter } from './routes/index';
import { productionSetup } from './production';
import cookieParser from 'cookie-parser';
import { runNotificationService } from './services/NotificationService';

dotenv.config();
import './middleware/passport';

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

const server = app.listen(port, function () {
    if (env === 'development') console.log('App listening on port: ' + port);
});

runNotificationService();

export { server };
