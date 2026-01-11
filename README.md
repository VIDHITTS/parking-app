# Valet Parking Management System

A comprehensive, full-stack digital solution for managing multi-site valet parking operations. This system implements a robust Role-Based Access Control (RBAC) architecture to handle the complete lifecycle of parking sessions, from customer retrieval to driver management.

## 🚀 Key Features

### 1. Advanced Role System
The application supports 4 distinct roles with specific permissions:
-   **Super Admin**: "God Mode" access. View global statistics, manage parking sites, and **approve/reject** new driver applications.
-   **Site Manager**: Operates a specific location. Manages active parking sessions and submits new drivers for approval.
-   **Valet Driver**: Operations staff. Accepting/rejecting parking and retrieval tasks. *(Requires Approval)*.
-   **Customer (User)**: Scans QR code to track vehicle status, pay fees, and request retrieval.

### 2. Core Workflows
-   **Driver Onboarding**: Managers submit driver details -> Super Admin reviews license & approves/rejects -> Driver gains access.
-   **Parking Session**: User scans QR -> Session Starts -> Valet Assigned -> Car Parked -> User Requests Retrieval -> Valet Retrieves -> Payment & Exit.
-   **Real-time Dashboard**: Live updates for "Active Cars", "Retrieving", and "Revenue".

### 3. Security & Architecture
-   **Audit Logging**: Critical actions (Approval/Rejection) are logged for security.
-   **Row Level Security (RLS)**: Strict data isolation ensuring managers only see their site's data.

## 🛠️ Tech Stack

-   **Frontend**: React.js (Vite), Glassmorphism UI (CSS3).
-   **Backend**: Node.js, Express.js.
-   **Database**: Supabase (PostgreSQL), Auth, Realtime.

## 📦 Installation & Setup

### 1. Prerequisites
-   Node.js (v16+)
-   Supabase Account

### 2. Database Setup
1.  Create a new Supabase Project.
2.  Go to **SQL Editor**.
3.  Run the contents of `database/update_db.sql` to set up the schema, roles, and RLS policies.

### 3. Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# PORT=5000
# SUPABASE_URL=your_url
# SUPABASE_KEY=your_key
npm run dev
```

### 4. Frontend Setup
```bash
cd frontend
npm install
# Create .env file with:
# VITE_API_URL=http://localhost:5000/api
npm run dev
```

## 🔐 Default Credentials (Test Accounts)

| Role | Username (Simulated) | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin` | `admin123` |
| **Manager** | `manager` | `manager123` |

## 👨‍💻 Project Status
Completed and verified for assignment submission.
