import supabase from '../services/supabase.js';

export const addCar = async (req, res) => {
    try {
        const { driver_id, car_name, car_number } = req.body;

        if (!driver_id || !car_name || !car_number) {
            return res.status(400).json({
                error: 'Driver ID, car name, and car number are required',
            });
        }

        const { data: driver, error: driverError } = await supabase
            .from('drivers')
            .select('id')
            .eq('id', driver_id)
            .single();

        if (driverError || !driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }

        const { data, error } = await supabase
            .from('cars')
            .insert([{ driver_id, car_name, car_number }])
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({
            message: 'Car added successfully',
            car: data[0],
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCarsByDriver = async (req, res) => {
    try {
        const { driver_id } = req.query;

        if (!driver_id) {
            return res.status(400).json({ error: 'Driver ID is required' });
        }

        const { data, error } = await supabase
            .from('cars')
            .select('*')
            .eq('driver_id', driver_id)
            .order('created_at', { ascending: false });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({ cars: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllCars = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('cars')
            .select('*, drivers(name, phone)')
            .order('created_at', { ascending: false });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({ cars: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCarById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('cars')
            .select('*, drivers(name, phone)')
            .eq('id', id)
            .single();

        if (error) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.json({ car: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
