import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const checkAuth = () => {
            try {
                const storedToken = localStorage.getItem('authToken');
                const storedUser = localStorage.getItem('authUser');

                if (storedToken && storedUser) {
                    setAuth({
                        isAuthenticated: true,
                        user: JSON.parse(storedUser),
                        token: storedToken,
                        loading: false,
                        error: null,
                    });
                } else {
                    setAuth((prev) => ({ ...prev, loading: false }));
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setAuth((prev) => ({ ...prev, loading: false }));
            }
        };

        checkAuth();
    }, []);

    const signup = async (name, email, password, role) => {
        try {
            setAuth((prev) => ({ ...prev, loading: true, error: null }));

            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Signup failed');
            }

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('authUser', JSON.stringify(data.user));

            setAuth({
                isAuthenticated: true,
                user: data.user,
                token: data.token,
                loading: false,
                error: null,
            });

            return { success: true, user: data.user };
        } catch (error) {
            const errorMsg = error.message || 'Signup failed';
            setAuth((prev) => ({ ...prev, loading: false, error: errorMsg }));
            return { success: false, error: errorMsg };
        }
    };

    const login = async (email, password) => {
        try {
            setAuth((prev) => ({ ...prev, loading: true, error: null }));

            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('authUser', JSON.stringify(data.user));

            setAuth({
                isAuthenticated: true,
                user: data.user,
                token: data.token,
                loading: false,
                error: null,
            });

            return { success: true, user: data.user };
        } catch (error) {
            const errorMsg = error.message || 'Login failed';
            setAuth((prev) => ({ ...prev, loading: false, error: errorMsg }));
            return { success: false, error: errorMsg };
        }
    };

    const logout = async () => {
        try {
            await fetch(`${API_URL}/api/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`,
                },
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');

            setAuth({
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false,
                error: null,
            });
        }
    };

    const hasRole = (roles) => {
        if (!auth.user) return false;
        if (!Array.isArray(roles)) {
            return auth.user.role === roles;
        }
        return roles.includes(auth.user.role);
    };

    const value = {
        ...auth,
        signup,
        login,
        logout,
        hasRole,
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
