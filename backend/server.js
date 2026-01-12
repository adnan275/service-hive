const dotenv = require('dotenv');

dotenv.config();

const { createServer } = require('http');
const { Server } = require('socket.io');
const setupSocket = require('./socket/socket');
const connectDB = require('./config/db');
const app = require('./api/index');

// Connect to MongoDB
connectDB().catch(err => {
    console.error('MongoDB connection error:', err.message);
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    },
});

setupSocket(io);

app.set('io', io);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
