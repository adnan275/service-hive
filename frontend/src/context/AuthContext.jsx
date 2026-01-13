import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const { data } = await api.get('/auth/me');
            if (data.success) {
                setUser(data.user);
            }
        } catch (error) {
            console.error('Check auth error:', error);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        const { data } = await api.post('/auth/register', userData);
        if (data.success) {
            localStorage.setItem('token', data.token);
            setUser(data.user);
        }
        return data;
    };

    const login = async (credentials) => {
        const { data } = await api.post('/auth/login', credentials);
        if (data.success) {
            localStorage.setItem('token', data.token);
            setUser(data.user);
        }
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        checkAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
