import bcrypt from 'bcrypt';
import supabase from '../shared/config/supabase.config.js';
import { generateToken } from '../shared/middleware/auth.middleware.js';

const SALT_ROUNDS = 10;

const ROLE_PASSWORDS = {
    SUPER_ADMIN: 'admin123', // Keeping same password for simplicity
    MANAGER: 'manager123',
};

export const signup = async (req, res) => {
    try {
        const { name, email, role, password } = req.body;

        if (!name || !email || !role || !password) {
            return res.status(400).json({
                error: 'Missing required fields: name, email, role, password',
            });
        }

        const validRoles = ['SUPER_ADMIN', 'MANAGER', 'USER'];
        // Supporting 'ADMIN' for backward compatibility if needed, but primary is SUPER_ADMIN
        if (!validRoles.includes(role.toUpperCase()) && role.toUpperCase() !== 'ADMIN') {
            return res.status(400).json({
                error: 'Invalid role. Must be SUPER_ADMIN, MANAGER or USER',
            });
        }

        let upperRole = role.toUpperCase();
        if (upperRole === 'ADMIN') upperRole = 'SUPER_ADMIN'; // Auto-migrate

        // Only checking strict passwords for Admin/Manager to prevent unauthorized elevation
        if (upperRole !== 'USER' && password !== ROLE_PASSWORDS[upperRole]) {
            return res.status(400).json({
                error: `Invalid password for ${upperRole} role`,
            });
        }

        const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select('email')
            .eq('email', email.toLowerCase())
            .single();

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists with this email' });
        }

        if (checkError && checkError.code !== 'PGRST116') {
            return res.status(500).json({ error: 'Database error' });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const { data: user, error: createError } = await supabase
            .from('users')
            .insert([
                {
                    name,
                    email: email.toLowerCase(),
                    password_hash: passwordHash,
                    role: upperRole,
                },
            ])
            .select();

        if (createError) {
            return res.status(500).json({ error: 'Failed to create user' });
        }

        const newUser = user[0];
        const token = generateToken(newUser);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email.toLowerCase())
            .single();

        if (!user || error) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed - server error' });
    }
};

export const logout = async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        res.json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
