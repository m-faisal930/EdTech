// 📁 server/routes/courseRoutes.js
const express = require('express');
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  enrollInCourse,
  getCourseUsers,
} = require('../controllers/courseController');
const { protect, isTutor } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, isTutor, createCourse);
router.get('/:id/users', protect, getCourseUsers);
router.put('/:id', protect, isTutor, updateCourse);
router.delete('/:id', protect, isTutor, deleteCourse);
router.get('/', protect, getAllCourses);
router.post('/enroll', protect, enrollInCourse); // student endpoint

module.exports = router;
