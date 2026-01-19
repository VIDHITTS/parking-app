import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { sitesService, driverService, parkingService } from '../services/api';
import '../styles/SuperAdminDashboard.css';

function SuperAdminDashboard() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');
    const [sites, setSites] = useState([]);
    const [selectedSite, setSelectedSite] = useState(null);
    const [selectedSiteData, setSelectedSiteData] = useState(null);
    const [stats, setStats] = useState({
        todayTickets: 87,
        todayCollection: 13050,
        totalTickets: 1247,
        totalCollection: 186450,
        activeParking: 45
    });
    const [pendingDrivers, setPendingDrivers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSites();
        fetchPendingDrivers();
    }, []);

    useEffect(() => {
        if (selectedSite) {
            const site = sites.find(s => s.id === selectedSite);
            setSelectedSiteData(site);
            fetchStats();
        }
    }, [selectedSite, sites]);

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
            if (data.success) {
                setStats(prev => ({
                    ...prev,
                    activeParking: data.stats.active || prev.activeParking,
                    todayCollection: data.stats.revenue || prev.todayCollection
                }));
            }
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
        <div className="super-admin-container">
            {/* Header */}
            <header className="super-admin-header">
                <div className="header-top">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="header-title">
                        <h1>Super Admin</h1>
                        <p className="header-subtitle">System overview and approvals</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs-container">
                    <button
                        className={`tab-btn ${activeTab === 'Overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'Approvals' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Approvals')}
                    >
                        Approvals
                        {pendingDrivers.length > 0 && (
                            <span className="badge">{pendingDrivers.length}</span>
                        )}
                    </button>
                </div>
            </header>

            <main className="super-admin-content">
                {activeTab === 'Overview' && (
                    <>
                        {/* Site Selector */}
                        <div className="site-selector-section">
                            <label className="section-label">Select Site</label>
                            <div className="select-wrapper">
                                <select
                                    value={selectedSite || ''}
                                    onChange={(e) => setSelectedSite(e.target.value)}
                                    className="site-select"
                                >
                                    {sites.map(site => (
                                        <option key={site.id} value={site.id}>{site.name}</option>
                                    ))}
                                </select>
                                <svg className="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </div>
                        </div>

                        {/* Today's Performance */}
                        <div className="performance-section">
                            <div className="section-header">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <span>Today's Performance</span>
                            </div>
                            <div className="performance-cards">
                                <div className="performance-card">
                                    <span className="perf-label">Tickets Issued</span>
                                    <span className="perf-value purple">{stats.todayTickets}</span>
                                </div>
                                <div className="performance-card">
                                    <span className="perf-label">Collection</span>
                                    <span className="perf-value green">₹{stats.todayCollection.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Overall Statistics */}
                        <div className="stats-section">
                            <div className="section-header">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                </svg>
                                <span>Overall Statistics</span>
                            </div>

                            <div className="stat-row">
                                <div className="stat-icon purple-bg">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="M7 8h4M7 12h10M7 16h6" />
                                    </svg>
                                </div>
                                <span className="stat-label">Total Tickets</span>
                                <span className="stat-value">{stats.totalTickets.toLocaleString()}</span>
                            </div>

                            <div className="stat-row">
                                <div className="stat-icon blue-bg">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                                        <line x1="12" y1="1" x2="12" y2="23" />
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </div>
                                <span className="stat-label">Total Collection</span>
                                <span className="stat-value">₹{stats.totalCollection.toLocaleString()}</span>
                            </div>

                            <div className="stat-row">
                                <div className="stat-icon green-bg">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <span className="stat-label">Active Parking</span>
                                <span className="stat-value">{stats.activeParking}</span>
                            </div>
                        </div>

                        {/* Site Info Card */}
                        {selectedSiteData && (
                            <div className="site-info-card">
                                <h3 className="site-name">{selectedSiteData.name}</h3>
                                <p className="site-location">{selectedSiteData.location}</p>
                            </div>
                        )}
                    </>
                )}

                {activeTab === 'Approvals' && (
                    <div className="approvals-list">
                        {pendingDrivers.length === 0 ? (
                            <div className="empty-state">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>All caught up! No pending applications.</p>
                            </div>
                        ) : (
                            pendingDrivers.map(driver => (
                                <div key={driver.id} className="approval-card">
                                    <div className="approval-header">
                                        <div>
                                            <h3 className="driver-name">{driver.full_name}</h3>
                                            <p className="driver-license">{driver.license_number}</p>
                                        </div>
                                        <span className="pending-badge">PENDING</span>
                                    </div>
                                    <div className="approval-actions">
                                        <button
                                            className="approve-btn"
                                            onClick={() => handleApprove(driver.id)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="reject-btn"
                                            onClick={() => handleReject(driver.id)}
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
