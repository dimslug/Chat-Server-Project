const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;