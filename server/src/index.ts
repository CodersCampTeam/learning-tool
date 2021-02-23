import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { appRouter } from './routes/index';
import { productionSetup } from './production';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
let connection_uri = process.env.MONGODB_DEV_URI || 'mongodb://localhost/learning-tool-database';

if (env === 'production') {
    productionSetup(app);
    connection_uri = process.env.MONGODB_PROD_URI || 'mongodb://localhost/learning-tool-database';
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
        console.log('connected to db');
    }
);

app.use(express.json());
app.use(appRouter);

app.listen(port, function () {
    console.log('App listening on port: ' + port);
});
