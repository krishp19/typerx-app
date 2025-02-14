// import { Server } from "socket.io";

// const io = new Server(3001, {
//   cors: {
//     origin: "*",
//   },
// });

// // Store stats per Clerk user ID
// let userStats = {};

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   // Register user and send their stats
//   socket.on("registerUser", (userId) => {
//     if (!userStats[userId]) {
//       userStats[userId] = { averageWpm: 0, averageAccuracy: 100, totalSessions: 0,sessionHistory: [] };
//     }
//     socket.emit("fetchStats", userStats[userId]); // Send stats to the frontend
//   });

//   // Update stats for the specific user
//   socket.on("updateStats", ({ userId, wpm, accuracy }) => {
//     if (!userStats[userId]) return; 

//     let user = userStats[userId];
//     user.totalSessions += 1;
//     user.averageWpm = ((user.averageWpm * (user.totalSessions - 1)) + wpm) / user.totalSessions;
//     user.averageAccuracy = ((user.averageAccuracy * (user.totalSessions - 1)) + accuracy) / user.totalSessions;

//     const sessionDate = new Date().toISOString();
//     user.sessionHistory.push({ wpm, accuracy, date: sessionDate });

//     io.to(socket.id).emit("statsUpdated", user);
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

// console.log("Socket.io server running on port 3001");
