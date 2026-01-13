import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GigCard = ({ gig }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="glass-card !p-12 h-full flex flex-col group border-2 border-white/10 hover:border-blue-500/40 relative overflow-hidden rounded-3xl"
        >
            { }
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>

            <div className="flex justify-between items-start mb-6 relative z-10 gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                        {gig.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm text-white uppercase tracking-wider font-bold shadow-lg">
                            {gig.ownerId?.name?.charAt(0) || 'U'}
                        </div>
                        <span className="font-medium text-sm text-slate-400">{gig.ownerId?.name || 'Unknown'}</span>
                    </div>
                </div>
                <span className={`px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-bold border transition-all duration-300 flex-shrink-0 ${gig.status === 'open'
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-slate-900/50 text-slate-500 border-slate-700/50'
                    }`}>
                    {gig.status}
                </span>
            </div>

            <p className="text-slate-400 mb-8 line-clamp-3 text-base md:text-lg leading-relaxed flex-grow font-light relative z-10">
                {gig.description}
            </p>

            <div className="flex justify-between items-center pt-6 border-t border-dashed border-white/10 mt-auto relative z-10">
                <div>
                    <span className="text-xs text-slate-600 uppercase tracking-widest font-bold block mb-2">Budget</span>
                    <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-mono">
                        ${gig.budget}
                    </p>
                </div>
                <Link
                    to={`/gigs/${gig._id}`}
                    className="px-6 py-3.5 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600 hover:to-cyan-600 text-blue-400 hover:text-white rounded-xl text-base font-semibold transition-all duration-300 border border-blue-500/30 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transform hover:scale-105"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
};

export default GigCard;
