const Bid = require('../models/Bid');
const Gig = require('../models/Gig');
const mongoose = require('mongoose');

const submitBid = async (req, res) => {
    try {
        const { gigId, message, price } = req.body;

        const gig = await Gig.findById(gigId);
        if (!gig) {
            return res.status(404).json({
                success: false,
                message: 'Gig not found',
            });
        }

        if (gig.status !== 'open') {
            return res.status(400).json({
                success: false,
                message: 'This gig is no longer accepting bids',
            });
        }

        if (gig.ownerId.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot bid on your own gig',
            });
        }

        const existingBid = await Bid.findOne({
            gigId,
            freelancerId: req.user._id,
        });

        if (existingBid) {
            return res.status(400).json({
                success: false,
                message: 'You have already submitted a bid for this gig',
            });
        }

        const bid = await Bid.create({
            gigId,
            freelancerId: req.user._id,
            message,
            price,
        });

        const populatedBid = await Bid.findById(bid._id)
            .populate('freelancerId', 'name email')
            .populate('gigId', 'title');

        res.status(201).json({
            success: true,
            bid: populatedBid,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getGigBids = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.gigId);

        if (!gig) {
            return res.status(404).json({
                success: false,
                message: 'Gig not found',
            });
        }

        if (gig.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view bids for this gig',
            });
        }

        const bids = await Bid.find({ gigId: req.params.gigId })
            .populate('freelancerId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bids.length,
            bids,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const hireBid = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const bid = await Bid.findById(req.params.bidId)
            .populate('gigId')
            .populate('freelancerId', 'name email')
            .session(session);

        if (!bid) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                success: false,
                message: 'Bid not found',
            });
        }

        const gig = bid.gigId;

        if (gig.ownerId.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({
                success: false,
                message: 'Not authorized to hire for this gig',
            });
        }

        if (gig.status !== 'open') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                success: false,
                message: 'This gig has already been assigned',
            });
        }

        gig.status = 'assigned';
        await gig.save({ session });

        bid.status = 'hired';
        await bid.save({ session });

        await Bid.updateMany(
            {
                gigId: gig._id,
                _id: { $ne: bid._id },
                status: 'pending',
            },
            { status: 'rejected' },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        const io = req.app.get('io');
        if (io) {
            io.to(bid.freelancerId._id.toString()).emit('hired', {
                message: `You have been hired for ${gig.title}!`,
                gigId: gig._id,
                gigTitle: gig.title,
                bidId: bid._id,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Freelancer hired successfully',
            bid,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMyBids = async (req, res) => {
    try {
        const bids = await Bid.find({ freelancerId: req.user._id })
            .populate('gigId', 'title description budget status')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bids.length,
            bids,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    submitBid,
    getGigBids,
    hireBid,
    getMyBids,
};
