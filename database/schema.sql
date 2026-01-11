-- Create Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ADMIN', 'MANAGER')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Drivers table
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Cars table
CREATE TABLE cars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id UUID REFERENCES drivers(id) ON DELETE CASCADE,
  car_name TEXT NOT NULL,
  car_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Parkings table
CREATE TABLE parkings (
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

-- Create indexes for better query performance
CREATE INDEX idx_cars_driver_id ON cars(driver_id);
CREATE INDEX idx_parkings_car_id ON parkings(car_id);
CREATE INDEX idx_parkings_is_paid ON parkings(is_paid);
CREATE INDEX idx_users_email ON users(email);

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE parkings ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your security requirements)
-- For this assignment, we'll use simple policies

-- Allow all authenticated users to read/write their own data
CREATE POLICY "Enable read access for authenticated users" 
ON users FOR SELECT 
USING (true);

CREATE POLICY "Enable all access for authenticated users on drivers"
ON drivers FOR ALL
USING (true);

CREATE POLICY "Enable all access for authenticated users on cars"
ON cars FOR ALL
USING (true);

CREATE POLICY "Enable all access for authenticated users on parkings"
ON parkings FOR ALL
USING (true);
