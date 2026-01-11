import { useState, useEffect } from 'react';
import { parkingService } from '../services/api';

function Home() {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParkings();
  }, []);

  const fetchParkings = async () => {
    try {
      const response = await parkingService.getAllParkings();
      setParkings(response.data.parkings.slice(0, 5));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="hero-header">
        <h1>Smart Parking</h1>
        <div className="subtitle">Welcome back!</div>
        <div style={{ marginTop: '12px' }}>
          <div className="hero-badge">
            🏆 #1 IN INDIA
          </div>
          <div className="hero-title">Premium Parking Solution</div>
          <div className="hero-desc">Trusted by 1M+ users nationwide</div>
        </div>
      </div>

      <div className="scan-card">
        <div className="scan-icon">
          <span>📱</span>
        </div>
        <div className="scan-content">
          <h3>Scan to Park</h3>
          <p>Scan QR code at parking entrance</p>
        </div>
        <div style={{ fontSize: '20px', color: '#9ca3af' }}>›</div>
      </div>

      <div className="content-area">
        <h2 className="section-title">Recent Parking</h2>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : parkings.length === 0 ? (
          <div className="empty-state">
            <p>No parking records yet</p>
          </div>
        ) : (
          <div>
            {parkings.map((parking) => (
              <div key={parking.id} className="parking-card">
                <div className="parking-header">
                  <div>
                    <h3>{parking.location}</h3>
                    <div className="parking-location">
                      <span>📍</span>
                      <span>{parking.city}</span>
                    </div>
                  </div>
                  <div className="price">₹{parking.fee}</div>
                </div>

                <div className="parking-details">
                  <div>
                    <span>🕒</span>
                    <span>{new Date(parking.parking_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div>
                    <span>🚗</span>
                    <span>{parking.cars?.car_number || 'N/A'}</span>
                  </div>
                  <div>
                    <span>{parking.duration_minutes}m</span>
                  </div>
                </div>

                <div style={{ marginTop: '12px' }}>
                  <span className={parking.is_paid ? 'badge-completed' : 'badge-pending'}>
                    {parking.is_paid ? 'completed' : 'pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
