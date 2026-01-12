import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-black relative overflow-hidden font-inter selection:bg-blue-500/30">
            <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-blue-900/20 via-cyan-900/10 to-transparent pointer-events-none animate-pulse-glow" />

            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float opacity-70"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="relative z-10 flex flex-col gap-32 md:gap-48 pb-40">

                <section className="relative px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center justify-center pt-32">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 10 }}
                                className="inline-flex items-center justify-center py-3 px-8 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-500/20 backdrop-blur-xl mb-12 hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-500 group cursor-default"
                            >
                                <span className="text-xl mr-3 group-hover:rotate-12 transition-transform duration-300">✨</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-cyan-200 text-sm font-bold tracking-[0.2em] uppercase drop-shadow-sm">The Future of Work is Here</span>
                            </motion.div>

                            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight max-w-5xl mx-auto drop-shadow-2xl">
                                Work Without <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-gradient-x">
                                    Limits
                                </span>
                            </h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
                            >
                                The premium marketplace for top-tier freelancers. Connect, collaborate, and build something extraordinary with verified talent.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
                            >
                                {user ? (
                                    <>
                                        <Link to="/browse" className="btn-primary min-w-[180px] group">
                                            Browse Gigs
                                            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                        </Link>
                                        <Link to="/post-gig" className="btn-secondary min-w-[180px]">
                                            Post a Gig
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/register" className="btn-primary min-w-[180px] group">
                                            Get Started
                                            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                        </Link>
                                        <Link to="/browse" className="btn-secondary min-w-[180px]">
                                            Explore Work
                                        </Link>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <section className="px-4 flex justify-center">
                    <div className="w-full max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-10 md:p-14 shadow-2xl"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 gap-10 md:gap-0">
                                <StatItem number="10k+" label="Active Projects" />
                                <StatItem number="$5M+" label="Paid to Freelancers" />
                                <StatItem number="99%" label="Client Satisfaction" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="px-4 sm:px-6 lg:px-8">
                    <div className="w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-24 flex flex-col items-center"
                        >
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight !text-center">
                                Why Choose <span className="text-blue-400">GigFlow</span>?
                            </h2>
                            <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed !text-center">
                                Built for the next generation of digital workers and visionary clients.
                            </p>
                        </motion.div>

                        <div className="flex flex-wrap justify-center gap-10 lg:gap-16">
                            <FeatureCard
                                icon="💎"
                                title="Premium Quality"
                                description="Access a curated network of top-tier talent verified for quality and reliability."
                                delay={0.2}
                            />
                            <FeatureCard
                                icon="🛡️"
                                title="Secure & Safe"
                                description="Bank-grade escrow payments ensure your money is safe until the work is approved."
                                delay={0.4}
                            />
                            <FeatureCard
                                icon="⚡"
                                title="Lightning Fast"
                                description="AI-powered matching gets you the right talent in minutes, not days."
                                delay={0.6}
                            />
                        </div>
                    </div>
                </section>

                <section className="px-4 flex justify-center">
                    <div className="w-full max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative overflow-hidden group rounded-[3rem] bg-gradient-to-b from-blue-900/20 to-black border border-white/10 p-16 md:p-32 text-center shadow-2xl shadow-blue-900/20"
                        >
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center justify-center py-3 px-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-12"
                                >
                                    <span className="mr-3 text-xl">✨</span>
                                    <span className="text-sm font-semibold tracking-widest uppercase">Ready to Start?</span>
                                </motion.div>

                                <h2 className="text-5xl md:text-7xl font-black mb-10 text-white leading-tight">
                                    Join the <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">Revolution</span>
                                </h2>
                                <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
                                    The elite marketplace for modern professionals. Connect, collaborate, and build something extraordinary.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
                                    <Link to="/register" className="btn-primary min-w-[240px] text-xl py-5 rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform duration-300">
                                        Get Started Together
                                    </Link>
                                    <Link to="/browse" className="btn-secondary min-w-[240px] text-xl py-5 rounded-2xl border-white/10 hover:bg-white/5 hover:scale-105 transition-transform duration-300">
                                        Explore Projects
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
};

const StatItem = ({ number, label }) => (
    <div className="flex flex-col items-center justify-center p-8 text-center group transition-colors duration-300">
        <div className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 mb-4 group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300 leading-none">
            {number}
        </div>
        <div className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs md:text-sm group-hover:text-slate-300 transition-colors">
            {label}
        </div>
    </div>
);

const FeatureCard = ({ icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="group relative p-10 h-full flex flex-col items-center justify-center text-center rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-500 w-full md:w-80"
        style={{ textAlign: 'center' }}
    >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-3xl mb-8 text-blue-400 group-hover:scale-110 transition-transform duration-500 shadow-inner shadow-blue-500/20 mx-auto">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors !text-center w-full">{title}</h3>
        <p className="text-slate-400 leading-relaxed font-light text-lg flex-grow max-w-sm !text-center mx-auto w-full">
            {description}
        </p>
    </motion.div>
);

export default Home;
