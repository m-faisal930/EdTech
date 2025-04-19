import React, { useState } from 'react';
import axios from 'axios';

const AddCourseModal = ({ onClose, onAddCourse }) => {
  const [courseData, setCourseData] = useState({
    course_name: '',
    course_description: '',
    course_start_date: '',
    course_end_date: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const accessToken = localStorage.getItem('access');

      if (!accessToken) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      const response = await axios.post('http://localhost:8000/api/course/course_registration/', courseData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      onAddCourse({
        ...response.data,
        id: response.data.id,
        title: response.data.course_name,
        students: 0,
        averageProgress: 0,
        averageScore: 0,
        materials: [],
        quizzes: [],
        studentPerformance: []
      });

      onClose();
    } catch (err) {
      console.error('Error adding course:', err);
      if (err.message === 'Authentication token not found. Please log in again.') {
        setError(err.message);
      } else if (err.response?.status === 401) {
        setError('Your session has expired. Please log in again.');
      } else {
        setError(err.response?.data?.message || 'Failed to create course. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative mx-auto p-6 border w-full max-w-md shadow-2xl rounded-xl bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#003060]">Create New Course</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Course Title */}
          <div className="mb-4">
            <label htmlFor="course_name" className="block text-sm font-medium text-gray-700">Course Title</label>
            <input
              type="text"
              id="course_name"
              name="course_name"
              value={courseData.course_name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3b1580] focus:border-[#3b1580]"
              required
            />
          </div>

          {/* Course Description */}
          <div className="mb-4">
            <label htmlFor="course_description" className="block text-sm font-medium text-gray-700">Course Description</label>
            <textarea
              id="course_description"
              name="course_description"
              rows="3"
              value={courseData.course_description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3b1580] focus:border-[#3b1580]"
            ></textarea>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="course_start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                id="course_start_date"
                name="course_start_date"
                value={courseData.course_start_date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3b1580] focus:border-[#3b1580]"
              />
            </div>
            <div>
              <label htmlFor="course_end_date" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                id="course_end_date"
                name="course_end_date"
                value={courseData.course_end_date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3b1580] focus:border-[#3b1580]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b1580]"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3b1580] hover:bg-[#2f116c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b1580]"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
