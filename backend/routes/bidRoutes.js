const express = require('express');
const { submitBid, getGigBids, hireBid, getMyBids } = require('../controllers/bidController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, submitBid);
router.get('/my-bids', protect, getMyBids);
router.get('/:gigId', protect, getGigBids);
router.patch('/:bidId/hire', protect, hireBid);

module.exports = router;
