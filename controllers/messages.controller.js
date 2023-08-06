const Message = require("../models/message");
const { isAuthenticated, isOwner } = require("../middleware/authMiddleware");

const createMessage = async (req, res) => {
  try {
    const { text, roomId } = req.body;
    const ownerId = req.user.userId;
    const newMessage = await Message.create({
      text,
      owner: ownerId,
      room: roomId,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error creating message" });
  }
};
const getAllMessagesForRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const messages = await Message.find({ room: roomId });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error getting messages" });
  }
};

const updateMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (message.owner !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not the owner" });
    }

    const { text } = req.body;
    message.text = text;
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: "Error updating message" });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (message.owner !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not the owner" });
    }

    await message.remove();

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message" });
  }
};

module.exports = {
  createMessage,
  getAllMessagesForRoom,
  updateMessage,
  deleteMessage,
};
