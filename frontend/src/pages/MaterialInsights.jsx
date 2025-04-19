import React, { useState } from 'react';

const MaterialInsights = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAskAI = () => {
    setAnswer(`In the video, the instructor explains that time complexity is a critical concept in analyzing algorithms, particularly in competitive programming and software optimization. 
It measures how the runtime of an algorithm increases relative to the size of the input. 
For example, a linear algorithm runs in O(n) time, while a nested loop often results in O(n^2) complexity. Understanding this allows developers to write more efficient code.`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#003060]">AI Video Tutor</h1>
        <p className="text-sm text-gray-500 mt-1">Deep dive into your uploaded material</p>
      </div>

      {/* Upload Details */}
      <div className="bg-white shadow-md border border-gray-400 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-[#3b1580] mb-2">📄 Uploaded Material</h2>
        <p className="text-gray-700">💾 File Name: <span className="font-medium">DSA_TimeComplexity.mp4</span></p>
        <p className="text-gray-700">🕒 Duration: <span className="font-medium">18 mins</span></p>
        <p className="text-gray-700">📅 Uploaded: <span className="font-medium">April 19, 2025</span></p>
      </div>

      {/* Transcript */}
      <div className="bg-white shadow-md border border-gray-400 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-[#3b1580] mb-2">📝 Transcript</h2>
        <p className="text-gray-800 text-[15px] leading-relaxed">
          Welcome to this session on time and space complexity in Data Structures and Algorithms.
          We'll begin with understanding Big-O notation, which is used to describe the performance
          or complexity of an algorithm. For example, if a loop runs n times, we say the time complexity is O(n).
          Nested loops often imply a complexity of O(n²). This distinction is important when working with large datasets.
          <br /><br />
          We then discuss different complexities: constant time O(1), logarithmic time O(log n), linear time O(n),
          and quadratic time O(n²), with real-world examples. Binary search operates in O(log n) time,
          while bubble sort is typically O(n²). Space complexity is also discussed, showing how memory usage grows
          with input size. Recursive functions often add to the stack space, and data structures like arrays
          and hash maps have fixed or dynamic memory costs. Understanding both aspects is crucial
          to write optimal and scalable code.
        </p>
      </div>

      {/* Summary */}
      <div className="bg-white shadow-md border border-gray-400 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-[#3b1580] mb-2">📚 Summary</h2>
        <p className="text-gray-800 text-[15px] leading-relaxed">
          This session provides a beginner-friendly explanation of time and space complexity in algorithms.
          It introduces Big-O notation with practical examples and contrasts different complexities like O(1), O(n), and O(n²).
          Real-world examples include binary search and bubble sort. The session also highlights space complexity
          and how memory usage scales with recursion and data structures. A must-watch for anyone learning DSA.
        </p>
      </div>

      {/* Ask AI */}
      <div className="bg-white shadow-md border border-gray-400 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-[#3b1580] mb-4">💬 Ask a Question About the Video</h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. What is time complexity of binary search?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#3b1580] focus:border-[#3b1580]"
          />
          <button
            onClick={handleAskAI}
            className="px-6 py-2 bg-[#3b1580] text-white rounded-md hover:bg-[#2f116c] transition"
          >
            Ask
          </button>
        </div>

        {answer && (
          <div className="mt-4 bg-gray-100 p-4 rounded-md text-gray-800 border border-gray-300">
            <p className="text-sm font-medium text-[#003060] mb-1">Answer:</p>
            <p className="text-[15px]">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialInsights;
