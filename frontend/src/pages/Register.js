// 📁 client/src/pages/Register.jsx
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    institute: '',
    role: 'student',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    // await axios.post('http://localhost:5000/api/auth/register', form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input
        className="border p-2 mb-2 w-full"
        name="name"
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        className="border p-2 mb-2 w-full"
        name="email"
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        className="border p-2 mb-2 w-full"
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
      />

      <select
        className="border p-2 mb-2 w-full"
        name="gender"
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <select
        className="border p-2 mb-2 w-full"
        name="role"
        onChange={handleChange}
      >
        <option value="student">Student</option>
        <option value="tutor">Tutor</option>
      </select>

      {form.role === 'tutor' && (
        <input
          className="border p-2 mb-2 w-full"
          name="institute"
          onChange={handleChange}
          placeholder="Institute Name"
        />
      )}

      <button className="bg-green-500 text-white px-4 py-2">Register</button>
    </form>
  );
};

export default Register;
