import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show navbar on login/signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  // Don't show navbar if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Determine which nav items to show based on role
  const getRoleBasedNav = () => {
    if (user?.role === 'ADMIN') {
      return [
        { label: 'Dashboard', path: '/home' },
        { label: 'Admin', path: '/admin' },
      ];
    } else if (user?.role === 'MANAGER') {
      return [
        { label: 'Dashboard', path: '/home' },
        { label: 'History', path: '/history' },
      ];
    }
    return [];
  };

  const navItems = getRoleBasedNav();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand" onClick={() => navigate('/home')}>
            Parking Manager
          </div>
          
          <div className="navbar-nav">
            {navItems.map((item) => (
              <NavButton
                key={item.path}
                label={item.label}
                isActive={isActive(item.path)}
                onClick={() => navigate(item.path)}
              />
            ))}

            <div className="navbar-user">
              <span className={`role-badge ${user?.role?.toLowerCase()}`}>
                {user?.role}
              </span>
              
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`nav-button ${isActive ? 'active' : ''}`}
    >
      {label}
    </button>
  );
}
