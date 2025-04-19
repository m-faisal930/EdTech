import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const ChatProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  console.log('user', user);
  if (!user) return <Navigate to="/login" />;

  console.log('role', user.role);
  // Allow both student and tutor
  if (user.role !== 'student' && user.role !== 'tutor') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ChatProtectedRoute;
