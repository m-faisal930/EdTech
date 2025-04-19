import React, { useState } from 'react';
import MaterialsList from './MaterialsList';
import QuizList from './QuizList';
import StudentPerformance from './StudentPerformance';
import UploadMaterialModal from './UploadMaterialModal';
import GenerateQuizModal from './GenerateQuizModal';
import QuizGeneratedModal from './QuizGeneratedModal';

const CourseDetails = ({ course, onBack, onAddMaterial, onGenerateQuiz }) => {
  const [activeTab, setActiveTab] = useState('materials');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const [showGenerateQuizModal, setShowGenerateQuizModal] = useState(false);
  const [showQuizGeneratedModal, setShowQuizGeneratedModal] = useState(false);
  const [generatedQuizData, setGeneratedQuizData] = useState(null); // holds generated quiz content

  const handleGenerateQuiz = (materialId) => {
    setSelectedMaterial(materialId);
    setShowGenerateQuizModal(true);
  };

  const handleGenerateQuizFinal = (quizTitle) => {
    // Simulate backend/LLM response for now
    const dummyQuiz = {
        title: "Basics of Programming",
        questions: [
          {
            question: "What is the correct syntax for declaring a variable in JavaScript?",
            options: ["var x = 10;", "let = 10", "x := 10", "int x = 10"],
            answer: "var x = 10;"
          },
          {
            question: "Which of the following is a looping structure in JavaScript?",
            options: ["for", "foreach", "repeat", "loop"],
            answer: "for"
          },
          {
            question: "What does `typeof null` return?",
            options: ["object", "null", "undefined", "number"],
            answer: "object"
          },
          {
            question: "How do you write a comment in JavaScript?",
            options: ["// comment", "/* comment */", "# comment", "-- comment"],
            answer: "// comment"
          },
          {
            question: "Which built-in method returns the length of a string?",
            options: [".count()", ".size()", ".length", ".getLength()"],
            answer: ".length"
          }
        ]
      };
  
    setGeneratedQuizData(dummyQuiz);
    setShowGenerateQuizModal(false);
    setShowQuizGeneratedModal(true);
  };  

  const tabStyle = (tabName) =>
    `px-4 py-2 text-sm font-semibold border-b-2 transition ${
      activeTab === tabName
        ? 'border-[#3b1580] text-[#3b1580]'
        : 'text-gray-500 hover:text-[#3b1580]'
    }`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#003060]">{course.title}</h2>
          <button
            onClick={onBack}
            className="text-[#3b1580] flex items-center text-sm font-medium hover:underline"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side */}
          <div className="w-full md:w-2/3">
            {/* Tabs */}
            <div className="mb-4 border-b border-gray-200">
              <nav className="flex -mb-px">
                <button onClick={() => setActiveTab('materials')} className={tabStyle('materials')}>
                  Course Materials
                </button>
                <button onClick={() => setActiveTab('quizzes')} className={tabStyle('quizzes')}>
                  Quizzes & Assessments
                </button>
                <button onClick={() => setActiveTab('students')} className={tabStyle('students')}>
                  Student Performance
                </button>
              </nav>
            </div>

            {/* Upload Material CTA */}
            {activeTab === 'materials' && (
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#003060]">Course Materials</h3>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="py-1.5 px-4 text-sm rounded-md font-medium text-white bg-[#3b1580] hover:bg-[#2f116c] transition"
                >
                  Upload Material
                </button>
              </div>
            )}

            {/* Tab Content */}
            {activeTab === 'materials' && (
              <MaterialsList
                materials={course.materials}
                onGenerateQuiz={handleGenerateQuiz}
              />
            )}
            {activeTab === 'quizzes' && <QuizList quizzes={course.quizzes} />}
            {activeTab === 'students' && (
              <StudentPerformance students={course.studentPerformance} />
            )}
          </div>

          {/* Right Side: Stats */}
          <div className="w-full md:w-1/3">
            <div className="p-6 mb-6 bg-[#f8f3ff] rounded-lg border border-[#e4d6f5]">
              <h3 className="text-lg font-bold text-black mb-3">📊 Course Statistics</h3>

              {/* Progress */}
              <div className="mb-5">
                <div className="flex justify-between mb-1 text-sm font-medium text-black">
                  <span>Average Progress</span>
                  <span>{course.averageProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#3b1580] h-2 rounded-full"
                    style={{ width: `${course.averageProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 text-black text-sm">
                <div>
                  <span className="block font-medium">👥 Students</span>
                  <span className="text-lg font-bold">{course.students}</span>
                </div>
                <div>
                  <span className="block font-medium">📚 Materials</span>
                  <span className="text-lg font-bold">{course.materials.length}</span>
                </div>
                <div>
                  <span className="block font-medium">📝 Quizzes</span>
                  <span className="text-lg font-bold">{course.quizzes.length}</span>
                </div>
                <div>
                  <span className="block font-medium">📈 Avg. Score</span>
                  <span className="text-lg font-bold">{course.averageScore}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showUploadModal && (
        <UploadMaterialModal
          onClose={() => setShowUploadModal(false)}
          onUpload={(material) => {
            onAddMaterial(material);
            setShowUploadModal(false);
          }}
        />
      )}

        {showGenerateQuizModal && (
        <GenerateQuizModal
            onClose={() => setShowGenerateQuizModal(false)}
            onGenerate={handleGenerateQuizFinal}
            materialTitle={course.materials.find((m) => m.id === selectedMaterial)?.title}
        />
        )}

        {showQuizGeneratedModal && (
        <QuizGeneratedModal
            quizData={generatedQuizData}
            onClose={() => setShowQuizGeneratedModal(false)}
        />
        )}

    </div>
  );
};

export default CourseDetails;
