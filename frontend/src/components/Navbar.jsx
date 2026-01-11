import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const getRoleBasedNav = () => {
        if (user?.role === 'ADMIN') {
            return [
                { label: 'Dashboard', path: '/home' },
                { label: 'Admin', path: '/admin' },
            ];
        } else if (user?.role === 'MANAGER') {
            return [
                { label: 'Dashboard', path: '/home' },
                { label: 'Drivers', path: '/drivers' },
                { label: 'Cars', path: '/cars' },
                { label: 'History', path: '/history' },
            ];
        }
        return [];
    };

    const navItems = getRoleBasedNav();

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <h2>🅿️ Parking App</h2>
            </div>
            <div className="nav-links">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={location.pathname === item.path ? 'active' : ''}
                    >
                        {item.label}
                    </Link>
                ))}
                <span className={`role-badge ${user?.role?.toLowerCase()}`}>
                    {user?.role}
                </span>
                <button onClick={handleLogout} className="btn-secondary">Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
