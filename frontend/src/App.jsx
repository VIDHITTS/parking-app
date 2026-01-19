import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import BottomNav from './components/BottomNav';
import RoleSwitcher from './components/RoleSwitcher';
import Home from './pages/Home';
import Drivers from './pages/Drivers';
import Cars from './pages/Cars';
import History from './pages/History';
import Settings from './pages/Settings';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import './styles/theme.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Main App Container (The Phone) */}
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
              <Route path="/super-admin" element={<SuperAdminDashboard />} />
              <Route path="/manager" element={<ManagerDashboard />} />
            </Routes>
          </div>
          {/* Bottom Nav is part of the phone UI */}
          <BottomNav />
        </div>

        {/* Role Switcher is a debug tool OUTSIDE the app/phone */}
        <RoleSwitcher />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
