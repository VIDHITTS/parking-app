import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
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
            console.error('Error fetching drivers:', error);
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
            console.error('Error adding driver:', error);
            alert('Failed to add driver');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>Drivers</h1>
                    <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ width: 'auto', padding: '10px 20px' }}>
                        {showForm ? 'Cancel' : '+ Add Driver'}
                    </button>
                </div>

                {showForm && (
                    <div className="action-card" style={{ marginTop: '20px' }}>
                        <h3>Add New Driver</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary">
                                {loading ? 'Adding...' : 'Add Driver'}
                            </button>
                        </form>
                    </div>
                )}

                <div className="parking-list" style={{ marginTop: '30px' }}>
                    {drivers.map((driver) => (
                        <div key={driver.id} className="parking-card">
                            <h4>{driver.name}</h4>
                            <p>Phone: {driver.phone}</p>
                            <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                                Added: {new Date(driver.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Drivers;
