import { useState, useEffect } from 'react';
import api from '../utils/api';
import GigCard from '../components/GigCard';
import { motion } from 'framer-motion';

const BrowseGigs = () => {
    const [gigs, setGigs] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchGigs();
    }, [search]);

    const fetchGigs = async () => {
        try {
            setLoading(true);
            const { data } = await api.get(`/gigs${search ? `?search=${search}` : ''}`);
            setGigs(data.gigs);
        } catch (err) {
            setError('Failed to fetch gigs');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* spacer for navbar */}
            <div className="h-32"></div>

            {/* Background elements */}
            <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-900/20 via-cyan-900/10 to-transparent pointer-events-none animate-pulse-glow" />

            <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

            <div className="relative z-10 flex flex-col gap-16 px-4 sm:px-6 lg:px-8 pb-24">


                <section className="flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl w-full"
                    >
                        <h1 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tight">
                            Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">Gigs</span>
                        </h1>
                        <p className="text-slate-300 text-xl md:text-2xl mb-12 font-light leading-relaxed">
                            Find the perfect project that matches your skills.
                        </p>


                        <div className="relative group max-w-3xl mx-auto">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-2xl opacity-20 group-hover:opacity-40 group-focus-within:opacity-40 transition duration-500 blur"></div>
                            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-1 shadow-2xl">
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search by title..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full bg-transparent border-none pl-6 pr-24 py-5 text-lg placeholder-slate-500 focus:ring-0 text-white font-light focus:outline-none"
                                    />
                                    <div className="absolute right-5 pointer-events-none">
                                        <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>


                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-32"
                    >
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                        </div>
                        <p className="text-slate-400 uppercase tracking-widest text-sm mt-6 font-semibold">Loading Gigs...</p>
                    </motion.div>
                )}


                {error && (
                    <section className="flex justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center glass-card p-8 border-red-500/30 bg-red-950/20 rounded-2xl max-w-2xl w-full"
                        >
                            <div className="text-red-400 text-lg font-semibold">{error}</div>
                        </motion.div>
                    </section>
                )}


                {!loading && !error && gigs.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-32"
                    >
                        <div className="text-8xl mb-8 grayscale opacity-20">📂</div>
                        <h3 className="text-3xl font-bold text-white mb-4">No Gigs Found</h3>
                        <p className="text-slate-400 text-xl font-light">Try searching for something else.</p>
                    </motion.div>
                )}


                {!loading && !error && gigs.length > 0 && (
                    <section className="flex justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-full max-w-7xl"
                        >
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                                {gigs.map((gig, index) => (
                                    <motion.div
                                        key={gig._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                    >
                                        <GigCard gig={gig} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default BrowseGigs;
