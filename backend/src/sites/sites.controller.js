import supabase from '../shared/config/supabase.config.js';

export const getAllSites = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('sites')
            .select('*')
            .order('name');

        if (error) throw error;
        res.json({ sites: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createSite = async (req, res) => {
    try {
        const { name, location, image_url } = req.body;
        if (!name || !location) {
            return res.status(400).json({ error: 'Name and location are required' });
        }

        const { data, error } = await supabase
            .from('sites')
            .insert([{ name, location, image_url, is_active: true }])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json({ site: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const toggleSiteStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_active } = req.body;

        const { data, error } = await supabase
            .from('sites')
            .update({ is_active })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        res.json({ site: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
