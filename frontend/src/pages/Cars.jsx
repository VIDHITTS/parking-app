import { useState, useEffect } from 'react';
import { carService, driverService } from '../services/api';

function Cars() {
    const [cars, setCars] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ driver_id: '', car_name: '', car_number: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCars();
        fetchDrivers();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await carService.getAllCars();
            setCars(response.data.cars);
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
            await carService.addCar(formData);
            setFormData({ driver_id: '', car_name: '', car_number: '' });
            setShowForm(false);
            fetchCars();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-wrapper">
            <div className="hero-header">
                <h1>Cars</h1>
                <div className="subtitle">Manage vehicle information</div>
            </div>

            <div className="content-area">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary"
                    style={{ marginBottom: '20px' }}
                >
                    {showForm ? 'Cancel' : '+ Add Car'}
                </button>

                {showForm && (
                    <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
                        <h3 style={{ marginBottom: '16px' }}>Add New Car</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Select Driver</label>
                                <select
                                    value={formData.driver_id}
                                    onChange={(e) => setFormData({ ...formData, driver_id: e.target.value })}
                                    required
                                >
                                    <option value="">Choose a driver</option>
                                    {drivers.map((driver) => (
                                        <option key={driver.id} value={driver.id}>
                                            {driver.name} - {driver.phone}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Car Name</label>
                                <input
                                    type="text"
                                    value={formData.car_name}
                                    onChange={(e) => setFormData({ ...formData, car_name: e.target.value })}
                                    placeholder="e.g., Honda City"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Car Number</label>
                                <input
                                    type="text"
                                    value={formData.car_number}
                                    onChange={(e) => setFormData({ ...formData, car_number: e.target.value })}
                                    placeholder="e.g., MH12AB1234"
                                    required
                                />
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary">
                                {loading ? 'Adding...' : 'Add Car'}
                            </button>
                        </form>
                    </div>
                )}

                {cars.map((car) => (
                    <div key={car.id} className="parking-card">
                        <h3>🚗 {car.car_name}</h3>
                        <div className="parking-location">
                            <span>🔢</span>
                            <span>{car.car_number}</span>
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '13px', color: '#6b7280' }}>
                            Driver: {car.drivers?.name} • {car.drivers?.phone}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cars;
