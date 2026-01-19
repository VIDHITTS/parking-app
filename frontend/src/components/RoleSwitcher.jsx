import { useAuth } from '../contexts/AuthContext';
import '../styles/RoleSwitcher.css';

function RoleSwitcher() {
    const { currentRole, switchRole } = useAuth();

    const roles = [
        {
            key: 'USER', label: 'User', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            )
        },
        {
            key: 'MANAGER', label: 'Manager', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
            )
        },
        {
            key: 'DRIVER', label: 'Driver', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="8" width="18" height="12" rx="2" />
                    <circle cx="7.5" cy="17.5" r="1.5" />
                    <circle cx="16.5" cy="17.5" r="1.5" />
                    <path d="M5 8l2-4h10l2 4" />
                </svg>
            )
        },
        {
            key: 'SUPER_ADMIN', label: 'Super Admin', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L3 7l9 5 9-5-9-5z" />
                    <path d="M3 17l9 5 9-5" />
                    <path d="M3 12l9 5 9-5" />
                </svg>
            )
        },
    ];

    return (
        <div className="role-switcher-container">
            <div className="role-switcher-label">Login As</div>
            <div className="role-switcher-options">
                {roles.map((role) => (
                    <button
                        key={role.key}
                        className={`role-option ${currentRole === role.key ? 'active' : ''}`}
                        onClick={() => switchRole(role.key)}
                    >
                        <div className="role-icon">{role.icon}</div>
                        <span className="role-label">{role.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default RoleSwitcher;
