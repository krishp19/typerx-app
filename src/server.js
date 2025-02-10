const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

const users = {}; // Store users with persistent IDs

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Assign a custom user ID if not provided
  socket.on("registerUser", (userId) => {
    users[socket.id] = userId;
    console.log(`User Registered: ${userId} (Socket ID: ${socket.id})`);
  });

  socket.on("updateStats", (data) => {
    console.log(`Stats received from ${users[socket.id] || socket.id}:`, data);
    io.emit("statsUpdated", { user: users[socket.id] || "Guest", ...data });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete users[socket.id]; // Remove user on disconnect
  });
});

console.log("Socket.io server running on port 3001");
