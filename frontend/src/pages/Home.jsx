import { useAuth } from '../contexts/AuthContext';
import UserScanner from '../components/UserScanner';
import SuperAdminDashboard from './SuperAdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import DriverDashboard from './DriverDashboard'; // Impacted: Added Import

function Home() {
  const { user } = useAuth();

  console.log('Current User Role:', user?.role); // Debug

  // Role Routing
  if (user?.role === 'USER') return <UserScanner />;
  if (user?.role === 'SUPER_ADMIN') return <SuperAdminDashboard />;
  if (user?.role === 'DRIVER') return <DriverDashboard />; // Impacted: Added Case
  if (user?.role === 'MANAGER') return <ManagerDashboard />;

  // Default Fallback
  return <UserScanner />;
}

export default Home;
