//! Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const log = console.log;
const PORT = process.env.PORT;

//! Imports
const { db } = require('./db');
const users = require('./controllers/users.controller');
const roomController = require('./controllers/messageRoom.controller')


//! Middleware
app.use(express.json());

//! Routes
app.use('/users', users);
app.use('/room', roomController);
//app.use('/message', messageController);

//! Connetion
const server = async() => {
    db();

    app.listen(PORT, () => log(`Chat server is running on port : ${PORT}`));

}

server();




