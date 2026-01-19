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
    getStats: () => api.get('/parkings/stats'),
    createSession: (data) => api.post('/parkings', data),
    getAllSessions: () => api.get('/parkings'),
    updateStatus: (id, status) => api.patch(`/parkings/${id}/status`, { status }),
    reassignValet: (id, valetId) => api.patch(`/parkings/${id}/reassign`, { valet_id: valetId }),
    // Legacy support if needed, but we are pivoting
    createParking: (data) => api.post('/parkings', data),
    getAllParkings: () => api.get('/parkings'),
};

export const driverService = {
    getAllDrivers: (siteId) => api.get(`/drivers${siteId ? `?site_id=${siteId}` : ''}`),
    addDriver: (data) => api.post('/drivers', data),
    // Approval Workflow
    requestApproval: (data) => api.post('/drivers/request-approval', data),
    getPending: () => api.get('/drivers/pending'),
    approve: (id, reviewerId) => api.patch(`/drivers/approve/${id}`, { reviewed_by: reviewerId }),
    reject: (id, reviewerId, notes) => api.patch(`/drivers/reject/${id}`, { reviewed_by: reviewerId, review_notes: notes }),
};

export const sitesService = {
    getAll: () => api.get('/sites'),
    create: (data) => api.post('/sites', data),
    toggleStatus: (id, isActive) => api.patch(`/sites/${id}/status`, { is_active: isActive }),
};

export const carService = {
    addCar: (data) => api.post('/cars', data),
    getCarsByDriver: (driverId) => api.get(`/cars?driver_id=${driverId}`),
    getAllCars: () => api.get('/cars/all'),
    getCarById: (id) => api.get(`/cars/${id}`),
};

export default api;
