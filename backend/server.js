const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');   // ← ADD THIS
const { createServer } = require('http');
const { Server } = require('socket.io');
const setupSocket = require('./socket/socket');
const connectDB = require('./config/db');
const app = require('./api/index');

app.use(cors({                 // ← ADD THIS
    origin: process.env.CLIENT_URL || 'https://service-hive-zeta.vercel.app',
    credentials: true
}));

connectDB().catch(err => {
    console.error('MongoDB connection error:', err.message);
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || 'https://service-hive-zeta.vercel.app',
        credentials: true,
    },
});

setupSocket(io);

app.set('io', io);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
