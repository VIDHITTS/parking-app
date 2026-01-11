# 🅿️ Parking Management System

A full-stack parking management web application built with React, Node.js, Express, and Supabase PostgreSQL.

## 🚀 Features

- **User Authentication** (JWT-based)
  - Role-based access (Admin/Manager)
  - Secure login and signup

- **Driver Management**
  - Add and view drivers
  - Track driver information

- **Car Management**
  - Add cars linked to drivers
  - View all registered cars

- **Parking Management**
  - Create parking entries
  - View parking history
  - Mark parkings as paid
  - Track parking fees and duration

- **Admin Dashboard**
  - View total collection
  - Track active parkings
  - Monitor total cars and parkings

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- Supabase (PostgreSQL)
- JWT Authentication
- bcrypt

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Supabase

## 📦 Installation

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Add your environment variables:
# PORT=5000
# SUPABASE_URL=your_supabase_url
# SUPABASE_KEY=your_supabase_key
# JWT_SECRET=your_secret_key

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Add your environment variables:
# VITE_API_URL=your_backend_url
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_KEY=your_supabase_key

# Start development server
npm run dev
```

## 📊 Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `name` (Text)
- `email` (Text, Unique)
- `password_hash` (Text)
- `role` (Text: ADMIN/MANAGER)
- `created_at` (Timestamp)

### Drivers Table
- `id` (UUID, Primary Key)
- `name` (Text)
- `phone` (Text)
- `created_at` (Timestamp)

### Cars Table
- `id` (UUID, Primary Key)
- `driver_id` (UUID, Foreign Key)
- `car_name` (Text)
- `car_number` (Text)
- `created_at` (Timestamp)

### Parkings Table
- `id` (UUID, Primary Key)
- `car_id` (UUID, Foreign Key)
- `location` (Text)
- `city` (Text)
- `parking_date` (Date)
- `duration_minutes` (Integer)
- `fee` (Numeric)
- `is_paid` (Boolean)
- `created_at` (Timestamp)

## 🔐 Authentication

### Role-Based Passwords
- **Admin**: `admin123`
- **Manager**: `manager123`

Use these passwords during signup to create accounts with the respective roles.

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Drivers (Protected)
- `POST /api/drivers` - Add driver
- `GET /api/drivers` - Get all drivers
- `GET /api/drivers/:id` - Get driver by ID

### Cars (Protected)
- `POST /api/cars` - Add car
- `GET /api/cars?driver_id=` - Get cars by driver
- `GET /api/cars/all` - Get all cars
- `GET /api/cars/:id` - Get car by ID

### Parkings (Protected)
- `POST /api/parkings` - Create parking entry
- `GET /api/parkings` - Get all parkings
- `GET /api/parkings/car/:car_id` - Get parkings by car
- `GET /api/parkings/:id` - Get parking by ID
- `PATCH /api/parkings/:id/pay` - Mark as paid
- `DELETE /api/parkings/:id` - Delete parking

### Admin (Protected)
- `GET /api/admin/insights` - Get analytics

## 📱 Usage

1. **Sign Up**: Create an account with either Admin or Manager role
2. **Login**: Access the dashboard
3. **Add Drivers**: Register drivers in the system
4. **Add Cars**: Link cars to drivers
5. **Manage Parkings**: View and manage parking records
6. **Admin Dashboard**: View insights and analytics (Admin only)

## 🎨 Design Features

- Clean, modern UI design
- Responsive layout
- Color-coded status indicators
- Role-based navigation
- Real-time updates

## 📝 License

MIT License

## 👨‍💻 Author

Developed as part of assignment submission.

## 📧 Contact

For any queries, contact: akapoor@brandworks.site
