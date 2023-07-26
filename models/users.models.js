
/*
 | username | email | password | 
| --- | --- | --- |
| required / unique | required / unique | required |  */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        required: true,
        unique: true
    },
    email: {
        required: true,
        unique: true
    },
    password: {
        required: true
    }
});

module.exports = mongoose.model('User',)