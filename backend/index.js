const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./UserRoutes.js');
require('./passport-config');

mongoose.connect(process.env.DB_URI);

const corsOptions = {
    origin: process.env.BASE_URL,
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://arvindgpta786:parinahi1@cluster3.9zrvtt9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3"
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: true, // set to true if using HTTPS
        sameSite: 'lax'
    }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use(bodyParser.urlencoded({ extended: true }));
io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        socket.broadcast.emit("callEnded", socket.id);
    });

    socket.on('calluser', ({ userToCall, signalData, from, name }) => {
        console.log(`Calling user: ${userToCall} from: ${from} with signal: ${signalData}`);
        io.to(userToCall).emit("calluser", { signal: signalData, from, name });
    });

    socket.on('answercall', ({ signal, to }) => {
        console.log(`Answering call to: ${to} with signal: ${signal}`);
        io.to(to).emit("callaccepted", signal);
    });

    socket.on('code', (data) => {
        // Broadcast code changes to all connected clients except the sender
        socket.broadcast.emit('code', data);
    });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
