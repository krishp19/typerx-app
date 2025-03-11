import { Server as SocketIOServer } from 'socket.io';

const socketServer = {
  io: null,
};

export const runtime = 'nodejs';

export async function GET(req) {
  if (!socketServer.io) {
    console.log('Socket server initializing...');
    
    const io = new SocketIOServer({
      path: '/api/socket',
      addTrailingSlash: false,
      transports: ['websocket'],
      cors: {
        origin: '*',
      },
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('disconnect', (reason) => {
        console.log('Client disconnected:', socket.id, 'Reason:', reason);
      });

      socket.on('join-room', async (data) => {
        try {
          const { roomId, user } = data;
          console.log(`User ${user.firstName} (${socket.id}) attempting to join room ${roomId}`);

          // Leave any previous rooms
          const rooms = Array.from(socket.rooms);
          rooms.forEach(room => {
            if (room !== socket.id) {
              socket.leave(room);
            }
          });

          await socket.join(roomId);
          console.log(`User ${user.firstName} (${socket.id}) joined room ${roomId}`);

          // Get all sockets in the room
          const socketsInRoom = await io.in(roomId).allSockets();
          const playerCount = socketsInRoom.size;
          console.log(`Room ${roomId} now has ${playerCount} players`);

          // Emit room joined event
          socket.emit('room-joined', {
            success: true,
            message: `Successfully joined room ${roomId}`,
            playerCount
          });

        } catch (error) {
          console.error('Error in join-room event:', error);
          socket.emit('error', {
            type: 'join-room-error',
            message: error.message
          });
        }
      });

      socket.on('start-game', async ({ roomId }) => {
        try {
          console.log(`Starting game in room ${roomId}`);
          io.to(roomId).emit('game-starting');
          
          let count = 3;
          const countdownInterval = setInterval(() => {
            if (count > 0) {
              io.to(roomId).emit('countdown', count);
              count--;
            } else {
              clearInterval(countdownInterval);
              io.to(roomId).emit('game-started');
            }
          }, 1000);
        } catch (error) {
          console.error('Error starting game:', error);
        }
      });

      socket.on('typing-progress', ({ roomId, progress, wpm, accuracy }) => {
        socket.to(roomId).emit('update-progress', {
          socketId: socket.id,
          progress,
          wpm,
          accuracy
        });
      });

      socket.on('game-completed', ({ roomId, stats }) => {
        socket.to(roomId).emit('player-completed', {
          socketId: socket.id,
          stats
        });
      });
    });

    socketServer.io = io;
    console.log('Socket server initialized');
  }

  return new Response('Socket server is running', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
} 