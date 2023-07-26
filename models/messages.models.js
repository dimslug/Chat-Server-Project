/* 
| date | text | owner | room |
| --- | --- | --- | ---|
| required | required | id | id | */
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming a User model for owners
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
