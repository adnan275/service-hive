import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import BidCard from '../components/BidCard';
import { motion } from 'framer-motion';

const GigBids = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bids, setBids] = useState([]);
    const [gig, setGig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBids();
        fetchGig();
    }, [id]);

    const fetchGig = async () => {
        try {
            const { data } = await api.get(`/gigs/${id}`);
            setGig(data.gig);
        } catch (err) {
            console.error('Failed to fetch gig');
        }
    };

    const fetchBids = async () => {
        try {
            const { data } = await api.get(`/bids/${id}`);
            setBids(data.bids);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch bids');
        } finally {
            setLoading(false);
        }
    };

    const handleHire = async (bidId) => {
        if (!confirm('Are you sure you want to hire this freelancer?')) return;

        try {
            await api.patch(`/bids/${bidId}/hire`);
            alert('Freelancer hired successfully!');
            fetchBids();
            fetchGig();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to hire freelancer');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-grid-pattern">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                </div>
                <p className="text-slate-400 uppercase tracking-widest text-sm mt-6 font-semibold">Loading bids...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-grid-pattern relative">
            {/* spacer for navbar */}
            <div className="h-32"></div>

            <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: -5 }}
                    onClick={() => navigate('/my-gigs')}
                    className="text-blue-400 hover:text-blue-300 mb-8 flex items-center gap-2 font-semibold transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to My Gigs</span>
                </motion.button>

                {gig && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-8 mb-8 relative overflow-hidden group"
                    >

                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{gig.title}</h1>
                                    <p className="text-slate-300 mb-6 leading-relaxed font-light">{gig.description}</p>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-xl px-6 py-3 border border-blue-500/30">
                                            <span className="text-slate-500 text-xs uppercase tracking-widest font-bold block mb-1">Budget</span>
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold text-2xl font-mono">${gig.budget}</span>
                                        </div>
                                        <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${gig.status === 'open'
                                            ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                                            : 'bg-slate-900/50 text-slate-500 border border-slate-700/50'
                                            }`}>
                                            {gig.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl md:text-4xl font-black text-white">
                            Received Bids <span className="gradient-text">({bids.length})</span>
                        </h2>
                    </div>

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

                    {bids.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No bids yet</h3>
                            <p className="text-slate-400 font-light">Freelancers haven't submitted any bids for this gig yet</p>
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            {bids.map((bid, index) => (
                                <motion.div
                                    key={bid._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <BidCard bid={bid} onHire={handleHire} isOwner={true} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default GigBids;
