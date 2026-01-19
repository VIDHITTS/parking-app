import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import BottomNav from './components/BottomNav';
import RoleSwitcher from './components/RoleSwitcher';
import Home from './pages/Home';
import Drivers from './pages/Drivers';
import Cars from './pages/Cars';
import History from './pages/History';
import Settings from './pages/Settings';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import DriverDashboard from './pages/DriverDashboard';
import './styles/theme.css';

// Helper to get the home path for a role
export function getHomePathForRole(role) {
  switch (role) {
    case 'MANAGER': return '/manager';
    case 'DRIVER': return '/home';
    case 'SUPER_ADMIN': return '/super-admin';
    case 'USER':
    default: return '/home';
  }
}

// Component that handles automatic redirect on role change
function RoleRedirector() {
  const { currentRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // When role changes, redirect to the appropriate home page
    const homePath = getHomePathForRole(currentRole);

    // Only redirect if we're not already on a valid path for this role
    // This prevents redirect loops
    const validPaths = getValidPathsForRole(currentRole);
    if (!validPaths.includes(location.pathname)) {
      navigate(homePath, { replace: true });
    }
  }, [currentRole, navigate, location.pathname]);

  return null;
}

// Get valid paths for a role
function getValidPathsForRole(role) {
  const common = ['/history', '/settings'];
  switch (role) {
    case 'MANAGER': return ['/manager', '/drivers', ...common];
    case 'DRIVER': return ['/home', ...common];
    case 'SUPER_ADMIN': return ['/super-admin', '/admin', '/admin/sites', ...common];
    case 'USER':
    default: return ['/home', '/cars', '/ticket', ...common];
  }
}

function AppContent() {
  return (
    <>
      <RoleRedirector />
      <div className="app-wrapper">
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<SuperAdminDashboard />} />
            <Route path="/admin/sites" element={<SuperAdminDashboard />} />
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/driver" element={<DriverDashboard />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
      <RoleSwitcher />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
