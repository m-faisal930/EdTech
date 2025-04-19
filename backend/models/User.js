// 📁 server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,
  institute: String, // Only for tutors
  role: { type: String, enum: ['student', 'tutor'], required: true }
});

module.exports = mongoose.model('User', userSchema);