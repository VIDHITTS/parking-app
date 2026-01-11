import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { adminService } from '../services/api';

function AdminDashboard() {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInsights();
    }, []);

    const fetchInsights = async () => {
        try {
            const response = await adminService.getInsights();
            setInsights(response.data);
        } catch (error) {
            console.error('Error fetching insights:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div>
                <Header title="Admin Dashboard" description="View system analytics and insights" />
                <div className="container">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header title="Admin Dashboard" description="View system analytics and insights" />
            <div className="container">
                <div className="parking-list">
                    <div className="parking-card" style={{ background: '#dbeafe' }}>
                        <h4>Total Collection</h4>
                        <h2 style={{ color: '#1e40af' }}>₹{insights?.totalCollection || 0}</h2>
                    </div>

                    <div className="parking-card" style={{ background: '#d1fae5' }}>
                        <h4>Total Cars</h4>
                        <h2 style={{ color: '#065f46' }}>{insights?.totalCars || 0}</h2>
                    </div>

                    <div className="parking-card" style={{ background: '#fef3c7' }}>
                        <h4>Active Parkings</h4>
                        <h2 style={{ color: '#92400e' }}>{insights?.activeParkings || 0}</h2>
                    </div>

                    <div className="parking-card" style={{ background: '#f3e8ff' }}>
                        <h4>Total Parkings</h4>
                        <h2 style={{ color: '#6b21a8' }}>{insights?.totalParkings || 0}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
