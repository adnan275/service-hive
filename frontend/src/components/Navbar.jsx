import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-black/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                    : 'bg-transparent border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            {}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-xl opacity-60 group-hover:opacity-100 blur-sm transition duration-500 animate-pulse-glow"></div>
                            <div className="relative w-11 h-11 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all duration-300">
                                <span className="text-white font-black text-xl">G</span>
                            </div>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            Gig<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Flow</span>
                        </span>
                    </Link>

                    {}
                    <div className="hidden md:flex items-center gap-8">
                        {user ? (
                            <>
                                <NavLink to="/browse">Browse</NavLink>
                                <NavLink to="/post-gig">Post Gig</NavLink>
                                <NavLink to="/my-gigs">My Gigs</NavLink>
                                <NavLink to="/my-bids">My Bids</NavLink>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                                <button
                                    onClick={logout}
                                    className="text-sm text-slate-400 hover:text-red-400 transition-colors duration-300 uppercase tracking-widest font-semibold text-xs hover:scale-105 transform"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/browse">Browse</NavLink>
                                <NavLink to="/login">Login</NavLink>
                                <Link
                                    to="/register"
                                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transform hover:scale-105"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {user ? (
                                <>
                                    <MobileLink to="/browse" onClick={() => setMobileMenuOpen(false)}>Browse Gigs</MobileLink>
                                    <MobileLink to="/post-gig" onClick={() => setMobileMenuOpen(false)}>Post Gig</MobileLink>
                                    <MobileLink to="/my-gigs" onClick={() => setMobileMenuOpen(false)}>My Gigs</MobileLink>
                                    <MobileLink to="/my-bids" onClick={() => setMobileMenuOpen(false)}>My Bids</MobileLink>
                                    <MobileLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</MobileLink>
                                    <button
                                        onClick={() => { logout(); setMobileMenuOpen(false); }}
                                        className="block w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
                                    >
                                        Log Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <MobileLink to="/browse" onClick={() => setMobileMenuOpen(false)}>Browse</MobileLink>
                                    <MobileLink to="/login" onClick={() => setMobileMenuOpen(false)}>Login</MobileLink>
                                    <MobileLink to="/register" onClick={() => setMobileMenuOpen(false)}>Sign Up</MobileLink>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

const NavLink = ({ to, children }) => (
    <Link
        to={to}
        className="relative text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-300 tracking-wide group"
    >
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
    </Link>
);

const MobileLink = ({ to, onClick, children }) => (
    <Link
        to={to}
        onClick={onClick}
        className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 hover:translate-x-1"
    >
        {children}
    </Link>
);

export default Navbar;
