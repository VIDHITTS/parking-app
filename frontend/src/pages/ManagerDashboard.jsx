import { useState, useEffect } from 'react';
import { parkingService } from '../services/api';
import AddDriverModal from '../components/AddDriverModal';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ManagerDashboard.css';

function ManagerDashboard() {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('All');
    const [showAddDriver, setShowAddDriver] = useState(false);
    const [editingValetId, setEditingValetId] = useState(null); // ID of session being edited

    // Hardcoded Demo state to match screenshot perfectly for now
    const [stats] = useState({
        active: 3,
        retrieving: 1,
        totalToday: 5,
        revenue: 825
    });

    const [sessions, setSessions] = useState([
        {
            id: '1',
            vehicle: 'Honda City',
            plate: 'MH02AB1234',
            customer: 'Amit Sharma',
            valet: 'Rajesh Kumar',
            valetId: 'V001',
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            status: 'Parked',
            entryTime: '19 Jan at 08:18 PM',
            duration: '2h 0m',
            payment: 150,
            isPaid: true
        },
        {
            id: '2',
            vehicle: 'Maruti Swift',
            plate: 'MH12CD5678',
            customer: 'Priya Verma',
            valet: 'Unassigned',
            valetId: null,
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            status: 'Parked',
            entryTime: '19 Jan at 07:30 PM',
            duration: '2h 45m',
            payment: 100,
            isPaid: false
        }
    ]);

    const handleReassign = (e) => {
        e.preventDefault();
        setEditingValetId(null);
        alert('Valet reassigned successfully');
    };

    return (
        <div className="manager-container" style={{ background: '#f8f7fc', minHeight: '100%' }}>
            {/* Header */}
            <header className="manager-header">
                <div className="manager-nav">
                    <div className="nav-left">
                        <button className="back-arrow" onClick={logout}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span className="manager-title">Manager Dashboard</span>
                    </div>
                    <button className="btn-add-driver" onClick={() => setShowAddDriver(true)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <path d="M20 8v6M23 11h-6" />
                        </svg>
                        Add Driver
                    </button>
                </div>
                <p className="manager-subtitle">Manage valet assignments and parking operations</p>
            </header>

            <div className="manager-content">
                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-title">Active Cars</div>
                        <div className="stat-number">{stats.active}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-title">Retrieving</div>
                        <div className="stat-number">{stats.retrieving}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-title">Total Today</div>
                        <div className="stat-number">{stats.totalToday}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-title">Revenue</div>
                        <div className="stat-number">₹{stats.revenue}</div>
                    </div>
                </div>

                {/* Search */}
                <div className="search-container">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input type="text" className="search-input" placeholder="Search by plate, customer or valet..." />
                </div>

                {/* Tabs */}
                <div className="filter-tabs">
                    {['All (5)', 'Parked (3)', 'Retrieving (1)', 'Retrieved'].map(tab => (
                        <button
                            key={tab}
                            className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="vehicle-list">
                    {sessions.map(session => (
                        <div key={session.id} className="vehicle-card">
                            <div className="vehicle-header">
                                <div className="vehicle-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M14 16H9m10 0h3v-3.15M17 16v3.6c0 .5-.4 1-1 1H6a1 1 0 0 1-1-1v-3.6H2V6h3v2.6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h3v7h-2" />
                                    </svg>
                                </div>
                                <div className="vehicle-main">
                                    <h3 className="vehicle-name">{session.vehicle}</h3>
                                    <p className="vehicle-plate">{session.plate}</p>
                                </div>
                                <span className={`status-tag ${session.status}`}>{session.status}</span>
                            </div>

                            <div className="info-row">
                                <div className="info-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <div className="info-content">
                                    <div className="info-label">Customer</div>
                                    <div className="info-value">{session.customer}</div>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="info-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                    </svg>
                                </div>
                                <div className="info-content" style={{ width: '100%' }}>
                                    <div className="info-label">Valet Assigned</div>
                                    <div className="valet-row">
                                        <div className="info-value">
                                            {session.valet}
                                            {session.valetId && <div style={{ fontSize: '11px', color: '#9ca3af' }}>ID: {session.valetId}</div>}
                                        </div>
                                        {session.valetId && (
                                            <button className="btn-call">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {(editingValetId === session.id) ? (
                                <div className="reassign-section">
                                    <div className="reassign-label">Reassign to:</div>
                                    <select className="reassign-select">
                                        <option>Select new valet...</option>
                                        <option>Rajesh Kumar</option>
                                        <option>Suresh Singh</option>
                                    </select>
                                    <div className="reassign-actions">
                                        <button className="btn-cancel" onClick={() => setEditingValetId(null)}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <button className="btn-reassign-trigger" onClick={() => setEditingValetId(session.id)}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    Reassign Valet
                                </button>
                            )}

                            <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid #f3f4f6' }} />

                            <div className="info-row">
                                <div className="info-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div className="info-content">
                                    <div className="info-label">Location</div>
                                    <div className="info-value">{session.location}</div>
                                    <div style={{ fontSize: '11px', color: '#6b7280' }}>{session.subLocation}</div>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="info-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                                <div className="info-content">
                                    <div className="info-label">Entry Time</div>
                                    <div className="info-value">{session.entryTime}</div>
                                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Duration: {session.duration}</div>
                                </div>
                            </div>

                            {session.isPaid && (
                                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '11px', color: '#6b7280' }}>Payment</span>
                                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>₹{session.payment}</span>
                                    </div>
                                    <div className="payment-badge">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Paid
                                    </div>
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            </div>

            {showAddDriver && (
                <AddDriverModal
                    onClose={() => setShowAddDriver(false)}
                    onSuccess={() => alert('Application sent!')}
                />
            )}
        </div>
    );
}

export default ManagerDashboard;
