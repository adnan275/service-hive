import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { motion } from 'framer-motion';

const MyGigs = () => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all'); // all, open, closed

    useEffect(() => {
        fetchMyGigs();
    }, []);

    const fetchMyGigs = async () => {
        try {
            const { data } = await api.get('/gigs/my-gigs');
            setGigs(data.gigs);
        } catch (err) {
            setError('Failed to fetch your gigs');
        } finally {
            setLoading(false);
        }
    };

    const filteredGigs = gigs.filter(gig => {
        if (filter === 'all') return true;
        return gig.status === filter;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-grid-pattern">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                </div>
                <p className="text-slate-400 uppercase tracking-widest text-sm mt-6 font-semibold">Loading your gigs...</p>
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
                    className="flex flex-col justify-center items-center gap-12 text-center"
                >
                    <div>
                        <h1 className="text-6xl md:text-8xl font-black mb-6 text-white leading-tight tracking-widest">
                            My <span className="gradient-text text-shadow-glow">Gigs</span>
                        </h1>
                        <p className="text-slate-300 text-2xl font-light tracking-widest mt-6">Manage your posted jobs</p>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/post-gig"
                            className="btn-primary inline-flex items-center gap-2 px-6 py-3"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Post New Gig</span>
                        </Link>
                    </motion.div>
                </motion.div>

                { }
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-6 mb-8 justify-center"
                >
                    {['all', 'open', 'closed'].map((status) => (
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

                {filteredGigs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 flex flex-col items-center gap-10"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-2">
                            <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                {filter === 'all' ? "You haven't posted any gigs yet" : `No ${filter} gigs`}
                            </h3>
                            <p className="text-slate-400 font-light text-lg">
                                {filter === 'all' ? 'Start by creating your first job posting' : `You don't have any ${filter} gigs at the moment`}
                            </p>
                        </div>
                        {filter === 'all' && (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to="/post-gig"
                                    className="btn-primary inline-block px-8 py-4 text-lg"
                                >
                                    Post Your First Gig →
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {filteredGigs.map((gig, index) => (
                            <motion.div
                                key={gig._id}
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
                                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{gig.title}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${gig.status === 'open'
                                                ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                                                : 'bg-slate-900/50 text-slate-500 border border-slate-700/50'
                                                }`}>
                                                {gig.status}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 mb-4 line-clamp-2 leading-relaxed font-light">{gig.description}</p>
                                        <div className="flex items-center gap-6">
                                            <div>
                                                <span className="text-slate-500 text-xs uppercase tracking-widest font-bold block mb-1">Budget</span>
                                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold text-xl font-mono">${gig.budget}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 md:ml-4">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Link
                                                to={`/gigs/${gig._id}`}
                                                className="btn-secondary px-5 py-2.5 text-center"
                                            >
                                                View Details
                                            </Link>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Link
                                                to={`/gigs/${gig._id}/bids`}
                                                className="btn-primary px-5 py-2.5 text-center"
                                            >
                                                View Bids
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyGigs;
