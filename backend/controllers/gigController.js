const Gig = require('../models/Gig');

const getGigs = async (req, res) => {
    try {
        const { search } = req.query;
        let query = { status: 'open' };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const gigs = await Gig.find(query)
            .populate('ownerId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: gigs.length,
            gigs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id).populate('ownerId', 'name email');

        if (!gig) {
            return res.status(404).json({
                success: false,
                message: 'Gig not found',
            });
        }

        res.status(200).json({
            success: true,
            gig,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const createGig = async (req, res) => {
    try {
        const { title, description, budget } = req.body;

        const gig = await Gig.create({
            title,
            description,
            budget,
            ownerId: req.user._id,
        });

        res.status(201).json({
            success: true,
            gig,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMyGigs = async (req, res) => {
    try {
        const gigs = await Gig.find({ ownerId: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: gigs.length,
            gigs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getGigs,
    getGig,
    createGig,
    getMyGigs,
};
