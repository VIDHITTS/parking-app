import { Link, useLocation } from 'react-router-dom';

function BottomNav() {
    const location = useLocation();

    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
        return null;
    }

    return (
        <nav className="bottom-nav">
            <Link to="/home" className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
            </Link>

            <Link to="/history" className={`nav-item ${location.pathname === '/history' ? 'active' : ''}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>History</span>
            </Link>

            <Link to="/drivers" className={`nav-item ${location.pathname === '/drivers' ? 'active' : ''}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Drivers</span>
            </Link>

            <Link to="/cars" className={`nav-item ${location.pathname === '/cars' ? 'active' : ''}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1h5.586a1 1 0 00.707-.293l1.414-1.414a1 1 0 00.293-.707V10a1 1 0 00-.293-.707L18 7.586A1 1 0 0017.293 7H13" />
                </svg>
                <span>Cars</span>
            </Link>
        </nav>
    );
}

export default BottomNav;
