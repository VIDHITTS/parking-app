import supabase from '../shared/config/supabase.config.js';

export const createParking = async (req, res) => {
    try {
        const { car_id, location, city, parking_date, duration_minutes, fee } = req.body;

        if (!car_id || !location || !city || !parking_date || !duration_minutes || !fee) {
            return res.status(400).json({
                error: 'All fields are required: car_id, location, city, parking_date, duration_minutes, fee',
            });
        }

        const { data: car, error: carError } = await supabase
            .from('cars')
            .select('id')
            .eq('id', car_id)
            .single();

        if (carError || !car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        const { data, error } = await supabase
            .from('parkings')
            .insert([
                {
                    car_id,
                    location,
                    city,
                    parking_date,
                    duration_minutes,
                    fee,
                    is_paid: false,
                },
            ])
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({
            message: 'Parking entry created successfully',
            parking: data[0],
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllParkings = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('parkings')
            .select(
                '*, cars(car_name, car_number, drivers(name, phone))'
            )
            .order('created_at', { ascending: false });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({ parkings: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getParkingsByCarId = async (req, res) => {
    try {
        const { car_id } = req.params;

        const { data, error } = await supabase
            .from('parkings')
            .select('*')
            .eq('car_id', car_id)
            .order('created_at', { ascending: false });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({ parkings: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const markParkingAsPaid = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('parkings')
            .update({ is_paid: true })
            .eq('id', id)
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: 'Parking not found' });
        }

        res.json({
            message: 'Parking marked as paid',
            parking: data[0],
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getParkingById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('parkings')
            .select('*, cars(car_name, car_number, drivers(name, phone))')
            .eq('id', id)
            .single();

        if (error) {
            return res.status(404).json({ error: 'Parking not found' });
        }

        res.json({ parking: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteParking = async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from('parkings')
            .delete()
            .eq('id', id);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({ message: 'Parking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
