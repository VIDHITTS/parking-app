import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute, { RoleRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Drivers from './pages/Drivers';
import Cars from './pages/Cars';
import History from './pages/History';
import AdminDashboard from './pages/AdminDashboard';
import './styles/theme.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/drivers"
            element={
              <RoleRoute allowedRoles={['MANAGER']}>
                <Drivers />
              </RoleRoute>
            }
          />

          <Route
            path="/cars"
            element={
              <RoleRoute allowedRoles={['MANAGER']}>
                <Cars />
              </RoleRoute>
            }
          />

          <Route
            path="/history"
            element={
              <RoleRoute allowedRoles={['MANAGER']}>
                <History />
              </RoleRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </RoleRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
