import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user } = useAuth();

    const quickActions = [
        {
            to: '/browse',
            icon: '🔍',
            title: 'Browse Gigs',
            description: 'Find new opportunities',
            gradient: 'from-blue-600/20 to-cyan-600/20',
            hoverGradient: 'group-hover:from-blue-600 group-hover:to-cyan-600'
        },
        {
            to: '/post-gig',
            icon: '➕',
            title: 'Post a Gig',
            description: 'Create a new job posting',
            gradient: 'from-purple-600/20 to-pink-600/20',
            hoverGradient: 'group-hover:from-purple-600 group-hover:to-pink-600'
        },
        {
            to: '/my-gigs',
            icon: '💼',
            title: 'My Gigs',
            description: 'Manage your posted jobs',
            gradient: 'from-emerald-600/20 to-teal-600/20',
            hoverGradient: 'group-hover:from-emerald-600 group-hover:to-teal-600'
        },
        {
            to: '/my-bids',
            icon: '📝',
            title: 'My Bids',
            description: 'Track your submitted bids',
            gradient: 'from-orange-600/20 to-amber-600/20',
            hoverGradient: 'group-hover:from-orange-600 group-hover:to-amber-600'
        },
    ];

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            <div className="h-32"></div>

            <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-900/20 via-cyan-900/10 to-transparent pointer-events-none animate-pulse-glow" />

            <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

            <div className="flex justify-center px-4 sm:px-6 lg:px-8 pb-32">
                <div className="w-full max-w-[95%] relative z-10 flex flex-col gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">{user?.name?.split(' ')[0]}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide">
                            Here's what you can do today
                        </p>
                    </motion.div>

                    {/* Quick Actions Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickActions.map((action, index) => (
                            <motion.div
                                key={action.to}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Link to={action.to} className="block group h-full">
                                    <div className={`glass-card p-8 h-full relative overflow-hidden bg-gradient-to-br ${action.gradient} ${action.hoverGradient} transition-all duration-500 rounded-3xl hover:scale-105 border border-white/5`}>
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        </div>

                                        <div className="relative z-10 flex flex-col items-center text-center">
                                            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                                                {action.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">
                                                {action.title}
                                            </h3>
                                            <p className="text-slate-300 text-sm font-light leading-relaxed">
                                                {action.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Tips Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-card p-10 md:p-16 relative overflow-hidden group rounded-3xl border border-white/5 mt-12"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold mb-16 flex items-center justify-center gap-6">
                                <span className="text-5xl filter drop-shadow-md">💡</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Quick Tips</span>
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <Tip text="Browse available gigs and submit competitive bids to increase your chances" />
                                <Tip text="Post detailed job descriptions to attract qualified freelancers" />
                                <Tip text="You'll receive real-time notifications when you're hired for a project" />
                                <Tip text="Review all bids carefully before hiring to find the best fit" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Tip = ({ text }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-start gap-4 group"
    >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg group-hover:scale-110 transition-transform">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
        </div>
        <p className="text-slate-300 text-base leading-relaxed font-light">{text}</p>
    </motion.div>
);

export default Dashboard;
