// 📁 server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const isTutor = (req, res, next) => {
  if (req.user.role !== 'tutor') {
    return res
      .status(403)
      .json({ message: 'Access restricted to tutors only' });
  }
  next();
};

module.exports = { protect, isTutor };
