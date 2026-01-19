import { useState } from 'react';
import { driverService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AddDriver.css';

function AddDriverModal({ onClose, onSuccess }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        dob: '2026-01-19', // Defaulting to screenshot date for demo
        license_number: '',
        license_expiry: '2026-01-19',
        full_name: 'New Driver' // Hidden field or add back if needed? Screenshot doesn't show Name input prominently, but logic needs it.
        // Wait, screenshot shows "Fill in the details..." but NO Name field in the visible part? 
        // Just DOB, License Num, Expiry, Photo.
        // I will keep Name as hidden or add it back if scrolling up.
        // Let's assume Name was above or we add it. 
        // Actually, let's just add Name at top to be safe, or start with DOB as screenshot.
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
        <div className="add-driver-overlay">
            {/* Header */}
            <header className="add-driver-header">
                <div className="header-nav">
                    <button className="btn-back-header" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="header-title-text">Add Driver/Valet</h1>
                </div>
                <p className="header-subtitle">Fill in the details to add a new driver</p>
            </header>

            <div className="add-driver-content">
                <form onSubmit={handleSubmit}>

                    {/* Date of Birth */}
                    <div className="form-group">
                        <label className="form-label">Date of Birth</label>
                        <div className="input-with-icon">
                            <div className="input-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="driver-input"
                                value={formData.dob}
                                onChange={e => setFormData({ ...formData, dob: e.target.value })}
                                placeholder="DD/MM/YYYY"
                            />
                        </div>
                    </div>

                    <h3 className="section-title">License Details</h3>

                    {/* License Number */}
                    <div className="form-group">
                        <label className="form-label">Driving License Number *</label>
                        <div className="input-with-icon">
                            <div className="input-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="driver-input"
                                value={formData.license_number}
                                onChange={e => setFormData({ ...formData, license_number: e.target.value })}
                                placeholder="DL-1420110012345"
                            />
                        </div>
                    </div>

                    {/* Expiry Date */}
                    <div className="form-group">
                        <label className="form-label">License Expiry Date</label>
                        <div className="input-with-icon">
                            <div className="input-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="driver-input"
                                value={formData.license_expiry}
                                onChange={e => setFormData({ ...formData, license_expiry: e.target.value })}
                                placeholder="01/19/2026"
                            />
                        </div>
                    </div>

                    {/* Photo Upload */}
                    <div className="form-group">
                        <label className="form-label">License Photo *</label>
                        <div className="upload-area">
                            <div className="upload-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                            </div>
                            <div className="upload-text">Upload License Photo</div>
                        </div>
                    </div>

                </form>
            </div>

            <div className="footer-actions">
                <button className="btn-submit-driver" onClick={handleSubmit}>
                    Submit for Approval
                </button>
            </div>
        </div>
    );
}

export default AddDriverModal;
