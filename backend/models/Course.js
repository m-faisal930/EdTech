// 📁 server/models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnail: String,
    videoUrl: String,
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
