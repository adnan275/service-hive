import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationToast = () => {
    const { notifications, clearNotification } = useNotification();
    const navigate = useNavigate();

    const handleNotificationClick = (notification) => {
        if (notification.gigId) {
            navigate(`/gigs/${notification.gigId}`);
            clearNotification(notification.id);
        }
    };

    return (
        <div className="fixed top-20 right-4 z-50 space-y-3">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        className="glass-card rounded-xl p-4 shadow-glow-lg max-w-sm cursor-pointer border-l-4 border-success"
                        onClick={() => handleNotificationClick(notification)}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="w-2 h-2 bg-success rounded-full"
                                    />
                                    <h4 className="text-text-primary font-bold flex items-center space-x-1">
                                        <span>🎉</span>
                                        <span>Congratulations!</span>
                                    </h4>
                                </div>
                                <p className="text-text-secondary text-sm mb-2 leading-relaxed">
                                    {notification.message}
                                </p>
                                <p className="text-blue-light text-xs font-semibold flex items-center space-x-1">
                                    <span>Click to view gig</span>
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearNotification(notification.id);
                                }}
                                className="text-text-tertiary hover:text-text-primary ml-4 text-xl"
                            >
                                ✕
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default NotificationToast;
