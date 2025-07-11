const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
