import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RoleSelect = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleRoleSelect = (role) => {
    if (role === "teacher") navigate("/teacher-login");
    else navigate("/student-login");
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Branding */}
        <div className="bg-[#3b1580] text-white p-8 md:w-2/5 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-2">
            Cognit<span className="text-yellow-300">ia</span>
          </h1>
          <p className="text-indigo-200 text-center text-lg">Smarter Learning. Smarter Teaching.</p>
        </div>

        {/* Right Choice Form */}
        <div className="p-8 md:w-3/5 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Who are you signing in as?</h2>
            <p className="text-gray-600">Choose your role to continue</p>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleRoleSelect("student")}
              className="w-full py-3 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 text-sm font-medium shadow-md"
            >
              I’m a Student
            </button>

            <button
              onClick={() => handleRoleSelect("teacher")}
              className="w-full py-3 rounded-md text-white bg-purple-700 hover:bg-purple-800 transition-all duration-200 text-sm font-medium shadow-md"
            >
              I’m a Teacher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
