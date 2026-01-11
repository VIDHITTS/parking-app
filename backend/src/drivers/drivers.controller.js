import supabase from '../shared/config/supabase.config.js';

// --- ACTIVE DRIVERS ---

export const getAllDrivers = async (req, res) => {
    try {
        const { site_id } = req.query;
        let query = supabase.from('drivers').select('*').order('created_at', { ascending: false });

        if (site_id) {
            query = query.eq('site_id', site_id);
        }

        const { data, error } = await query;
        if (error) throw error;

        res.json({ drivers: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addDriver = async (req, res) => {
    // Direct add (Legacy/Fast-track)
    try {
        const { name, phone, site_id } = req.body;
        const { data, error } = await supabase
            .from('drivers')
            .insert([{ name, phone, site_id, status: 'active' }])
            .select();

        if (error) throw error;
        res.status(201).json({ message: 'Driver added', driver: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- APPROVAL WORKFLOW ---

export const requestApproval = async (req, res) => {
    try {
        const { full_name, phone, license_number, submitted_by } = req.body;

        const { data, error } = await supabase
            .from('pending_drivers')
            .insert([{ full_name, phone, license_number, submitted_by, status: 'pending' }])
            .select()
            .single();

        if (error) throw error;

        // Log activity
        await supabase.from('activity_logs').insert([{
            user_id: submitted_by,
            action: 'DRIVER_REQUEST_SUBMITTED',
            details: { driver_name: full_name }
        }]);

        res.status(201).json({ message: 'Approval requested', application: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPendingDrivers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('pending_drivers')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json({ pending_drivers: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const approveDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const { reviewed_by } = req.body;

        // 1. Get pending details
        const { data: pending, error: fetchError } = await supabase
            .from('pending_drivers')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !pending) throw new Error('Application not found');

        // 2. Update status to approved
        const { error: updateError } = await supabase
            .from('pending_drivers')
            .update({ status: 'approved', reviewed_by, updated_at: new Date() })
            .eq('id', id);

        if (updateError) throw updateError;

        // 3. Create actual driver record
        const { error: insertError } = await supabase
            .from('drivers')
            .insert([{
                name: pending.full_name,
                phone: pending.phone,
                status: 'active'
                // site_id: pending.site_id // If we captured it
            }]);

        if (insertError) throw insertError;

        // 4. Log
        await supabase.from('activity_logs').insert([{
            user_id: reviewed_by,
            action: 'DRIVER_APPROVED',
            details: { driver_name: pending.full_name, pending_id: id }
        }]);

        res.json({ message: 'Driver approved and activated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const rejectDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const { reviewed_by, review_notes } = req.body;

        const { error } = await supabase
            .from('pending_drivers')
            .update({ status: 'rejected', reviewed_by, review_notes, updated_at: new Date() })
            .eq('id', id);

        if (error) throw error;

        await supabase.from('activity_logs').insert([{
            user_id: reviewed_by,
            action: 'DRIVER_REJECTED',
            details: { pending_id: id, reason: review_notes }
        }]);

        res.json({ message: 'Driver application rejected' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
