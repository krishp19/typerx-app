import { Server } from "socket.io";
import { createServer } from "http";
import { NextResponse } from "next/server";

let io;

if (!global.io) {
  // Create HTTP server
  const httpServer = createServer();

  // Create Socket.IO server
  io = new Server(httpServer, {
    cors: {
      origin: "*", // Allow all origins in development
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
    allowEIO3: true,
    path: "/socket.io/", // Use default Socket.IO path
  });

  // Store io instance globally
  global.io = io;

  // Start listening on port 3001
  httpServer.listen(3001, () => {
    console.log("Socket.IO server running on port 3001");
  });

  // Socket.IO event handlers
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-room", ({ roomId, user }) => {
      socket.join(roomId);
      io.to(roomId).emit("user-joined", { user, socketId: socket.id });
    });

    socket.on("typing-progress", ({ roomId, progress }) => {
      socket.to(roomId).emit("update-progress", { socketId: socket.id, progress });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

// Export the handler for Next.js
export async function GET(req) {
  return new NextResponse("Socket.IO server is running", { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
} 