import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Demo users for each role
const DEMO_USERS = {
    USER: {
        id: 'demo-user-1',
        name: 'Priya Patel',
        email: 'user@demo.com',
        role: 'USER',
    },
    MANAGER: {
        id: 'demo-manager-1',
        name: 'Rajesh Kumar',
        email: 'manager@demo.com',
        role: 'MANAGER',
    },
    DRIVER: {
        id: 'demo-driver-1',
        name: 'Amit Sharma',
        email: 'driver@demo.com',
        role: 'DRIVER',
    },
    SUPER_ADMIN: {
        id: 'demo-admin-1',
        name: 'Super Admin',
        email: 'admin@demo.com',
        role: 'SUPER_ADMIN',
    },
};

export const AuthProvider = ({ children }) => {
    const [currentRole, setCurrentRole] = useState('USER');
    const [user, setUser] = useState(DEMO_USERS.USER);

    const switchRole = (role) => {
        setCurrentRole(role);
        setUser(DEMO_USERS[role]);
    };

    const hasRole = (roles) => {
        if (!Array.isArray(roles)) {
            return user.role === roles;
        }
        return roles.includes(user.role);
    };

    // Dummy functions for compatibility
    const login = async () => ({ success: true });
    const logout = async () => switchRole('USER');
    const signup = async () => ({ success: true });

    const value = {
        isAuthenticated: true,
        user,
        token: 'demo-token',
        loading: false,
        error: null,
        currentRole,
        switchRole,
        hasRole,
        login,
        logout,
        signup,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
