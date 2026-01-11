import { useState, useEffect } from 'react';
import { parkingService } from '../services/api';

function History() {
    const [parkings, setParkings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchParkings();
    }, []);

    const fetchParkings = async () => {
        try {
            const response = await parkingService.getAllParkings();
            setParkings(response.data.parkings);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-wrapper">
            <div className="hero-header">
                <h1>Parking History</h1>
                <div className="subtitle">All your parking records</div>
            </div>

            <div className="content-area">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                    </div>
                ) : parkings.length === 0 ? (
                    <div className="empty-state">
                        <p>No parking history yet</p>
                    </div>
                ) : (
                    <div>
                        {parkings.map((parking) => (
                            <div key={parking.id} className="parking-card">
                                <div className="parking-header">
                                    <div>
                                        <h3>{parking.location}</h3>
                                        <div className="parking-location">
                                            <span>📍</span>
                                            <span>{parking.city}</span>
                                        </div>
                                    </div>
                                    <div className="price">₹{parking.fee}</div>
                                </div>

                                <div className="parking-details">
                                    <div>
                                        <span>🕒</span>
                                        <span>{new Date(parking.parking_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                    <div>
                                        <span>🚗</span>
                                        <span>{parking.cars?.car_number || 'N/A'}</span>
                                    </div>
                                    <div>
                                        <span>{parking.duration_minutes}m</span>
                                    </div>
                                </div>

                                <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span className={parking.is_paid ? 'badge-completed' : 'badge-pending'}>
                                        {parking.is_paid ? 'completed' : 'pending'}
                                    </span>
                                    {!parking.is_paid && (
                                        <button
                                            className="btn-primary"
                                            style={{ padding: '8px 16px', width: 'auto', fontSize: '13px' }}
                                            onClick={async () => {
                                                try {
                                                    await parkingService.markAsPaid(parking.id);
                                                    fetchParkings();
                                                } catch (error) {
                                                    console.error('Error:', error);
                                                }
                                            }}
                                        >
                                            Mark Paid
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default History;
