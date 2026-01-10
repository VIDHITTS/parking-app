import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
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
            console.error('Error fetching parkings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkPaid = async (id) => {
        try {
            await parkingService.markAsPaid(id);
            fetchParkings();
        } catch (error) {
            console.error('Error marking as paid:', error);
            alert('Failed to mark as paid');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Parking History</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : parkings.length === 0 ? (
                    <p>No parking records found</p>
                ) : (
                    <div className="parking-list" style={{ marginTop: '30px' }}>
                        {parkings.map((parking) => (
                            <div key={parking.id} className="parking-card">
                                <h4>{parking.cars?.car_name} - {parking.cars?.car_number}</h4>
                                <p>Driver: {parking.cars?.drivers?.name}</p>
                                <p>Phone: {parking.cars?.drivers?.phone}</p>
                                <p>Location: {parking.location}, {parking.city}</p>
                                <p>Date: {new Date(parking.parking_date).toLocaleDateString()}</p>
                                <p>Duration: {parking.duration_minutes} minutes</p>
                                <p>Fee: ₹{parking.fee}</p>
                                <span className={`status ${parking.is_paid ? 'paid' : 'pending'}`}>
                                    {parking.is_paid ? 'Paid' : 'Pending'}
                                </span>
                                {!parking.is_paid && (
                                    <button
                                        onClick={() => handleMarkPaid(parking.id)}
                                        className="btn-secondary"
                                        style={{ marginTop: '10px', width: '100%' }}
                                    >
                                        Mark as Paid
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default History;
