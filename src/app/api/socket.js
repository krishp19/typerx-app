import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    
    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      // Handle joining a room
      socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);

        io.to(roomId).emit("user-joined", { userId: socket.id });
      });

      // Handle typing progress
      socket.on("typing-progress", ({ roomId, progress }) => {
        io.to(roomId).emit("update-progress", { userId: socket.id, progress });
      });

      // Handle user disconnect
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
