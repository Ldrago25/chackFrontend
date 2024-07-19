const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/db');

const { API_VERSION, API_NAME } = process.env;

const app = express();

const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer, {
    cors: {
        origin: "http://localhost:4200"
    }
});


const userRoutes = require('./router/user');
const messagesRoutes = require('./router/message');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('src/uploads'));
app.use(cors());
app.use((req, res, next) => {
    req.io = io;
    req.con = dbConnect;
    next();
});

const basePath = `/${API_NAME}/${API_VERSION}`;
app.use(basePath, userRoutes);
app.use(basePath, messagesRoutes);
io.on('connect', (socket) => {
    socket.on('typing', (data) => {
        io.emit('listening', data);
    });
    socket.on('disconect', () => {
        console.log('usuario no conectado');
    });
});

module.exports = httpServer;