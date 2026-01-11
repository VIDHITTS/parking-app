import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './auth/auth.routes.js';
import driverRoutes from './drivers/drivers.routes.js';
import carRoutes from './cars/cars.routes.js';
import parkingRoutes from './parkings/parkings.routes.js';
import adminRoutes from './admin/admin.routes.js';
import { verifyToken } from './shared/middleware/auth.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    optionsSuccessStatus: 200,
    maxAge: 86400
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/drivers', verifyToken, driverRoutes);
app.use('/api/cars', verifyToken, carRoutes);
app.use('/api/parkings', verifyToken, parkingRoutes);
app.use('/api/admin', verifyToken, adminRoutes);

app.get('/', (req, res) => {
    res.json({ status: 'Parking Management API is running', port: PORT });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        port: PORT,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
