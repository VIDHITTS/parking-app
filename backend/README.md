# Parking Management System

Backend API for parking management application.

## Tech Stack
- Node.js + Express.js
- PostgreSQL (Supabase)
- JWT Authentication
- Microservices Architecture

## Structure
```
src/
├── auth/           # Authentication service
├── drivers/        # Driver management service
├── cars/           # Car management service
├── parkings/       # Parking management service
├── admin/          # Admin analytics service
└── shared/         # Shared utilities
    ├── config/     # Configuration files
    └── middleware/ # Middleware functions
```

## Setup
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and configure
3. Run development server: `npm run dev`
4. Run production: `npm start`

## API Endpoints

### Auth
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user
- POST `/api/auth/logout` - Logout

### Drivers (Protected)
- POST `/api/drivers` - Add driver
- GET `/api/drivers` - Get all drivers
- GET `/api/drivers/:id` - Get driver by ID

### Cars (Protected)
- POST `/api/cars` - Add car
- GET `/api/cars?driver_id=` - Get cars by driver
- GET `/api/cars/all` - Get all cars
- GET `/api/cars/:id` - Get car by ID

### Parkings (Protected)
- POST `/api/parkings` - Create parking entry
- GET `/api/parkings` - Get all parkings
- GET `/api/parkings/car/:car_id` - Get parkings by car
- GET `/api/parkings/:id` - Get parking by ID
- PATCH `/api/parkings/:id/pay` - Mark as paid
- DELETE `/api/parkings/:id` - Delete parking

### Admin (Protected)
- GET `/api/admin/insights` - Get analytics
