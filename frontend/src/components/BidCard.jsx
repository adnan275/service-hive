import { motion } from 'framer-motion';

const BidCard = ({ bid, onHire, isOwner }) => {
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 relative overflow-hidden group"
        >
            {}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {bid.freelancerId?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                {bid.freelancerId?.name || 'Unknown Freelancer'}
                            </h4>
                            <p className="text-slate-500 text-sm font-light">{bid.freelancerId?.email}</p>
                        </div>
                    </div>
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusColor(bid.status)}`}
                    >
                        {bid.status}
                    </motion.span>
                </div>

                <div className="bg-black/30 rounded-lg p-4 mb-4 border border-white/10 backdrop-blur-sm">
                    <p className="text-slate-300 leading-relaxed font-light">{bid.message}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div>
                        <span className="text-slate-500 text-xs uppercase tracking-widest font-bold block mb-1">Bid Amount</span>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold text-2xl font-mono">${bid.price}</p>
                    </div>
                    {isOwner && bid.status === 'pending' && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onHire(bid._id)}
                            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all"
                        >
                            Hire Freelancer
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default BidCard;
