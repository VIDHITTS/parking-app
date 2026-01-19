import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/UserScanner.css';

function UserScanner() {
    const { user } = useAuth();
    const [scanning, setScanning] = useState(false);
    const [scannedData, setScannedData] = useState(null);

    const handleScan = () => {
        setScanning(true);
        // Simulate QR Scan delay
        setTimeout(() => {
            setScanning(false);
            setScannedData({
                ticketId: 'TKT-' + Math.floor(Math.random() * 10000),
                vehicle: 'MH 14 DT 4521',
                model: 'Tata Nexon',
                entryTime: new Date().toLocaleTimeString(),
                status: 'Active'
            });
        }, 2000);
    };

    const reset = () => {
        setScannedData(null);
    };

    if (scannedData) {
        return (
            <div className="scanner-container">
                <div className="scanner-result">
                    <div className="success-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>
                    <h2>Ticket Verified</h2>
                    <p className="status-text">Session Active</p>

                    <div className="ticket-details">
                        <div className="detail-row">
                            <span className="detail-label">VEHICLE NO</span>
                            <span className="detail-value">{scannedData.vehicle}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">MODEL</span>
                            <span className="detail-value">{scannedData.model}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">ENTRY TIME</span>
                            <span className="detail-value">{scannedData.entryTime}</span>
                        </div>
                    </div>

                    <button onClick={reset} className="btn-primary">
                        Scan Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="scanner-container">
            <header className="scanner-header">
                <h1>Welcome, {user?.name}</h1>
                <p>Scan to check your parking status</p>
            </header>

            <div className="scanner-content">
                <h2 className="scan-title">Scan Ticket</h2>

                <button
                    onClick={handleScan}
                    className={`scan-button ${scanning ? 'scanning' : ''}`}
                    disabled={scanning}
                >
                    {scanning ? (
                        <div className="spinner"></div>
                    ) : (
                        <>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                            <span>Scan QR</span>
                        </>
                    )}
                </button>

                <p className="scan-hint">
                    {scanning ? 'Searching database...' : 'Point your camera at the vehicle QR code'}
                </p>
            </div>
        </div>
    );
}

export default UserScanner;
