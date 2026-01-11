import { useState, useEffect } from 'react';
import { parkingService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import CheckInModal from '../components/CheckInModal';
import AddDriverModal from '../components/AddDriverModal'; // New

function ManagerDashboard() {
    const { user, logout } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [stats, setStats] = useState({ active: 0, retrieving: 0, revenue: 0 });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [showAddDriver, setShowAddDriver] = useState(false); // New

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [sessionsRes, statsRes] = await Promise.all([
                parkingService.getAllSessions(),
                parkingService.getStats()
            ]);
            setSessions(sessionsRes.data.sessions || []);
            setStats(statsRes.data.stats || { active: 0, retrieving: 0, revenue: 0 });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            if (!window.confirm(`Mark as ${newStatus}?`)) return;
            await parkingService.updateStatus(id, newStatus);
            fetchData();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const filteredSessions = sessions.filter(session => {
        if (activeTab === 'All') return session.status !== 'Completed';
        return session.status === activeTab;
    });

    return (
        <>
            <div className="hero-header" style={{ paddingBottom: '60px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1>Dashboard</h1>
                        <div className="subtitle">Manager View</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {/* Add Driver Button */}
                        <button
                            onClick={() => setShowAddDriver(true)}
                            style={{
                                background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none',
                                height: '40px', padding: '0 12px', borderRadius: '12px',
                                fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            + Driver
                        </button>
                        {/* Check In Button */}
                        <button
                            onClick={() => setShowCheckIn(true)}
                            style={{
                                background: 'white', color: '#6366f1', border: 'none',
                                width: '40px', height: '40px', borderRadius: '12px',
                                fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                cursor: 'pointer'
                            }}
                        >
                            +
                        </button>
                        <button
                            onClick={logout}
                            className="btn-logout"
                            title="Logout"
                        >
                            <span>⎋</span>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', padding: '12px', borderRadius: '16px' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.active}</div>
                        <div style={{ fontSize: '11px', opacity: 0.8 }}>Active Cars</div>
                    </div>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', padding: '12px', borderRadius: '16px' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.retrieving}</div>
                        <div style={{ fontSize: '11px', opacity: 0.8 }}>Retrieving</div>
                    </div>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', padding: '12px', borderRadius: '16px' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>₹{stats.revenue}</div>
                        <div style={{ fontSize: '11px', opacity: 0.8 }}>Revenue</div>
                    </div>
                </div>
            </div>

            <div className="content-area" style={{ marginTop: '-40px', paddingTop: '0' }}>
                {/* Tabs */}
                <div style={{
                    display: 'flex', gap: '8px', padding: '0 4px 16px', overflowX: 'auto',
                    margin: '0 -16px 16px', paddingLeft: '20px'
                }}>
                    {['All', 'Parked', 'Retrieving', 'Completed'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                border: 'none',
                                background: activeTab === tab ? '#1f2937' : 'white',
                                color: activeTab === tab ? 'white' : '#6b7280',
                                fontSize: '13px',
                                fontWeight: '600',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Session List */}
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                    </div>
                ) : filteredSessions.length === 0 ? (
                    <div className="empty-state">
                        <p>No {activeTab.toLowerCase()} sessions</p>
                    </div>
                ) : (
                    <div>
                        {filteredSessions.map((session) => (
                            <div key={session.id} className="parking-card" style={{
                                borderLeft: session.status === 'Retrieving' ? '4px solid #f59e0b' :
                                    session.status === 'Parked' ? '4px solid #10b981' : '4px solid #6b7280',
                                position: 'relative'
                            }}>
                                <div className="parking-header">
                                    <div>
                                        <h3>{session.vehicle_number}</h3>
                                        <div className="parking-location">
                                            <span>🚗</span>
                                            <span>{session.vehicle_model || 'Unknown Model'}</span>
                                        </div>
                                    </div>
                                    <div className={`price`} style={{
                                        fontSize: '12px', background: 'transparent', padding: 0,
                                        color: session.status === 'Retrieving' ? '#f59e0b' :
                                            session.status === 'Parked' ? '#10b981' : '#6b7280',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase'
                                    }}>
                                        ● {session.status}
                                    </div>
                                </div>

                                <div className="parking-details">
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontSize: '16px' }}>👮</span>
                                            <span style={{ fontSize: '13px' }}>
                                                Valet: <strong>{session.drivers?.name || 'Unassigned'}</strong>
                                            </span>
                                        </div>
                                        {session.entry_time && (
                                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                                                {new Date(session.entry_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                                    {session.status === 'Parked' && (
                                        <button
                                            className="btn-primary"
                                            onClick={() => handleStatusUpdate(session.id, 'Retrieving')}
                                            style={{
                                                padding: '10px', fontSize: '13px', border: 'none', borderRadius: '12px',
                                                background: '#f59e0b', color: 'white', fontWeight: '600', flex: 1,
                                                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)', cursor: 'pointer'
                                            }}
                                        >
                                            Request Car
                                        </button>
                                    )}
                                    {session.status === 'Retrieving' && (
                                        <button
                                            className="btn-primary"
                                            onClick={() => handleStatusUpdate(session.id, 'Completed')}
                                            style={{
                                                padding: '10px', fontSize: '13px', border: 'none', borderRadius: '12px',
                                                background: '#10b981', color: 'white', fontWeight: '600', flex: 1,
                                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', cursor: 'pointer'
                                            }}
                                        >
                                            Mark Completed
                                        </button>
                                    )}
                                    {session.status !== 'Completed' && (
                                        <button
                                            style={{
                                                padding: '10px', borderRadius: '12px', border: '1px solid #e5e7eb',
                                                background: 'white', color: '#374151', fontSize: '13px', fontWeight: '600', flex: 1,
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => alert(`Calling ${session.drivers?.phone || 'Central Desk'}...`)}
                                        >
                                            Call Valet
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showCheckIn && (
                <CheckInModal
                    onClose={() => setShowCheckIn(false)}
                    onSuccess={fetchData}
                />
            )}

            {showAddDriver && (
                <AddDriverModal
                    onClose={() => setShowAddDriver(false)}
                    onSuccess={() => alert('Application sent!')}
                />
            )}
        </>
    );
}

export default ManagerDashboard;
