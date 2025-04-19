import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

// Pages
import { Home } from './pages/Home';
import SignUp from './pages/SignUp';
import RoleSelect from './pages/RoleSelect';
import TeacherLogin from './pages/TeacherLogin';
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';

// Utilities
import ProtectedRoute from './utils/ProtectedRoute';
import ChatRoom from './pages/ChatRoom';
import ChatProtectedRoute from './utils/ChatProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home/>}/>

          {/* Common Register Page */}
          <Route path="/register" element={<SignUp />} />

          {/* Login Routes */}
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />

          <Route path="/role-select" element={<RoleSelect/>}/>

          {/* Common Register Page */}
          <Route path="/register" element={<SignUp />} />

          {/* Dashboards with role protection */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute role="tutor">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 fallback */}
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
