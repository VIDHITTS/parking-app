import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sitesService, driverService, parkingService } from '../services/api';

function SuperAdminDashboard() {
    const { logout, user } = useAuth();
    const [activeTab, setActiveTab] = useState('Overview');
    const [sites, setSites] = useState([]);
    const [selectedSite, setSelectedSite] = useState(null);
    const [stats, setStats] = useState({ active: 0, revenue: 0, retrieving: 0 });
    const [pendingDrivers, setPendingDrivers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSites();
        fetchPendingDrivers();
    }, []);

    useEffect(() => {
        if (selectedSite) {
            fetchStats();
        }
    }, [selectedSite]);

    const fetchSites = async () => {
        try {
            const { data } = await sitesService.getAll();
            setSites(data.sites || []);
            if (data.sites?.length > 0) setSelectedSite(data.sites[0].id);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchStats = async () => {
        try {
            const { data } = await parkingService.getStats();
            // Note: Backend getStats is currently global, but we would pass selectedSite in future
            if (data.success) setStats(data.stats);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchPendingDrivers = async () => {
        try {
            const { data } = await driverService.getPending();
            setPendingDrivers(data.pending_drivers || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleApprove = async (id) => {
        try {
            await driverService.approve(id, user.id);
            fetchPendingDrivers();
            alert('Driver Approved!');
        } catch (err) {
            alert('Failed to approve');
        }
    };

    const handleReject = async (id) => {
        try {
            const reason = prompt('Reason for rejection:');
            if (!reason) return;
            await driverService.reject(id, user.id, reason);
            fetchPendingDrivers();
            alert('Driver Rejected');
        } catch (err) {
            alert('Failed to reject');
        }
    };

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1>Super Admin</h1>
                        <div className="subtitle">System Overview</div>
                    </div>
                    <button
                        onClick={logout}
                        className="btn-logout"
                        title="Logout"
                    >
                        <span>⎋</span>
                        Logout
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                    {['Overview', 'Approvals'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: 'none',
                                background: activeTab === tab ? 'white' : 'rgba(255,255,255,0.1)',
                                color: activeTab === tab ? '#6366f1' : 'white',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            {tab}
                            {tab === 'Approvals' && pendingDrivers.length > 0 && (
                                <span style={{
                                    marginLeft: '8px', background: '#ef4444', color: 'white',
                                    padding: '2px 6px', borderRadius: '10px', fontSize: '10px'
                                }}>
                                    {pendingDrivers.length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </header>

            <main className="dashboard-content" style={{ marginTop: '-20px' }}>

                {activeTab === 'Overview' && (
                    <>
                        {/* Site Selector */}
                        <div style={{ marginBottom: '24px' }}>
                            <select
                                value={selectedSite || ''}
                                onChange={(e) => setSelectedSite(e.target.value)}
                                style={{
                                    width: '100%', padding: '12px', borderRadius: '12px',
                                    border: '1px solid #e5e7eb', fontSize: '16px'
                                }}
                            >
                                {sites.map(site => (
                                    <option key={site.id} value={site.id}>{site.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Stats */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Revenue</h3>
                                <div className="value">₹{stats.revenue}</div>
                            </div>
                            <div className="stat-card">
                                <h3>Active</h3>
                                <div className="value">{stats.active}</div>
                            </div>
                            <div className="stat-card">
                                <h3>Retrieving</h3>
                                <div className="value">{stats.retrieving}</div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'Approvals' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {pendingDrivers.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                                All caught up! No pending applications.
                            </div>
                        ) : (
                            pendingDrivers.map(driver => (
                                <div key={driver.id} style={{
                                    background: 'white', padding: '16px', borderRadius: '16px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: '18px' }}>{driver.full_name}</h3>
                                            <div style={{ color: '#6b7280', fontSize: '14px' }}>{driver.license_number}</div>
                                        </div>
                                        <div style={{ background: '#fef3c7', color: '#d97706', padding: '4px 8px', borderRadius: '6px', height: 'fit-content', fontSize: '12px', fontWeight: 'bold' }}>
                                            PENDING
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => handleApprove(driver.id)}
                                            style={{
                                                flex: 1, padding: '10px', background: '#dcfce7', color: '#15803d',
                                                border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
                                            }}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(driver.id)}
                                            style={{
                                                flex: 1, padding: '10px', background: '#fee2e2', color: '#b91c1c',
                                                border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
                                            }}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default SuperAdminDashboard;
