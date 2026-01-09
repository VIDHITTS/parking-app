import supabase from '../shared/config/supabase.config.js';

export const getInsights = async (req, res) => {
    try {
        const { data: paidParkings, error: paidError } = await supabase
            .from('parkings')
            .select('fee')
            .eq('is_paid', true);

        if (paidError) {
            return res.status(500).json({ error: paidError.message });
        }

        const totalCollection = paidParkings.reduce((sum, p) => sum + (p.fee || 0), 0);

        const { count: totalCars, error: carsError } = await supabase
            .from('cars')
            .select('*', { count: 'exact', head: true });

        if (carsError) {
            return res.status(500).json({ error: carsError.message });
        }

        const { count: activeParkings, error: activeError } = await supabase
            .from('parkings')
            .select('*', { count: 'exact', head: true })
            .eq('is_paid', false);

        if (activeError) {
            return res.status(500).json({ error: activeError.message });
        }

        const { count: totalParkings, error: totalError } = await supabase
            .from('parkings')
            .select('*', { count: 'exact', head: true });

        if (totalError) {
            return res.status(500).json({ error: totalError.message });
        }

        res.json({
            totalCollection: totalCollection || 0,
            totalCars: totalCars || 0,
            activeParkings: activeParkings || 0,
            totalParkings: totalParkings || 0,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
