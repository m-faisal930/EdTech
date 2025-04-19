import React, { useState } from 'react';

const GenerateQuizModal = ({ onClose, onGenerate, materialTitle }) => {
  const [title, setTitle] = useState(`Quiz on ${materialTitle || 'Selected Material'}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(title);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative mx-auto p-6 w-full max-w-md bg-white border border-[#e2d0f5] shadow-2xl rounded-xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#3b1580]">Generate Quiz</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Material Info */}
        <div className="mb-5">
          <p className="text-sm text-gray-700">
            Creating a quiz from: <span className="font-semibold">{materialTitle}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-[#3b1580] focus:border-[#3b1580] shadow-sm"
              required
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 py-2 px-4 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 text-sm rounded-md bg-[#3b1580] text-white hover:bg-[#2f116c] transition shadow-md"
            >
              Generate Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateQuizModal;
