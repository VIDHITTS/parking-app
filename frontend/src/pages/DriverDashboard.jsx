import { useAuth } from '../contexts/AuthContext';
import '../styles/DriverDashboard.css';

function DriverDashboard() {
    const { user } = useAuth();

    return (
        <div className="driver-container" style={{ background: '#f8f7fc', minHeight: '100%' }}>
            {/* Header */}
            <header className="driver-header">
                <div className="driver-welcome">Welcome back,</div>
                <div className="driver-name">{user?.name || 'Driver'}</div>

                <div className="notification-bell">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="notification-badge">1</span>
                </div>
            </header>

            <main className="driver-content">
                {/* Task Card */}
                <div className="task-card">
                    <div className="car-header">
                        <div className="car-icon-box">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M14 16H9m10 0h3v-3.15M17 16v3.6c0 .5-.4 1-1 1H6a1 1 0 0 1-1-1v-3.6H2V6h3v2.6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h3v7h-2" />
                            </svg>
                        </div>
                        <div className="car-info">
                            <h2>Honda City</h2>
                            <p>MH02AB1234</p>
                            <span className="park-badge">Park Vehicle</span>
                        </div>
                    </div>

                    <div className="task-details">
                        <div className="task-detail-row">
                            <div className="task-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <div className="task-text">
                                <div className="task-label">Customer</div>
                                <div className="task-value">Amit Sharma</div>
                            </div>
                        </div>

                        <div className="task-detail-row">
                            <div className="task-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div className="task-text">
                                <div className="task-label">Location</div>
                                <div className="task-value">Phoenix Mall</div>
                                <div className="task-value-sub">Lower Parel, Mumbai</div>
                            </div>
                        </div>

                        <div className="task-detail-row">
                            <div className="task-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div className="task-text">
                                <div className="task-label">Park at</div>
                                <div className="task-value">Level 2 - B34</div>
                            </div>
                        </div>

                        <div className="task-detail-row">
                            <div className="task-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <div className="task-text">
                                <div className="task-label">Assigned at</div>
                                <div className="task-value">10:18 PM</div>
                            </div>
                        </div>
                    </div>

                    <button className="btn-action-main">
                        Start Parking
                    </button>
                </div>

                {/* Bottom Stats */}
                <div className="driver-stats-row">
                    <div className="stat-item">
                        <span className="stat-label">Today</span>
                        <span className="stat-value">12</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Parked</span>
                        <span className="stat-value green">8</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Retrieved</span>
                        <span className="stat-value orange">4</span>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DriverDashboard;
