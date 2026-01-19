import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/UserScanner.css';

function UserScanner() {
    const { user } = useAuth();
    const [showScanner, setShowScanner] = useState(false); // Controls Overlay
    const [step, setStep] = useState('scan'); // 'scan' | 'select-vehicle' | 'success'
    const [recents, setRecents] = useState([]);
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    // Demo vehicles for selection
    const myVehicles = [
        { id: 1, model: 'Toyota Camry', plate: 'MH 12 AB 1234' },
        { id: 2, model: 'Honda Civic', plate: 'MH 14 CD 5678' }
    ];

    useEffect(() => {
        fetchRecents();
        return () => {
            stopCamera();
        };
    }, []);

    const fetchRecents = async () => {
        try {
            const res = await parkingService.getAllParkings();
            if (res.data?.parkings && res.data.parkings.length > 0) {
                setRecents(res.data.parkings.slice(0, 3)); // Top 3
            } else {
                throw new Error("No data");
            }
        } catch (err) {
            // Demo Data matching Screenshot 1
            setRecents([
                {
                    id: 1,
                    location: 'Phoenix Mall',
                    address: 'Lower Parel, Mumbai',
                    fee: 180,
                    parking_date: '2025-12-08',
                    vehicle_number: 'MH 12 AB 1234',
                    status: 'completed',
                    duration: '4h 15m'
                },
                {
                    id: 2,
                    location: 'Central Plaza',
                    address: 'Andheri West, Mumbai',
                    fee: 120,
                    parking_date: '2025-12-05',
                    vehicle_number: 'MH 14 CD 5678',
                    status: 'completed',
                    duration: '2h 50m'
                }
            ]);
        }
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access denied:", err);
            // Fallback or show error? For now, we proceed with simulation
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    const startScan = () => {
        setShowScanner(true);
        setStep('scan');
        startCamera();

        // Simulate QR detection
        setTimeout(() => {
            // Check if still scanning before updating state
            setStep((prev) => {
                if (prev === 'scan') return 'select-vehicle';
                return prev;
            });
            stopCamera(); // Stop camera when QR detected
        }, 3000);
    };

    const closeScanner = () => {
        stopCamera();
        setShowScanner(false);
        setStep('scan');
    };

    return (
        <div className="scanner-container">
            {/* Home Header */}
            <header className="scanner-header">
                <p className="home-title">Welcome back!</p>
                <h1 className="home-title" style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '0' }}>{user?.name || 'John Doe'}</h1>

                <div className="promo-banner">
                    <div className="promo-text">
                        <div className="promo-title">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fcd34d" stroke="none">
                                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                <path d="M4 22h16" />
                                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                <path d="M18 2h-6c-1.1 0-2 .89-2 2v7h10V4c0-1.11-.9-2-2-2z" />
                            </svg>
                            #1 IN INDIA
                        </div>
                        <p className="promo-desc">Premium Parking Solution</p>
                    </div>
                    {/* Car Image Placeholder */}
                    <svg className="promo-car" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                        <path d="M14 16H9m10 0h3v-3.15M17 16v3.6c0 .5-.4 1-1 1H6a1 1 0 0 1-1-1v-3.6H2V6h3v2.6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h3v7h-2" />
                    </svg>
                </div>
            </header>

            {/* Main Action Card */}
            <div className="action-card-container">
                <div className="scan-card" onClick={startScan}>
                    <div className="scan-text">
                        <h3>Scan to Park</h3>
                        <p>Scan QR code at parking entrance</p>
                    </div>
                    <div className="scan-icon-box">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                            <rect x="7" y="7" width="10" height="10" rx="1" />
                            <path d="M10 10h4" />
                            <path d="M10 14h4" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Recent Parking */}
            <div className="recent-section">
                <h2 className="section-title">Recent Parking</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {recents.map(record => (
                        <div key={record.id} style={{ background: 'white', padding: '16px', borderRadius: '16px', border: '1px solid #f3f4f6' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600', color: '#1f2937' }}>{record.location}</span>
                                <span style={{ fontWeight: '600', color: '#1f2937' }}>₹{record.fee}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                {record.address || 'Mumbai'}
                                <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '11px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '8px', marginLeft: 'auto' }}>
                                    {record.status || 'completed'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#4b5563' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    {new Date(record.parking_date).toLocaleDateString()}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="8" width="18" height="10" rx="2" />
                                        <circle cx="7" cy="15" r="1.5" />
                                        <circle cx="17" cy="15" r="1.5" />
                                    </svg>
                                    {record.vehicle_number}
                                </div>
                                {record.duration && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        {record.duration}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scan Overlay */}
            {showScanner && (
                <div className="scan-overlay">
                    {/* Camera Feed */}
                    {step === 'scan' && (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="video-feed"
                        />
                    )}

                    <div className="overlay-header">
                        <span style={{ fontSize: '18px', fontWeight: '500' }}>Scan QR Code</span>
                        <button className="btn-close" onClick={closeScanner}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    <div className="scan-frame-area">
                        {step === 'scan' ? (
                            <>
                                <div className="scan-frame">
                                    <div className="scan-corner top-left"></div>
                                    <div className="scan-corner top-right"></div>
                                    <div className="scan-corner bottom-left"></div>
                                    <div className="scan-corner bottom-right"></div>

                                    {/* Scanning Animation Line */}
                                    <div style={{
                                        position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#6366f1',
                                        boxShadow: '0 0 10px #6366f1', animation: 'scanLine 2s infinite linear'
                                    }}></div>
                                    <style>{`@keyframes scanLine { 0% { top: 10% } 50% { top: 90% } 100% { top: 10% } }`}</style>
                                </div>
                                <div className="scan-status">
                                    <p>Align QR Code within frame</p>
                                </div>
                            </>
                        ) : (
                            // Select Vehicle Step
                            <div style={{ width: '100%' }}>
                                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                    <div style={{ color: '#10b981', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                        QR Code Detected!
                                    </div>
                                    <div style={{ color: '#9ca3af', fontSize: '14px', marginTop: '4px' }}>Inorbit Mall</div>
                                </div>

                                <div className="vehicle-sheet">
                                    <div className="sheet-handle"></div>
                                    <h3 className="sheet-title">Select Your Vehicle</h3>
                                    <p className="sheet-subtitle">Choose which vehicle you're parking at Inorbit Mall</p>

                                    <div className="vehicle-select-list">
                                        {myVehicles.map(v => (
                                            <div key={v.id} className="vehicle-option">
                                                <div className="vehicle-icon">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <rect x="3" y="8" width="18" height="10" rx="2" />
                                                        <circle cx="7" cy="15" r="1.5" />
                                                        <circle cx="17" cy="15" r="1.5" />
                                                    </svg>
                                                </div>
                                                <div className="vehicle-info">
                                                    <h4>{v.model}</h4>
                                                    <p>{v.plate}</p>
                                                </div>
                                                <svg style={{ marginLeft: 'auto', color: '#9ca3af' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="9 18 15 12 9 6" />
                                                </svg>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="btn-register-new">
                                        Register New Vehicle
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserScanner;
