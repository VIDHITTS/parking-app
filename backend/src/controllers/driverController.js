import supabase from '../services/supabase.js';

export const addDriver = async (req, res) => {
    try {
        const { name, phone } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ error: 'Name and phone are required' });
        }

        const { data, error } = await supabase
            .from('drivers')
            .insert([{ name, phone }])
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({
            message: 'Driver added successfully',
            driver: data[0],
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllDrivers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('drivers')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({ drivers: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDriverById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('drivers')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return res.status(404).json({ error: 'Driver not found' });
        }

        res.json({ driver: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
