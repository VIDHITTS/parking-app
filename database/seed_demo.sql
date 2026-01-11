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

-- 1. Sites
INSERT INTO sites (name, location, image_url, is_active) VALUES 
('Downtown Plaza', 'City Center, District 1', 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?auto=format&fit=crop&q=80', true),
('Airport Terminal 1', 'International Airport', 'https://images.unsplash.com/photo-1590674899505-1c5c41951f89?auto=format&fit=crop&q=80', true)
ON CONFLICT DO NOTHING;

-- 2. Users (Custom Auth Table)
INSERT INTO users (name, email, role, password_hash) VALUES
('Super Admin', 'superadmin@test.com', 'SUPER_ADMIN', crypt('superadmin@123', gen_salt('bf'))),
('Site Manager 1', 'manager@test.com', 'MANAGER', crypt('manager@123', gen_salt('bf'))),
('Valet Driver 1', 'driver@test.com', 'DRIVER', crypt('driver@123', gen_salt('bf'))),
('Regular User', 'user@test.com', 'USER', crypt('user@123', gen_salt('bf')))
ON CONFLICT (email) 
DO UPDATE SET 
    role = EXCLUDED.role, 
    password_hash = EXCLUDED.password_hash;

-- 3. Drivers (Linked to Sites)
DO $$
DECLARE
    v_site_id UUID;
BEGIN
    SELECT id INTO v_site_id FROM sites WHERE name = 'Downtown Plaza' LIMIT 1;
    
    INSERT INTO drivers (name, phone, site_id, status)
    VALUES 
    ('John Valet', '9988776655', v_site_id, 'active'),
    ('Mike Parker', '1122334455', v_site_id, 'active')
    ON CONFLICT DO NOTHING;
END $$;

-- 4. Pending Driver (For Approval Demo)
INSERT INTO pending_drivers (full_name, phone, license_number, status, submitted_by)
VALUES 
('Pending Pete', '555-0199', 'DL-PENDING-99', 'pending', (SELECT id FROM users WHERE email = 'manager@test.com'))
ON CONFLICT DO NOTHING;
