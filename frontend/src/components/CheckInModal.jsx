import { useState, useEffect } from 'react';
import { driverService, parkingService } from '../services/api';

function CheckInModal({ onClose, onSuccess }) {
    const [drivers, setDrivers] = useState([]);
    const [formData, setFormData] = useState({
        vehicle_number: '',
        vehicle_model: '',
        customer_name: '',
        customer_phone: '',
        valet_id: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await driverService.getAllDrivers();
            setDrivers(response.data.drivers);
        } catch (error) {
            console.error('Error fetching drivers', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await parkingService.createSession(formData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error creating session', error);
            alert('Failed to check in car');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 2000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                background: 'white', width: '90%', maxWidth: '400px',
                padding: '24px', borderRadius: '24px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
            }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Check In Vehicle</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Vehicle Number</label>
                        <input
                            required
                            placeholder="MH 02 AB 1234"
                            value={formData.vehicle_number}
                            onChange={e => setFormData({ ...formData, vehicle_number: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Model (Optional)</label>
                        <input
                            placeholder="e.g. Honda City"
                            value={formData.vehicle_model}
                            onChange={e => setFormData({ ...formData, vehicle_model: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Assign Valet</label>
                        <select
                            required
                            value={formData.valet_id}
                            onChange={e => setFormData({ ...formData, valet_id: e.target.value })}
                        >
                            <option value="">Select Valet</option>
                            {drivers.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ flex: 1, padding: '14px', borderRadius: '16px', border: 'none', background: '#f3f4f6', fontWeight: '600', color: '#4b5563' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                            style={{ flex: 1 }}
                        >
                            {loading ? 'Checking In...' : 'Confirm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CheckInModal;
