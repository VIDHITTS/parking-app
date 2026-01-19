import { useAuth } from '../contexts/AuthContext';
import '../styles/Settings.css';

function Settings() {
    const { user, currentRole } = useAuth();

    return (
        <div className="settings-container">
            <header className="settings-header">
                <h1>Settings</h1>
                <p className="settings-subtitle">App preferences</p>
            </header>

            <main className="settings-content">
                {/* Current User Info */}
                <div className="settings-section">
                    <h3 className="section-title">Current Profile</h3>
                    <div className="profile-card">
                        <div className="profile-avatar">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="profile-info">
                            <h4 className="profile-name">{user?.name}</h4>
                            <p className="profile-email">{user?.email}</p>
                            <span className="profile-role">{currentRole?.replace('_', ' ')}</span>
                        </div>
                    </div>
                </div>

                {/* Quick Links based on role */}
                <div className="settings-section">
                    <h3 className="section-title">Quick Actions</h3>
                    <div className="settings-list">
                        {(currentRole === 'SUPER_ADMIN' || currentRole === 'ADMIN') && (
                            <a href="/super-admin" className="settings-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L3 7l9 5 9-5-9-5z" />
                                    <path d="M3 17l9 5 9-5" />
                                    <path d="M3 12l9 5 9-5" />
                                </svg>
                                <span>Super Admin Dashboard</span>
                                <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </a>
                        )}
                        {(currentRole === 'MANAGER' || currentRole === 'SUPER_ADMIN') && (
                            <a href="/manager" className="settings-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <path d="M3 9h18" />
                                    <path d="M9 21V9" />
                                </svg>
                                <span>Manager Dashboard</span>
                                <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </a>
                        )}
                        <a href="/drivers" className="settings-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <span>Manage Drivers</span>
                            <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* App Info */}
                <div className="settings-section">
                    <h3 className="section-title">About</h3>
                    <div className="settings-list">
                        <div className="settings-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                            <span>Version</span>
                            <span className="settings-value">1.0.0</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Settings;
