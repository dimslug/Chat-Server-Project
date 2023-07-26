const express = require('express');
const router = express.Router();
const Message = require('../models/message');

// Route to create a new message associated with a room
router.post('/messages', async (req, res) => {
  try {
    const { date, text, owner, room } = req.body;
    const message = await Message.create({ date, text, owner, room });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error creating message' });
  }
});

