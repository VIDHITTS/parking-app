import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
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
            console.error('Error fetching cars:', error);
        }
    };

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
            await carService.addCar(formData);
            setFormData({ driver_id: '', car_name: '', car_number: '' });
            setShowForm(false);
            fetchCars();
        } catch (error) {
            console.error('Error adding car:', error);
            alert('Failed to add car');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>Cars</h1>
                    <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ width: 'auto', padding: '10px 20px' }}>
                        {showForm ? 'Cancel' : '+ Add Car'}
                    </button>
                </div>

                {showForm && (
                    <div className="action-card" style={{ marginTop: '20px' }}>
                        <h3>Add New Car</h3>
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
                                    required
                                    placeholder="e.g., Honda City"
                                />
                            </div>
                            <div className="form-group">
                                <label>Car Number</label>
                                <input
                                    type="text"
                                    value={formData.car_number}
                                    onChange={(e) => setFormData({ ...formData, car_number: e.target.value })}
                                    required
                                    placeholder="e.g., MH12AB1234"
                                />
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary">
                                {loading ? 'Adding...' : 'Add Car'}
                            </button>
                        </form>
                    </div>
                )}

                <div className="parking-list" style={{ marginTop: '30px' }}>
                    {cars.map((car) => (
                        <div key={car.id} className="parking-card">
                            <h4>{car.car_name}</h4>
                            <p>Number: {car.car_number}</p>
                            <p>Driver: {car.drivers?.name}</p>
                            <p>Phone: {car.drivers?.phone}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Cars;
