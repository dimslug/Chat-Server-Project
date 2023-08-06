/*
 | title | description | messages | ownerId |
| --- | --- | --- | ---|
| required / unique | not required | array | id | */

const mongoose = require("mongoose");

const MessageRoomSchema = new mongoose.schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  messages: {
    type: Array,
  },
  ownerID: {
    type: id,
  },
});

module.exports = mongoose.model("Room", MessageRoomSchema);
