//! Imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const log = console.log;
const PORT = process.env.PORT;
const MONGO = process.env.MONGO || process.env.MONGODB;

//! Middleware
mongoose.connect(`${MONGO}chatserver`);
const db = mongoose.connection;
db.once("open", () => log(`Connected: ${MONGO}`));

app.use(express.json());

//! Routes

app.listen(PORT, () => log(`Chat server is running on port : ${PORT}`));
