import { useAuth } from '../contexts/AuthContext';
import UserScanner from '../components/UserScanner';
import SuperAdminDashboard from './SuperAdminDashboard';
import ManagerDashboard from './ManagerDashboard';

function Home() {
  const { user } = useAuth();

  // Role Routing
  if (user?.role === 'USER') return <UserScanner />;
  if (user?.role === 'SUPER_ADMIN') return <SuperAdminDashboard />;

  // Default to Manager View
  // Note: Drivers currently use Manager Dashboard for basic view or we can add DriverConsole later
  // Implementation Plan designated DriverConsole separately, for now we fall back to Manager View 
  // or check if role is DRIVER and show something else.
  // For now, sticking to Manager Dashboard as fallback.
  return <ManagerDashboard />;
}

export default Home;
