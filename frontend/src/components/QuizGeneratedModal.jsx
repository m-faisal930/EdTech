import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const QuizGeneratedModal = ({ onClose, quizData }) => {
  const contentRef = useRef();

  const handleCopy = () => {
    const text = contentRef.current.innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const handleExportPDF = () => {
    const element = contentRef.current;
    const opt = {
      margin: 0.5,
      filename: `${quizData.title.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative max-w-2xl w-full bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#003060]">📝 {quizData.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div ref={contentRef} className="text-gray-800 space-y-5 text-[15px]">
          {quizData.questions.map((q, idx) => (
            <div key={idx}>
              <p className="font-semibold">{idx + 1}. {q.question}</p>
              <ul className="list-disc pl-6">
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              {q.answer && <p className="text-sm text-green-600 mt-1">✔ Answer: {q.answer}</p>}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-[#003060] text-white rounded-md text-sm hover:bg-[#002244]"
          >
            Copy
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-yellow-400 text-black rounded-md text-sm hover:bg-yellow-500"
          >
            Export to PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizGeneratedModal;
