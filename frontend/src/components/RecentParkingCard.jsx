function RecentParkingCard({ parking }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="parking-card">
      <div className="parking-card-header">
        <div className="parking-location">
          <h3 className="location-name">{parking.location}</h3>
          <p className="location-city">{parking.city}</p>
        </div>
        <span className={`badge ${parking.is_paid ? 'badge-success' : 'badge-warning'}`}>
          {parking.is_paid ? 'Paid' : 'Pending'}
        </span>
      </div>

      <div className="parking-details">
        <div className="detail-item">
          <span className="detail-label">Car Number</span>
          <span className="detail-value">{parking.cars?.car_number || 'N/A'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Duration</span>
          <span className="detail-value">{parking.duration_minutes} mins</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Fee</span>
          <span className="detail-value fee-amount">₹{parking.fee}</span>
        </div>
      </div>

      <div className="parking-card-footer">
        <span className="parking-date">{formatDate(parking.parking_date)}</span>
      </div>
    </div>
  );
}

export default RecentParkingCard;
