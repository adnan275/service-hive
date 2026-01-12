const setupSocket = (io) => {
    const connectedUsers = new Map();

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('join', (userId) => {
            socket.join(userId);
            connectedUsers.set(userId, socket.id);
            console.log(`User ${userId} joined`);
        });

        socket.on('disconnect', () => {
            for (const [userId, socketId] of connectedUsers.entries()) {
                if (socketId === socket.id) {
                    connectedUsers.delete(userId);
                    console.log(`User ${userId} disconnected`);
                    break;
                }
            }
        });
    });

    return io;
};

module.exports = setupSocket;
