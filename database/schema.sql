-- Create Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ADMIN', 'MANAGER')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Drivers table
CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT DEFAULT 'Available' CHECK (status IN ('Available', 'Busy', 'Offline')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Cars table (Original)
CREATE TABLE IF NOT EXISTS cars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id UUID REFERENCES drivers(id) ON DELETE CASCADE,
  car_name TEXT NOT NULL,
  car_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Parkings table (Original)
CREATE TABLE IF NOT EXISTS parkings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  parking_date DATE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  fee NUMERIC(10, 2) NOT NULL,
  is_paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- NEW PARKING SESSIONS (Friend 2 Workflow)
-- ==========================================

-- Create Parking Sessions table
CREATE TABLE IF NOT EXISTS parking_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Vehicle Details
  vehicle_number TEXT NOT NULL,
  vehicle_model TEXT,
  customer_name TEXT,
  customer_phone TEXT,

  -- Operations
  status TEXT NOT NULL DEFAULT 'Parked' CHECK (status IN ('Parked', 'Retrieving', 'Completed')),
  valet_id UUID REFERENCES drivers(id),
  
  -- Location & Time
  location TEXT DEFAULT 'Main Garage',
  entry_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  exit_time TIMESTAMP WITH TIME ZONE,
  
  -- Financials
  fee NUMERIC(10, 2) DEFAULT 0,
  is_paid BOOLEAN DEFAULT FALSE,
  payment_method TEXT CHECK (payment_method IN ('Cash', 'UPI', 'Card')),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_parking_status ON parking_sessions(status);
CREATE INDEX IF NOT EXISTS idx_parking_vehicle ON parking_sessions(vehicle_number);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE parkings ENABLE ROW LEVEL SECURITY;
ALTER TABLE parking_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for authenticated users" ON users FOR ALL USING (true);
CREATE POLICY "Enable all access for authenticated users" ON drivers FOR ALL USING (true);
CREATE POLICY "Enable all access for authenticated users" ON cars FOR ALL USING (true);
CREATE POLICY "Enable all access for authenticated users" ON parkings FOR ALL USING (true);
CREATE POLICY "Enable all access for authenticated users" ON parking_sessions FOR ALL USING (true);
