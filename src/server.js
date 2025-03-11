const { createServer } = require('http');
const { Server } = require('socket.io');

// Create HTTP server
const httpServer = createServer();
console.log("HTTP Server created");

// Create Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins in development
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
  path: "/socket.io",
  transports: ["websocket"],
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
  pingInterval: 25000,
});

console.log("Socket.IO server instance created");

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("New client connected:", {
    socketId: socket.id,
    transport: socket.conn.transport.name,
    headers: socket.handshake.headers
  });

  socket.onAny((eventName, ...args) => {
    console.log(`Event received - ${eventName}:`, args);
  });

  socket.on("join-room", ({ roomId, user }) => {
    try {
      socket.join(roomId);
      console.log(`User ${user.id} joined room ${roomId}`);
      io.to(roomId).emit("user-joined", { user, socketId: socket.id });
    } catch (error) {
      console.error("Error in join-room:", error);
    }
  });

  socket.on("start-game", (roomId) => {
    try {
      console.log(`Starting game in room ${roomId} by socket ${socket.id}`);
      
      // Check if room exists and has players
      const room = io.sockets.adapter.rooms.get(roomId);
      if (!room) {
        console.error(`Room ${roomId} not found`);
        return;
      }
      console.log(`Room ${roomId} has ${room.size} players`);
      
      // First emit game-starting to prepare all clients
      io.to(roomId).emit("game-starting");
      console.log(`Emitted game-starting to room ${roomId}`);

      // Start countdown from 3
      let count = 3;
      const countdownInterval = setInterval(() => {
        console.log(`Emitting countdown ${count} to room ${roomId}`);
        io.to(roomId).emit("countdown", count);
        count--;

        if (count < 0) {
          clearInterval(countdownInterval);
          console.log(`Emitting game-started to room ${roomId}`);
          io.to(roomId).emit("game-started");
        }
      }, 1000);
    } catch (error) {
      console.error("Error in start-game:", error);
    }
  });

  socket.on("typing-progress", ({ roomId, progress, wpm, accuracy }) => {
    try {
      socket.to(roomId).emit("update-progress", { 
        socketId: socket.id, 
        progress,
        wpm,
        accuracy
      });
    } catch (error) {
      console.error("Error in typing-progress:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

// Start listening on port 3001
const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
