import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('notifications');
        return saved ? JSON.parse(saved) : [];
    });
    const [notificationHistory, setNotificationHistory] = useState(() => {
        const saved = localStorage.getItem('notificationHistory');
        return saved ? JSON.parse(saved) : [];
    });
    const { user } = useAuth();

    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    useEffect(() => {
        localStorage.setItem('notificationHistory', JSON.stringify(notificationHistory));
    }, [notificationHistory]);

    useEffect(() => {
        if (user) {
            const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001';
            const newSocket = io(SOCKET_URL, {
                withCredentials: true,
            });

            newSocket.on('connect', () => {
                console.log('Socket connected to', SOCKET_URL);
                newSocket.emit('join', user.id);
            });

            newSocket.on('hired', (data) => {
                const notification = {
                    id: Date.now(),
                    ...data,
                    timestamp: new Date().toISOString(),
                    read: false,
                };

                setNotifications((prev) => [notification, ...prev]);

                setNotificationHistory((prev) => [notification, ...prev]);

                setTimeout(() => {
                    setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
                }, 5000);
            });

            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        }
    }, [user]);

    const clearNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const markAsRead = (id) => {
        setNotificationHistory((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const clearHistory = () => {
        setNotificationHistory([]);
        localStorage.removeItem('notificationHistory');
    };

    const value = {
        socket,
        notifications,
        notificationHistory,
        clearNotification,
        markAsRead,
        clearHistory,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
