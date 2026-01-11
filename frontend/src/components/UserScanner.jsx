import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function UserScanner() {
    const { logout } = useAuth();
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
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                <div style={{ background: 'white', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '300px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <div style={{ width: '60px', height: '60px', background: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <span style={{ fontSize: '32px' }}>✅</span>
                    </div>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Ticket Verified</h2>
                    <p style={{ color: '#6b7280', marginBottom: '24px' }}>Session Active</p>

                    <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '16px', marginBottom: '24px', textAlign: 'left' }}>
                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>VEHICLE NO</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{scannedData.vehicle}</div>
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>MODEL</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{scannedData.model}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>ENTRY TIME</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{scannedData.entryTime}</div>
                        </div>
                    </div>

                    <button
                        onClick={reset}
                        className="btn-primary"
                        style={{ width: '100%' }}
                    >
                        Scan Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', position: 'relative' }}>
            <button onClick={logout} className="btn-logout" style={{ position: 'absolute', top: '20px', right: '20px', padding: '0 12px !important' }}>
                ⎋ Logout
            </button>

            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '40px' }}>Scan Ticket</h1>

            <button
                onClick={handleScan}
                style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '40px',
                    background: scanning ? '#e5e7eb' : 'var(--primary-gradient)',
                    border: 'none',
                    boxShadow: scanning ? 'none' : '0 20px 50px rgba(99, 102, 241, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    transform: scanning ? 'scale(0.95)' : 'scale(1)'
                }}
            >
                {scanning ? (
                    <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #9ca3af', borderTopColor: 'transparent' }}></div>
                ) : (
                    <>
                        <span style={{ fontSize: '48px', marginBottom: '12px' }}>📷</span>
                        <span style={{ color: 'white', fontWeight: '600', fontSize: '18px' }}>Scan QR</span>
                    </>
                )}
            </button>

            <p style={{ marginTop: '24px', color: '#6b7280', textAlign: 'center', maxWidth: '280px' }}>
                {scanning ? 'Searching database...' : 'Point your camera at the vehicle QR code'}
            </p>
        </div>
    );
}

export default UserScanner;
