import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoutes';

// Public Components
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import RegisterComponent from './components/RegisterComponents';
import LoginComponent from './components/LoginComponents';
import NotAuthorized from './components/NotAuthorized';
import NotFound from './components/NotFound';

// Navbar
import NavBar from './components/NavBar';

// Admin / Shop Components
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <NavBar />

          <div className="content-wrapper mt-4">
            <Routes>

              {/* 🌍 Public Routes */}
              <Route path="/" element={<HomeComponent />} />
              <Route path="/about" element={<AboutComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/register" element={<RegisterComponent />} />
              <Route path="/not-authorized" element={<NotAuthorized />} />
              <Route path="/not-found" element={<NotFound />} />

              {/* 🔐 Protected Admin Route */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'shop']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 🚫 Fallback */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
