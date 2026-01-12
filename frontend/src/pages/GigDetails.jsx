import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const GigDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [gig, setGig] = useState(null);
    const [bidData, setBidData] = useState({ message: '', price: '' });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchGig();
    }, [id]);

    const fetchGig = async () => {
        try {
            const { data } = await api.get(`/gigs/${id}`);
            setGig(data.gig);
        } catch (err) {
            setError('Failed to fetch gig details');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitBid = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setSubmitting(true);
        setError('');
        setSuccess('');

        try {
            await api.post('/bids', {
                gigId: id,
                ...bidData,
            });
            setSuccess('Bid submitted successfully!');
            setBidData({ message: '', price: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit bid');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-grid-pattern">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                </div>
                <p className="text-slate-400 uppercase tracking-widest text-sm mt-6 font-semibold">Loading gig details...</p>
            </div>
        );
    }

    if (!gig) {
        return (
            <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Gig not found</h3>
                        <p className="text-slate-400">This gig may have been deleted or doesn't exist</p>
                    </motion.div>
                </div>
            </div>
        );
    }

    const isOwner = user && gig.ownerId._id === user.id;

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* spacer for navbar */}
            <div className="h-32"></div>

            <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-900/20 via-cyan-900/10 to-transparent pointer-events-none animate-pulse-glow" />

            {/* Background elements */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

            {/* Content */}
            <div className="flex justify-center px-4 sm:px-6 lg:px-8 pb-32">
                <div className="w-full max-w-[95%] relative z-10">
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
                        {/* Gig Details Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2 glass-card p-10 md:p-14 relative overflow-hidden group rounded-3xl"
                        >

                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{gig.title}</h1>
                                        <div className="flex items-center gap-3 text-slate-400">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                                                {gig.ownerId.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">{gig.ownerId.name}</p>
                                                <p className="text-sm text-slate-500">Gig Owner</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex-shrink-0 ${gig.status === 'open'
                                        ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                                        : 'bg-slate-900/50 text-slate-500 border border-slate-700/50'
                                        }`}>
                                        {gig.status}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-slate-500 text-xs font-bold mb-3 uppercase tracking-widest">Description</h3>
                                    <div className="bg-black/30 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                                        <p className="text-slate-300 whitespace-pre-wrap leading-relaxed font-light">{gig.description}</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-xl p-6 border border-blue-500/30 relative overflow-hidden group/budget">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover/budget:translate-x-full transition-transform duration-1000"></div>
                                    <h3 className="text-slate-500 text-xs font-bold mb-2 uppercase tracking-widest relative z-10">Project Budget</h3>
                                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold text-4xl font-mono relative z-10">${gig.budget}</p>
                                </div>

                                {isOwner && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => navigate(`/gigs/${gig._id}/bids`)}
                                        className="mt-8 w-full btn-primary py-5 text-lg font-semibold"
                                    >
                                        View All Bids →
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>


                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-1"
                        >
                            {!isOwner && gig.status === 'open' && user && (
                                <div className="glass-card p-8 sticky top-28 relative overflow-hidden group rounded-3xl">

                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative z-10">
                                        <h2 className="text-3xl font-bold text-white mb-8">Submit Your Bid</h2>

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

                                        {success && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-5 py-4 rounded-xl mb-6 flex items-center gap-3"
                                            >
                                                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm font-medium">{success}</span>
                                            </motion.div>
                                        )}

                                        <form onSubmit={handleSubmitBid} className="space-y-6">
                                            <div>
                                                <label className="block text-base font-semibold text-slate-300 mb-3">
                                                    Your Message
                                                </label>
                                                <textarea
                                                    value={bidData.message}
                                                    onChange={(e) => setBidData({ ...bidData, message: e.target.value })}
                                                    required
                                                    rows={5}
                                                    className="w-full resize-none text-base"
                                                    placeholder="Explain why you're the best fit..."
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-base font-semibold text-slate-300 mb-3">
                                                    Your Bid Amount ($)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={bidData.price}
                                                    onChange={(e) => setBidData({ ...bidData, price: e.target.value })}
                                                    required
                                                    min="0"
                                                    step="0.01"
                                                    className="w-full text-base"
                                                    placeholder="450"
                                                />
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                disabled={submitting}
                                                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed py-5 text-lg font-semibold"
                                            >
                                                {submitting ? (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        <span>Submitting...</span>
                                                    </span>
                                                ) : (
                                                    'Submit Bid →'
                                                )}
                                            </motion.button>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {!user && gig.status === 'open' && (
                                <div className="glass-card p-10 text-center relative overflow-hidden group rounded-3xl">

                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative z-10">
                                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Login Required</h3>
                                        <p className="text-slate-400 mb-6 font-light text-base">Please login to submit a bid on this gig</p>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => navigate('/login')}
                                            className="btn-primary w-full py-5 text-lg font-semibold"
                                        >
                                            Login →
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GigDetails;
