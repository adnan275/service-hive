const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('../middleware/errorHandler');

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/gigs', require('../routes/gigRoutes'));
app.use('/api/bids', require('../routes/bidRoutes'));

app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is running' });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

app.use(errorHandler);

module.exports = app;
