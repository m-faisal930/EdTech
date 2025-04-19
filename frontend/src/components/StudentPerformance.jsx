import React, { useState } from 'react';

const StudentPerformance = ({ students }) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else {
      return sortDirection === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    }
  });

  return (
    <div>
      <h3 className="text-xl font-bold text-[#003060] mb-4">Student Performance</h3>

      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-[#f3e8ff] text-[#3b1580] uppercase text-xs font-semibold tracking-wide">
              {[
                ['name', 'Student'],
                ['progress', 'Progress'],
                ['avgScore', 'Score'],
                ['quizzesTaken', 'Quizzes'],
              ].map(([key, label]) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left cursor-pointer"
                  onClick={() => handleSort(key)}
                >
                  {label}
                  {sortBy === key && (
                    <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
              ))}
              <th className="px-6 py-3 text-left">Last Active</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-gray-700">
            {sortedStudents.map((student, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-[#003060]">{student.name}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          student.progress > 75
                            ? 'bg-green-500'
                            : student.progress > 50
                            ? 'bg-blue-500'
                            : student.progress > 25
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{student.progress}%</span>
                  </div>
                </td>

                <td className="px-6 py-4 font-bold text-sm">
                  <span
                    className={`${
                      student.avgScore > 90
                        ? 'text-green-600'
                        : student.avgScore > 70
                        ? 'text-blue-600'
                        : student.avgScore > 50
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {student.avgScore}%
                  </span>
                </td>

                <td className="px-6 py-4">{student.quizzesTaken}</td>

                <td className="px-6 py-4 text-sm text-gray-500">{student.lastActive}</td>

                <td className="px-6 py-4 flex space-x-2">
                  <button className="text-[#3b1580] hover:underline text-sm font-medium">
                    View
                  </button>
                  <button className="text-[#003060] hover:underline text-sm font-medium">
                    Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <div className="text-center py-6 text-gray-500">No students enrolled yet.</div>
      )}
    </div>
  );
};

export default StudentPerformance;
