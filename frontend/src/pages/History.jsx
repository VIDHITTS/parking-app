import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parkingService } from '../services/api';
import '../styles/History.css';

// Demo data for when API fails
const DEMO_HISTORY = [
    {
        id: 1,
        location: 'Phoenix Mall',
        address: 'Lower Parel, Mumbai',
        fee: 180,
        parking_date: '2025-12-08',
        vehicle_number: 'MH 12 AB 1234',
        status: 'completed'
    },
    {
        id: 2,
        location: 'Central Plaza',
        address: 'Andheri West, Mumbai',
        fee: 120,
        parking_date: '2025-12-05',
        vehicle_number: 'MH 14 CD 5678',
        status: 'completed'
    },
    {
        id: 3,
        location: 'City Center Mall',
        address: 'Bandra East, Mumbai',
        fee: 200,
        parking_date: '2025-12-03',
        vehicle_number: 'MH 12 AB 1234',
        status: 'completed'
    },
];

function History() {
    const navigate = useNavigate();
    const [parkings, setParkings] = useState(DEMO_HISTORY);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchParkings();
    }, []);

    const fetchParkings = async () => {
        try {
            setLoading(true);
            const response = await parkingService.getAllParkings();
            if (response.data?.parkings?.length > 0) {
                setParkings(response.data.parkings);
            }
        } catch (error) {
            console.error('Using demo data:', error);
            // Keep demo data on error
        } finally {
            setLoading(false);
        }
    };

    const totalBookings = parkings.length;

    return (
        <div className="history-container">
            {/* Header */}
            <header className="history-header">
                <div className="header-top">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1>Parking History</h1>
                </div>
                <p className="total-bookings">{totalBookings} total bookings</p>
            </header>

            {/* Content */}
            <main className="history-content">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                    </div>
                ) : parkings.length === 0 ? (
                    <div className="empty-state">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                        <p>No parking history yet</p>
                    </div>
                ) : (
                    <div className="history-list">
                        {parkings.map((parking) => (
                            <div key={parking.id} className="history-card">
                                <div className="card-main">
                                    <div className="card-left">
                                        <h3 className="mall-name">{parking.location}</h3>
                                        <div className="mall-address">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            <span>{parking.address || parking.city}</span>
                                        </div>
                                    </div>
                                    <div className="card-right">
                                        <span className="price">₹{parking.fee}</span>
                                        <span className={`status-badge ${parking.status || 'completed'}`}>
                                            {parking.status || 'completed'}
                                        </span>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <div className="detail-item">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        <span>
                                            {new Date(parking.parking_date).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="8" width="18" height="10" rx="2" />
                                            <circle cx="7" cy="15" r="1.5" />
                                            <circle cx="17" cy="15" r="1.5" />
                                        </svg>
                                        <span>{parking.vehicle_number || parking.cars?.car_number || 'N/A'}</span>
                                    </div>
                                    <button className="expand-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default History;
