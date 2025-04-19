const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  },
  { timestamps: true }
);

enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true }); // prevent duplicates

module.exports = mongoose.model('Enrollment', enrollmentSchema);
