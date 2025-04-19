// 📁 client/src/pages/Login.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging', { email, password, role });
    await login({ email, password, role });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        className="border p-2 mb-2 w-full"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="border p-2 mb-2 w-full"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <select
        className="border p-2 mb-4 w-full"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="student">Student</option>
        <option value="tutor">Tutor</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
        Login
      </button>
    </form>
  );
};

export default Login;
