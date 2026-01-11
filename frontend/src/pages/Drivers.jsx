import { useState, useEffect } from 'react';
import { driverService } from '../services/api';

function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await driverService.getAllDrivers();
            setDrivers(response.data.drivers);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await driverService.addDriver(formData);
            setFormData({ name: '', phone: '' });
            setShowForm(false);
            fetchDrivers();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="hero-header">
                <h1>Drivers</h1>
                <div className="subtitle">Manage driver information</div>
            </div>

            <div className="content-area" style={{ paddingTop: '20px' }}>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary"
                    style={{ marginBottom: '24px' }}
                >
                    {showForm ? '✕ Cancel' : '+ Add Driver'}
                </button>

                {showForm && (
                    <div style={{
                        background: '#f9fafb',
                        padding: '20px',
                        borderRadius: '16px',
                        marginBottom: '24px',
                        border: '1px solid #e5e7eb'
                    }}>
                        <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Add New Driver</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter driver name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary">
                                {loading ? 'Adding...' : 'Add Driver'}
                            </button>
                        </form>
                    </div>
                )}

                {drivers.length === 0 ? (
                    <div className="empty-state">
                        <p>No drivers yet</p>
                        <p style={{ fontSize: '13px', marginTop: '8px' }}>Add your first driver to get started</p>
                    </div>
                ) : (
                    <div>
                        {drivers.map((driver) => (
                            <div key={driver.id} className="parking-card">
                                <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>👤 {driver.name}</h3>
                                <div className="parking-location">
                                    <span>📞</span>
                                    <span>{driver.phone}</span>
                                </div>
                                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
                                    Added: {new Date(driver.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Drivers;
