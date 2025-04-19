import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/studentDashboard';
import TutorDashboard from './pages/tutorDashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import ChatRoom from './pages/ChatRoom';
import ChatProtectedRoute from './utils/ChatProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutor"
            element={
              <ProtectedRoute role="tutor">
                <TutorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:courseId"
            element={
              <ChatProtectedRoute>

                <ChatRoom />
              </ChatProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<div className="p-4">404 - Page Not Found</div>}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
