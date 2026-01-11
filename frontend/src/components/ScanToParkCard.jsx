import { useState } from 'react';

function ScanToParkCard() {
  const [scanResult, setScanResult] = useState('');

  const handleScanClick = () => {
    alert('QR Scanner feature - Coming soon!');
  };

  return (
    <div className="scan-card">
      <div className="scan-card-content">
        <h3 className="scan-card-title">Quick Entry</h3>
        <p className="scan-card-description">
          Scan QR code for instant parking registration
        </p>
        <button className="btn btn-primary" onClick={handleScanClick}>
          Scan QR Code
        </button>
        {scanResult && (
          <p className="scan-result">Last scan: {scanResult}</p>
        )}
      </div>
    </div>
  );
}

export default ScanToParkCard;
