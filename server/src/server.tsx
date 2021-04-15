import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { appRouter } from './routes/index';
import { productionSetup } from './production';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { runNotificationService } from './services/NotificationService';

dotenv.config();

import './middleware/passport';
import swaggerDocument from './swaggerWrap';
const app = express();
const port = process.env.PORT || 3001;
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
if (env === 'development') {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
    });
}

app.use(express.json());
app.use(cookieParser());
app.get('/api/rooms', (req, res) => {
    res.json(newRooms);
});
app.use(appRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = app.listen(port, function () {
    if (env === 'development') console.log('App listening on port: ' + port);
});

interface Rooms {
    room: string;
    messages: any[];
}

const rooms: Rooms[] = [
    {
        room: 'nauka',
        messages: []
    },
    {
        room: 'zabawa',
        messages: []
    },
    {
        room: 'relax',
        messages: []
    },
    {
        room: 'złote myśli',
        messages: []
    }
];

const newRooms = ['nauka', 'zabawa', 'relax', 'złote myśli'];

const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected`);

    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    const correctRoom = rooms.find((r) => r.room === roomId || undefined);

    if (correctRoom) {
        correctRoom.messages.forEach((m) => io.in(roomId).emit('newChatMessage', m));
    }

    socket.on('newChatMessage', (data) => {
        correctRoom.messages.push({ body: data.body });
        io.in(roomId).emit('newChatMessage', data);
    });

    socket.on('newroomcreated', (data) => {
        io.emit('newroomcreated', data.room);
        rooms.push({ room: data.room, messages: [] });
        newRooms.push(data.room);
    });

    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnected`);
        socket.leave(roomId);
    });
});

runNotificationService();

export { server };
