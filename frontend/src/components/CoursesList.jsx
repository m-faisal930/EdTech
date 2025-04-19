import React from 'react';

const CoursesList = ({ courses, onCourseSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {courses.map(course => (
        <div
          key={course.id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 max-w-sm min-h-[22rem] mx-auto flex flex-col justify-between"
        >
          <div className="p-6 flex flex-col h-full justify-between">
            {/* Title & Students */}
            <div>
              <h3 className="text-2xl font-bold text-[#003060] mb-2">{course.title}</h3>
              <p className="text-base text-gray-600 mb-6">👥 {course.students} students enrolled</p>

              {/* Materials & Quizzes side by side */}
              <div className="flex justify-between items-center mb-4 text-base text-gray-700 font-medium">
                <div className="flex flex-col items-center">
                  <span className="mb-1">📚 Materials</span>
                  <span className="text-xl font-bold text-[#003060]">{course.materials.length}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="mb-1">📝 Quizzes</span>
                  <span className="text-xl font-bold text-[#003060]">{course.quizzes.length}</span>
                </div>
              </div>

              {/* Avg. Score full width */}
              <div className="text-center mt-4">
                <span className="block text-base text-gray-700 font-medium mb-1">📈 Average Score</span>
                <span className="text-2xl font-extrabold text-[#003060]">{course.averageScore}%</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onCourseSelect(course)}
              className="w-full mt-6 py-3 px-4 bg-[#3b1580] text-white text-base font-semibold rounded-lg shadow-sm hover:bg-[#2f116c] transition"
            >
              Manage Course
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesList;
