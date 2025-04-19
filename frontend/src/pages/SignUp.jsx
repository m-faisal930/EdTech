import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted", form);
    navigate(form.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard");
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-3xl flex flex-col md:flex-row">
        {/* Branding section */}
        <div className="bg-[#3b1580] text-white p-8 md:w-2/5 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-2">Cognit<span className="text-yellow-300">ia</span></h1>
          <p className="text-indigo-200 text-center text-lg">Join the smarter learning revolution.</p>
        </div>

        {/* Form section */}
        <div className="p-8 md:w-3/5">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create your account</h2>
            <p className="text-gray-600 mb-8">Sign up as a student or teacher to get started</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <div className={`relative rounded-md shadow-sm transition duration-200 ${activeField === "email" ? "ring-2 ring-indigo-500" : ""}`}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none sm:text-sm"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField("")}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className={`relative rounded-md shadow-sm transition duration-200 ${activeField === "password" ? "ring-2 ring-indigo-500" : ""}`}>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none sm:text-sm"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    onFocus={() => setActiveField("password")}
                    onBlur={() => setActiveField("")}
                  />
                </div>
              </div>

              {/* Role Dropdown - No label */}
              <div>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none sm:text-sm"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3b1580] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                >
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/role-select" className="font-medium text-indigo-600 hover:text-indigo-500">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
