import { useAuth } from '../contexts/AuthContext';
import UserScanner from '../components/UserScanner';
import SuperAdminDashboard from './SuperAdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import DriverDashboard from './DriverDashboard';

function Home() {
  const { user } = useAuth();

  if (user?.role === 'USER') return <UserScanner />;
  if (user?.role === 'SUPER_ADMIN') return <SuperAdminDashboard />;
  if (user?.role === 'DRIVER') return <DriverDashboard />;
  if (user?.role === 'MANAGER') return <ManagerDashboard />;

  return <UserScanner />;
}

export default Home;
