// 📁 server/controllers/courseController.js
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

exports.enrollInCourse = async (req, res) => {
  const { courseId } = req.body;
  try {
    const existing = await Enrollment.findOne({
      studentId: req.user.id,
      courseId,
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: 'Already enrolled in this course' });
    }

    const enrollment = new Enrollment({ studentId: req.user.id, courseId });
    await enrollment.save();

    res.status(201).json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createCourse = async (req, res) => {
  const { title, description, thumbnail, videoUrl } = req.body;
  try {
    const course = new Course({
      title,
      description,
      thumbnail,
      videoUrl,
      tutorId: req.user.id,
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.tutorId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not allowed' });

    Object.assign(course, req.body);
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.tutorId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not allowed' });

    await course.deleteOne();
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('tutorId', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseUsers = async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log(courseId);

    const enrollments = await Enrollment.find({ courseId }).populate(
      'studentId',
      'name email'
    );
    const course = await Course.findById(courseId).populate(
      'tutorId',
      'name email'
    );

    const students = enrollments.map((e) => e.studentId);
    const tutor = course.tutorId;

    res.json({ students, tutor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

