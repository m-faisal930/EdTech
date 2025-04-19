// 📁 server/routes/messageRoutes.js
const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:courseId', async (req, res) => {
  try {
    const messages = await Message.find({ courseId: req.params.courseId })
      .populate('senderId', 'name')
      .populate('receiverId', 'name')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
