const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    gigId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gig',
        required: true,
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
        min: [0, 'Price must be a positive number'],
    },
    status: {
        type: String,
        enum: ['pending', 'hired', 'rejected'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

bidSchema.index({ gigId: 1, freelancerId: 1 });
bidSchema.index({ freelancerId: 1, status: 1 });

module.exports = mongoose.model('Bid', bidSchema);
