import supabase from '../shared/config/supabase.config.js';

// Get generic stats for dashboard
export const getStats = async (req, res) => {
    try {
        // Active Sessions (Parked)
        const { count: activeCount } = await supabase
            .from('parking_sessions')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'Parked');

        // Retrieving Sessions
        const { count: retrievingCount } = await supabase
            .from('parking_sessions')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'Retrieving');

        // Revenue (Sum of paid sessions today)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const { data: todayRevenue } = await supabase
            .from('parking_sessions')
            .select('fee')
            .eq('is_paid', true)
            .gte('created_at', today.toISOString());

        const totalRevenue = todayRevenue ? todayRevenue.reduce((sum, item) => sum + (Number(item.fee) || 0), 0) : 0;

        res.json({
            success: true,
            stats: {
                active: activeCount || 0,
                retrieving: retrievingCount || 0, // Using retrieving count as placeholder for "Waitlist" concept
                revenue: totalRevenue
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createSession = async (req, res) => {
    try {
        const { vehicle_number, vehicle_model, customer_name, customer_phone, valet_id, location } = req.body;

        const { data, error } = await supabase
            .from('parking_sessions')
            .insert([
                {
                    vehicle_number,
                    vehicle_model,
                    customer_name,
                    customer_phone,
                    valet_id,
                    location: location || 'Main Garage',
                    status: 'Parked',
                    fee: 100, // Default fee
                    entry_time: new Date().toISOString()
                }
            ])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({ success: true, session: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getAllSessions = async (req, res) => {
    try {
        // Join with drivers to get valet name
        const { data, error } = await supabase
            .from('parking_sessions')
            .select(`
        *,
        drivers!parking_sessions_valet_id_fkey (
          id,
          name,
          phone
        )
      `)
            .order('created_at', { ascending: false });

        // Note: If join fails due to missing FK in Supabase yet, frontend will just show N/A
        if (error) throw error;

        res.json({ success: true, sessions: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'Retrieving' or 'Completed'

        let updateData = { status };
        if (status === 'Completed') {
            updateData.exit_time = new Date().toISOString();
            updateData.is_paid = true;
        }

        const { data, error } = await supabase
            .from('parking_sessions')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        res.json({ success: true, session: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const reassignValet = async (req, res) => {
    try {
        const { id } = req.params;
        const { valet_id } = req.body;

        const { data, error } = await supabase
            .from('parking_sessions')
            .update({ valet_id })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        res.json({ success: true, session: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
