import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { motion } from 'framer-motion';

const MyBids = () => {
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all'); // all, pending, hired, rejected

    useEffect(() => {
        fetchMyBids();
    }, []);

    const fetchMyBids = async () => {
        try {
            const { data } = await api.get('/bids/my-bids');
            setBids(data.bids);
        } catch (err) {
            setError('Failed to fetch your bids');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'hired':
                return 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
            case 'rejected':
                return 'bg-red-950/40 text-red-400 border border-red-500/30';
            default:
                return 'bg-amber-950/40 text-amber-400 border border-amber-500/30';
        }
    };

    const filteredBids = bids.filter(bid => {
        if (filter === 'all') return true;
        return bid.status === filter;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-grid-pattern">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                </div>
                <p className="text-slate-400 uppercase tracking-widest text-sm mt-6 font-semibold">Loading your bids...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-grid-pattern relative">
            {/* spacer for navbar */}
            <div className="h-40"></div>

            <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10 flex flex-col gap-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-0 text-center"
                >
                    <h1 className="text-6xl md:text-8xl font-black mb-6 text-white leading-tight tracking-widest">
                        My <span className="gradient-text text-shadow-glow">Bids</span>
                    </h1>
                    <p className="text-slate-300 text-2xl font-light tracking-widest mt-6">Track your submitted bids and their status</p>
                </motion.div>

                { }
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-6 mb-8 justify-center"
                >
                    {['all', 'pending', 'hired', 'rejected'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${filter === status
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-blue-500/40'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </motion.div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl mb-6 flex items-center gap-3"
                    >
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">{error}</span>
                    </motion.div>
                )}

                {filteredBids.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 flex flex-col items-center gap-10"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-2">
                            <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                {filter === 'all' ? "You haven't submitted any bids yet" : `No ${filter} bids`}
                            </h3>
                            <p className="text-slate-400 font-light text-lg">
                                {filter === 'all' ? 'Start browsing gigs and submit your first bid' : `You don't have any ${filter} bids at the moment`}
                            </p>
                        </div>
                        {filter === 'all' && (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/browse"
                                    className="btn-primary inline-block px-8 py-4 text-lg"
                                >
                                    Browse Gigs →
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {filteredBids.map((bid, index) => (
                            <motion.div
                                key={bid._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="glass-card p-6 relative overflow-hidden group"
                            >
                                { }
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </div>

                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {bid.gigId?.title || 'Gig Deleted'}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusColor(bid.status)}`}>
                                                {bid.status}
                                            </span>
                                        </div>
                                        {bid.gigId && (
                                            <p className="text-slate-500 text-sm mb-3 font-light">
                                                Budget: ${bid.gigId.budget} • Status: {bid.gigId.status}
                                            </p>
                                        )}
                                        <div className="bg-black/30 rounded-lg p-4 mb-4 border border-white/10 backdrop-blur-sm">
                                            <p className="text-slate-300 leading-relaxed font-light">{bid.message}</p>
                                        </div>
                                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold text-xl font-mono">Your Bid: ${bid.price}</p>
                                    </div>
                                    {bid.gigId && (
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Link
                                                to={`/gigs/${bid.gigId._id}`}
                                                className="btn-primary px-5 py-2.5"
                                            >
                                                View Gig →
                                            </Link>
                                        </motion.div>
                                    )}
                                </div>
                                {bid.status === 'hired' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mt-4 flex items-center gap-3"
                                    >
                                        <span className="text-3xl">🎉</span>
                                        <p className="text-emerald-400 font-semibold">Congratulations! You've been hired for this project!</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBids;
