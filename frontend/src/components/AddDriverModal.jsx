import { useState } from 'react';
import { driverService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function AddDriverModal({ onClose, onSuccess }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        license_number: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await driverService.requestApproval({
                ...formData,
                submitted_by: user.id
            });
            alert('Driver Application Submitted for Approval!');
            onSuccess();
            onClose();
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to submit application');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="check-in-modal">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2>Add New Driver</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label>Full Name</label>
                        <input
                            required
                            className="modal-input"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            placeholder="e.g. John Doe"
                        />
                    </div>

                    <div>
                        <label>Phone Number</label>
                        <input
                            required
                            className="modal-input"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                        />
                    </div>

                    <div>
                        <label>License Number</label>
                        <input
                            required
                            className="modal-input"
                            value={formData.license_number}
                            onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                            placeholder="DL-123-4567"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{ marginTop: '10px' }}
                    >
                        {loading ? 'Submitting...' : 'Submit for Approval'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddDriverModal;
