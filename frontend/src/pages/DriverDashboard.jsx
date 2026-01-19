import { useAuth } from '../contexts/AuthContext';
import '../styles/DriverDashboard.css';

function DriverDashboard() {
    const { user } = useAuth();

    return (
        <div className="driver-container" style={{ background: '#f8f7fc', minHeight: '100vh', paddingBottom: '20px' }}>
            {/* Header */}
            <header className="driver-header">
                <div className="header-top">
                    <div>
                        <div className="driver-title">Driver Console</div>
                        <div className="driver-welcome">Welcome back,</div>
                        <div className="driver-name">{user?.name || 'Rajesh Kumar'}</div>
                    </div>
                    <div className="notification-bell">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <span className="notification-badge">1</span>
                    </div>
                </div>
            </header>

            <main className="driver-content">

                {/* New Assignments Section */}
                <div className="section-header">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span>New Assignments</span>
                </div>

                <div className="new-assignment-card">
                    <div className="assignment-header">
                        <div className="assignment-icon-box">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M14 16H9m10 0h3v-3.15M17 16v3.6c0 .5-.4 1-1 1H6a1 1 0 0 1-1-1v-3.6H2V6h3v2.6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h3v7h-2" />
                            </svg>
                        </div>
                        <div className="assignment-info">
                            <h3>Maruti Swift</h3>
                            <p>MH12CD5678</p>
                            <span className="badge-retrieve">Retrieve Vehicle</span>
                        </div>
                    </div>
                    <button className="btn-accept">
                        Accept Assignment
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>

                {/* Current Assignment Section */}
                <div className="section-header">
                    <span>Current Assignment</span>
                </div>

                <div className="current-assignment-card">
                    <div className="car-detail-header">
                        <div className="car-icon-large">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M14 16H9m10 0h3v-3.15M17 16v3.6c0 .5-.4 1-1 1H6a1 1 0 0 1-1-1v-3.6H2V6h3v2.6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h3v7h-2" />
                            </svg>
                        </div>
                        <div className="car-title">
                            <h2>Honda City</h2>
                            <span className="car-plate">MH02AB1234</span>
                            <span className="badge-park">Park Vehicle</span>
                        </div>
                    </div>

                    <div className="details-list">
                        <div className="detail-item">
                            <div className="detail-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <div className="detail-content">
                                <div className="detail-label">Customer</div>
                                <div className="detail-value">Amit Sharma</div>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div className="detail-content">
                                <div className="detail-label">Location</div>
                                <div className="detail-value">Phoenix Mall</div>
                                <div className="detail-sub">Lower Parel, Mumbai</div>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div className="detail-content">
                                <div className="detail-label">Park at</div>
                                <div className="detail-value">Level 2 - B34</div>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <div className="detail-content">
                                <div className="detail-label">Assigned at</div>
                                <div className="detail-value">11:48 PM</div>
                            </div>
                        </div>
                    </div>

                    <button className="btn-start-parking">
                        Start Parking
                    </button>
                </div>

                {/* Bottom Stats */}
                <div className="stats-row">
                    <div className="stat-box">
                        <div className="stat-title">Today</div>
                        <div className="stat-num">12</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-title">Parked</div>
                        <div className="stat-num green">8</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-title">Retrieved</div>
                        <div className="stat-num orange">4</div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DriverDashboard;
