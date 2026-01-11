-- IMPORTANT: Run this in Supabase SQL Editor to fix signup

-- Drop existing restrictive policy on users
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON users;

-- Allow anyone to insert new users (for signup)
CREATE POLICY "Allow public signup"
ON users FOR INSERT
WITH CHECK (true);

-- Allow users to read all user data
CREATE POLICY "Allow read access"
ON users FOR SELECT
USING (true);
