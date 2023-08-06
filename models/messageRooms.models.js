const mongoose = require('mongoose');

const MessageRoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    messages: {
        type: Array
    },
    ownerID: {
        type: String
    }
});

module.exports = mongoose.model('Room', MessageRoomSchema);
