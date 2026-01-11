-- Create Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ADMIN', 'MANAGER')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Drivers (Valets) table
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT DEFAULT 'Available' CHECK (status IN ('Available', 'Busy', 'Offline')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Parking Sessions table (Replacing old 'parkings' and 'cars' strict link)
CREATE TABLE parking_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Vehicle Details (Directly stored for speed)
  vehicle_number TEXT NOT NULL,
  vehicle_model TEXT,
  customer_name TEXT,
  customer_phone TEXT,

  -- Operations
  status TEXT NOT NULL DEFAULT 'Parked' CHECK (status IN ('Parked', 'Retrieving', 'Completed')),
  valet_id UUID REFERENCES drivers(id), -- Who parked it
  
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
CREATE INDEX idx_parking_status ON parking_sessions(status);
CREATE INDEX idx_parking_vehicle ON parking_sessions(vehicle_number);
CREATE INDEX idx_parking_valet ON parking_sessions(valet_id);
