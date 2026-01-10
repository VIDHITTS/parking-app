import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { parkingService } from '../services/api';

function Home() {
    const [recentParkings, setRecentParkings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecentParkings();
    }, []);

    const fetchRecentParkings = async () => {
        try {
            const response = await parkingService.getAllParkings();
            setRecentParkings(response.data.parkings.slice(0, 5));
        } catch (error) {
            console.error('Error fetching parkings:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Dashboard</h1>

                <div className="actions">
                    <div className="action-card">
                        <h3>Quick Actions</h3>
                        <button className="btn-primary">Scan QR to Park</button>
                        <button className="btn-secondary">Add New Driver</button>
                        <button className="btn-secondary">Add New Car</button>
                    </div>
                </div>

                <div className="recent-section">
                    <h2>Recent Parkings</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : recentParkings.length === 0 ? (
                        <p>No parking records yet</p>
                    ) : (
                        <div className="parking-list">
                            {recentParkings.map((parking) => (
                                <div key={parking.id} className="parking-card">
                                    <h4>{parking.cars?.car_name} - {parking.cars?.car_number}</h4>
                                    <p>Driver: {parking.cars?.drivers?.name}</p>
                                    <p>Location: {parking.location}, {parking.city}</p>
                                    <p>Fee: ₹{parking.fee}</p>
                                    <span className={`status ${parking.is_paid ? 'paid' : 'pending'}`}>
                                        {parking.is_paid ? 'Paid' : 'Pending'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
