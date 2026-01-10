import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <h2>🅿️ Parking App</h2>
            </div>
            <div className="nav-links">
                <Link to="/home">Home</Link>
                <Link to="/drivers">Drivers</Link>
                <Link to="/cars">Cars</Link>
                <Link to="/history">History</Link>
                {user?.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
                <span className="user-info">{user?.name} ({user?.role})</span>
                <button onClick={logout} className="btn-secondary">Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
