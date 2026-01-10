import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    signup: (data) => api.post('/auth/signup', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    getCurrentUser: () => api.get('/auth/me'),
};

export const adminService = {
    getInsights: () => api.get('/admin/insights'),
};

export const parkingService = {
    createParking: (data) => api.post('/parkings', data),
    getAllParkings: () => api.get('/parkings'),
    getParkingsByCarId: (carId) => api.get(`/parkings/car/${carId}`),
    markAsPaid: (id) => api.patch(`/parkings/${id}/pay`),
    deleteParking: (id) => api.delete(`/parkings/${id}`),
};

export const driverService = {
    addDriver: (data) => api.post('/drivers', data),
    getAllDrivers: () => api.get('/drivers'),
    getDriverById: (id) => api.get(`/drivers/${id}`),
};

export const carService = {
    addCar: (data) => api.post('/cars', data),
    getCarsByDriver: (driverId) => api.get(`/cars?driver_id=${driverId}`),
    getAllCars: () => api.get('/cars/all'),
    getCarById: (id) => api.get(`/cars/${id}`),
};

export default api;
