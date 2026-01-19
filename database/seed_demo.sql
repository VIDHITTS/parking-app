-- 0. FIX CONSTRAINTS (Crucial Step to prevent errors)
-- Fix 1: Update Role Check to include DRIVER and SUPER_ADMIN
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'MANAGER', 'DRIVER', 'USER'));

-- Fix 2: Update pending_drivers FK to point to public.users (since we use custom auth)
ALTER TABLE pending_drivers DROP CONSTRAINT IF EXISTS pending_drivers_submitted_by_fkey;
ALTER TABLE pending_drivers ADD CONSTRAINT pending_drivers_submitted_by_fkey 
    FOREIGN KEY (submitted_by) REFERENCES public.users(id) ON DELETE SET NULL;

-- Enable pgcrypto for password hashing if available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Sites (Including Phoenix Mall - Lower Parel as shown in design)
INSERT INTO sites (name, location, image_url, is_active) VALUES 
('Phoenix Mall - Lower Parel', 'Lower Parel, Mumbai', 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80', true),
('Inorbit Mall - Malad', 'Malad West, Mumbai', 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&q=80', true),
('High Street Phoenix', 'Lower Parel, Mumbai', 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?auto=format&fit=crop&q=80', true),
('R City Mall - Ghatkopar', 'Ghatkopar West, Mumbai', 'https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?auto=format&fit=crop&q=80', true),
('Oberoi Mall - Goregaon', 'Goregaon East, Mumbai', 'https://images.unsplash.com/photo-1519214605650-76a613ee3245?auto=format&fit=crop&q=80', true),
('Central Plaza', 'Andheri West, Mumbai', 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?auto=format&fit=crop&q=80', true),
('City Center Mall', 'Bandra East, Mumbai', 'https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?auto=format&fit=crop&q=80', true)
ON CONFLICT DO NOTHING;

-- 2. Users (Demo Credentials)
-- IMPORTANT: These passwords are hashed using bcrypt (cost 10) to match the Node.js backend
-- Demo Credentials:
-- Super Admin: superadmin@test.com / admin123
-- Manager: manager@test.com / manager123
-- Driver: driver@test.com / driver123
-- User: user@test.com / user123

-- Bcrypt hashes generated with cost 10:
-- admin123    -> $2b$10$hzh3eJMFyqa/P8GHLwI.4O5JWqed3U/GtwcoV6qhJX.VlVxVch.eO
-- manager123  -> $2b$10$hA.pI2duI86oPeN0QbSqPu0ablGehBTwNp.UnzTLmUhcYliKWIwiq
-- driver123   -> $2b$10$5KVuEOrv4Zbog1YUnqMaPOwb71J6iMqmVfHOLXVvzOe1uWdgF7Whi
-- user123     -> $2b$10$CviEdEPt2xStjqYEGzSd5eMLRt32HiDr1/7Hgayb3b5YUDhXUzY0O

INSERT INTO users (name, email, role, password_hash) VALUES
('Super Admin', 'superadmin@test.com', 'SUPER_ADMIN', '$2b$10$hzh3eJMFyqa/P8GHLwI.4O5JWqed3U/GtwcoV6qhJX.VlVxVch.eO'),
('Rajesh Kumar', 'manager@test.com', 'MANAGER', '$2b$10$hA.pI2duI86oPeN0QbSqPu0ablGehBTwNp.UnzTLmUhcYliKWIwiq'),
('Amit Sharma', 'driver@test.com', 'DRIVER', '$2b$10$5KVuEOrv4Zbog1YUnqMaPOwb71J6iMqmVfHOLXVvzOe1uWdgF7Whi'),
('Priya Patel', 'user@test.com', 'USER', '$2b$10$CviEdEPt2xStjqYEGzSd5eMLRt32HiDr1/7Hgayb3b5YUDhXUzY0O'),
('Vikram Singh', 'manager2@test.com', 'MANAGER', '$2b$10$hA.pI2duI86oPeN0QbSqPu0ablGehBTwNp.UnzTLmUhcYliKWIwiq'),
('Suresh Rajan', 'driver2@test.com', 'DRIVER', '$2b$10$5KVuEOrv4Zbog1YUnqMaPOwb71J6iMqmVfHOLXVvzOe1uWdgF7Whi')
ON CONFLICT (email) 
DO UPDATE SET 
    role = EXCLUDED.role, 
    password_hash = EXCLUDED.password_hash;

-- 3. Drivers (Linked to Sites - Phoenix Mall)
DO $$
DECLARE
    v_site_id UUID;
BEGIN
    SELECT id INTO v_site_id FROM sites WHERE name = 'Phoenix Mall - Lower Parel' LIMIT 1;
    
    INSERT INTO drivers (name, phone, site_id, status)
    VALUES 
    ('Amit Sharma', '9988776655', v_site_id, 'active'),
    ('Suresh Rajan', '9876543210', v_site_id, 'active'),
    ('Rahul Verma', '8765432109', v_site_id, 'active'),
    ('Kiran Patil', '7654321098', v_site_id, 'active'),
    ('Deepak Mishra', '6543210987', v_site_id, 'active')
    ON CONFLICT DO NOTHING;
END $$;

-- 4. Pending Drivers (For Approval Demo - Multiple pending)
INSERT INTO pending_drivers (full_name, phone, license_number, status, submitted_by)
VALUES 
('Ramesh Kumar', '9551234567', 'MH-01-2024-001234', 'pending', (SELECT id FROM users WHERE email = 'manager@test.com')),
('Sanjay Gupta', '9552345678', 'MH-02-2024-005678', 'pending', (SELECT id FROM users WHERE email = 'manager@test.com')),
('Vijay Thakur', '9553456789', 'MH-03-2024-009012', 'pending', (SELECT id FROM users WHERE email = 'manager2@test.com'))
ON CONFLICT DO NOTHING;

-- 5. Add Specific History Records for User "Priya Patel" (user@test.com) to match screenshots
DO $$
DECLARE
    v_user_id UUID;
    v_phoenix_id UUID;
    v_central_id UUID;
    v_city_id UUID;
BEGIN
    SELECT id INTO v_user_id FROM users WHERE email = 'user@test.com' LIMIT 1;
    -- Note: Since we don't have vehicle/customer table hard linked in basic schema, we use text fields in sessions
    
    -- 1. Phoenix Mall (8 Dec 2025) - Completed
    INSERT INTO parking_sessions (
        vehicle_number, vehicle_model, customer_name, location, status, 
        entry_time, exit_time, fee, is_paid, created_at
    ) VALUES (
        'MH 12 AB 1234', 'Toyota Camry', 'Priya Patel', 'Phoenix Mall - Lower Parel', 'Completed',
        '2025-12-08 14:00:00', '2025-12-08 18:15:00', 180, true, '2025-12-08 14:00:00'
    );

    -- 2. Central Plaza (5 Dec 2025) - Completed
    INSERT INTO parking_sessions (
        vehicle_number, vehicle_model, customer_name, location, status,
        entry_time, exit_time, fee, is_paid, created_at
    ) VALUES (
        'MH 14 CD 5678', 'Honda Civic', 'Priya Patel', 'Central Plaza', 'Completed',
        '2025-12-05 10:00:00', '2025-12-05 12:50:00', 120, true, '2025-12-05 10:00:00'
    );

    -- 3. City Center Mall (3 Dec 2025) - Completed
    INSERT INTO parking_sessions (
        vehicle_number, vehicle_model, customer_name, location, status,
        entry_time, exit_time, fee, is_paid, created_at
    ) VALUES (
        'MH 12 AB 1234', 'Toyota Camry', 'Priya Patel', 'City Center Mall', 'Completed',
        '2025-12-03 16:30:00', '2025-12-03 21:00:00', 200, true, '2025-12-03 16:30:00'
    );

END $$;
