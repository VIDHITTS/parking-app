# Smart Parking Management System

A full-stack web application designed to streamline multi-site parking operations. It features a complete Role-Based Access Control (RBAC) system for Admins, Managers, Drivers, and Users.

## 👥 User Roles

-   **Super Admin**: Global access. manages all sites, approves/rejects drivers, and views system-wide analytics.
-   **Site Manager**: Manages specific parking sites, oversees valet drivers, and handles daily operations.
-   **Valet Driver**: Accepts and processes parking/retrieval tasks (requires approval).
-   **User (Customer)**: Scans QR codes to park, track status, and request vehicle retrieval.

## 🚀 Key Features

-   **Role-Based Access Control (RBAC)**: Secure routing and data isolation for 4 distinct roles.
-   **Driver Approval Workflow**: Strict vetting process where Managers nominate and Super Admins approve drivers.
-   **Real-Time Dashboard**: Live tracking of parking sessions (Active, Retrieving, Completed).
-   **QR Code Integration**: Seamless user experience for check-in and check-out.
-   **Secure Auditing**: Logs critical actions like driver approvals.

## 🛠️ Tech Stack

-   **Frontend**: React.js, Vite, CSS Modules.
-   **Backend**: Node.js, Express.js.
-   **Database**: Supabase (PostgreSQL), Auth.
-   **Security**: JWT Authentication, Row-Level Security (RLS).

## 🔐 Demo Credentials

Use these credentials to test the application:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `superadmin@test.com` | `superadmin@123` |
| **Manager** | `manager@test.com` | `manager@123` |
| **Driver** | `driver@test.com` | `driver@123` |
| **User** | `user@test.com` | `user@123` |

## 📦 Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone https://github.com/VIDHITTS/parking-app.git
    cd parking-app
    ```

2.  **Database Setup**
    -   Create a Supabase project.
    -   Run `database/update_db.sql` in SQL Editor to create schema.
    -   Run `database/seed_demo.sql` to populate demo data.

3.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Setup .env (PORT, SUPABASE_URL, SUPABASE_KEY, JWT_SECRET, FRONTEND_URL)
    npm run dev
    ```

4.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    # Setup .env (VITE_API_URL)
    npm run dev
    ```

---

## 🤖 AI Usage Disclosure
This project utilized AI assistance for boilerplate generation and optimization, with strict human review and supervision for all architectural decisions and code implementation.
