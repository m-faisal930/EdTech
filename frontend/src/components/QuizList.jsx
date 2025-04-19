import React from 'react';

const QuizList = ({ quizzes }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-[#003060] mb-4">Quizzes</h3>

      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:shadow-md transition"
        >
          {/* Icon + Info */}
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-[#f3e8ff] text-[#3b1580] rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-md font-semibold text-[#003060]">{quiz.title}</h4>
              <p className="text-xs text-gray-500">From: {quiz.generatedFrom}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-6 text-sm">
            <div className="text-center">
              <p className="text-gray-500">Score</p>
              <p className="text-lg font-bold text-blue-600">{quiz.avgScore}%</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Submissions</p>
              <p className="text-lg font-bold text-green-600">{quiz.submissionRate}%</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-sm rounded-md bg-[#3b1580] text-white hover:bg-[#2f116c] transition">
              View
            </button>
            <button className="px-3 py-1.5 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
              Edit
            </button>
          </div>
        </div>
      ))}

      {quizzes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No quizzes yet. Generate one from a material.</p>
        </div>
      )}
    </div>
  );
};

export default QuizList;
