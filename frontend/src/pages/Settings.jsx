import { useAuth } from '../contexts/AuthContext';
import '../styles/Settings.css';

function Settings() {
    const { user, currentRole } = useAuth();

    return (
        <div className="settings-container">
            <header className="settings-header">
                <button className="back-btn" onClick={() => window.history.back()}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1>Settings</h1>
                <p className="settings-subtitle">Manage your account and preferences</p>
            </header>

            <main className="settings-content">
                {/* Profile Card */}
                <div className="profile-card">
                    <div className="profile-avatar">
                        {user?.name?.charAt(0) || 'J'}
                    </div>
                    <div className="profile-info">
                        <h4 className="profile-name">{user?.name || 'John Doe'}</h4>
                        <p className="profile-phone">{user?.phone || '+91 98765 43210'}</p>
                    </div>
                    <div className="edit-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                    </div>
                </div>

                {/* Settings Actions */}
                <div className="settings-list">
                    <a href="#" className="settings-item">
                        <div className="settings-icon-box">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 16H9m10 0h3v-3.15M17 16v3.6c0 .5-.4 1-1 1H6a1 1 0 0 1-1-1v-3.6H2V6h3v2.6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h3v7h-2" />
                            </svg>
                        </div>
                        <span className="item-label">Manage Vehicles</span>
                        <span style={{ fontSize: '12px', color: '#6b7280', marginRight: '8px' }}>2 vehicles saved</span>
                        <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </a>

                    <a href="/history" className="settings-item">
                        <div className="settings-icon-box">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                            <span className="item-label" style={{ display: 'block' }}>Transaction History</span>
                            <span style={{ fontSize: '12px', color: '#6b7280' }}>View all payments</span>
                        </div>
                        <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </a>

                    <a href="#" className="settings-item">
                        <div className="settings-icon-box">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                            <span className="item-label" style={{ display: 'block' }}>Help & Support</span>
                            <span style={{ fontSize: '12px', color: '#6b7280' }}>Get assistance</span>
                        </div>
                        <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </a>

                    <a href="#" className="settings-item">
                        <div className="settings-icon-box">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                            <span className="item-label" style={{ display: 'block' }}>FAQ</span>
                            <span style={{ fontSize: '12px', color: '#6b7280' }}>Frequently Asked Questions</span>
                        </div>
                        <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </a>
                </div>
            </main>
        </div>
    );
}

export default Settings;
