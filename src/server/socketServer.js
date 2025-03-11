const { Server } = require('socket.io');

const io = new Server(3001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store room data
const rooms = new Map();

console.log('Socket.IO server starting on port 3001...');

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', (reason) => {
    console.log('Client disconnected:', socket.id, 'Reason:', reason);
    // Clean up rooms when players disconnect
    for (const [roomId, room] of rooms.entries()) {
      if (room.players.has(socket.id)) {
        room.players.delete(socket.id);
        if (room.players.size === 0) {
          rooms.delete(roomId);
        } else {
          // Notify remaining players about disconnection
          socket.to(roomId).emit('player-left', { socketId: socket.id });
        }
      }
    }
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

      // Check if the room exists
      if (!rooms.has(roomId)) {
        // Initialize room if it doesn't exist
        rooms.set(roomId, {
          players: new Map(),
          isGameStarted: false,
          creatorId: socket.id // First player is the creator
        });
        console.log(`Created new room ${roomId} with creator ${socket.id}`);
      }

      const room = rooms.get(roomId);
      
      // Check if user is already in the room
      const isUserAlreadyInRoom = Array.from(room.players.values()).some(player => player.id === user.id);
      
      if (isUserAlreadyInRoom) {
        console.log(`User ${user.firstName} (${user.id}) is already in room ${roomId}`);
        
        // Still join the socket to the room
        await socket.join(roomId);
        
        // Get all players in the room
        const playerCount = room.players.size;
        const playersInfo = Array.from(room.players.entries()).map(([socketId, player]) => ({
          socketId,
          ...player
        }));
        
        // Check if this user is the creator
        const isUserCreator = user.id === room.players.get(room.creatorId)?.id;
        console.log(`User ${user.firstName} is creator: ${isUserCreator}`);
        
        // Emit room joined event with all players' info and alreadyJoined flag
        socket.emit('room-joined', {
          success: true,
          message: `You are already in room ${roomId}`,
          playerCount,
          players: playersInfo,
          isGameStarted: room.isGameStarted,
          isCreator: isUserCreator,
          alreadyJoined: true,
          typingText: room.typingText // Send the typing text if it exists
        });
        
        return;
      }

      await socket.join(roomId);
      console.log(`User ${user.firstName} (${socket.id}) joined room ${roomId}`);
      
      // Add player to room with their info
      const playerInfo = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        progress: 0,
        wpm: 0,
        accuracy: 100,
        isCreator: !room.creatorId // First player is the creator
      };
      
      if (!room.creatorId) {
        room.creatorId = socket.id;
        console.log(`Setting ${user.firstName} (${socket.id}) as creator of room ${roomId}`);
      }
      
      room.players.set(socket.id, playerInfo);

      // Get all players in the room
      const playerCount = room.players.size;
      const playersInfo = Array.from(room.players.entries()).map(([socketId, player]) => ({
        socketId,
        ...player
      }));

      console.log(`Room ${roomId} now has ${playerCount} players`);
      
      // Check if this user is the creator
      const isUserCreator = socket.id === room.creatorId;
      console.log(`User ${user.firstName} is creator: ${isUserCreator}`);

      // Emit room joined event with all players' info
      socket.emit('room-joined', {
        success: true,
        message: `Successfully joined room ${roomId}`,
        playerCount,
        players: playersInfo,
        isGameStarted: room.isGameStarted,
        isCreator: isUserCreator,
        alreadyJoined: false,
        typingText: room.typingText // Send the typing text if it exists
      });

      // Notify other players about the new player
      socket.to(roomId).emit('player-joined', {
        socketId: socket.id,
        player: playerInfo
      });

    } catch (error) {
      console.error('Error in join-room event:', error);
      socket.emit('error', {
        type: 'join-room-error',
        message: error.message
      });
    }
  });

  socket.on('start-game', (roomId) => {
    try {
      const room = rooms.get(roomId);
      if (room && socket.id === room.creatorId) {
        console.log(`Starting game in room ${roomId} by creator ${socket.id}`);
        room.isGameStarted = true;
        
        // Generate a random text for all players to type
        const typingTexts = [
          "The quick brown fox jumps over the lazy dog and the cat sleeps peacefully.",
          "Programming is the art of telling another human what one wants the computer to do.",
          "Coding is like poetry; it's not just about what you write, but how you write it.",
          "The best error message is the one that never shows up because you caught the error first.",
          "Debugging is twice as hard as writing the code in the first place."
        ];
        
        // Select a random text
        const randomIndex = Math.floor(Math.random() * typingTexts.length);
        const selectedText = typingTexts[randomIndex];
        
        // Store the text in the room object
        room.typingText = selectedText;
        
        // Get the creator's socket
        const creatorSocket = io.sockets.sockets.get(socket.id);
        if (!creatorSocket) {
          console.error(`Creator socket ${socket.id} not found`);
        }
        
        // Create the data object to send
        const gameStartData = { text: selectedText };
        
        // Log the data being sent
        console.log(`Sending game data:`, gameStartData);
        
        // Notify all players (including the creator) that the game is starting
        io.to(roomId).emit('game-starting', gameStartData);
        
        // Also send directly to the creator to ensure they receive it
        if (creatorSocket) {
          console.log(`Sending direct game-starting event to creator ${socket.id}`);
          creatorSocket.emit('game-starting', gameStartData);
        }
        
        let count = 3;
        const countdownInterval = setInterval(() => {
          if (count > 0) {
            // Send countdown to all players (including the creator)
            io.to(roomId).emit('countdown', count);
            
            // Also send directly to the creator to ensure they receive it
            if (creatorSocket) {
              console.log(`Sending direct countdown ${count} to creator ${socket.id}`);
              creatorSocket.emit('countdown', count);
            }
            
            count--;
          } else {
            clearInterval(countdownInterval);
            // Send game-started to all players (including the creator)
            console.log(`Sending game-started event to all players in room ${roomId}`);
            io.to(roomId).emit('game-started', gameStartData);
            
            // Also send directly to the creator to ensure they receive it
            if (creatorSocket) {
              console.log(`Sending direct game-started event to creator ${socket.id}`);
              creatorSocket.emit('game-started', gameStartData);
              
              // Double-check after a short delay
              setTimeout(() => {
                console.log(`Sending backup game-started event to creator ${socket.id}`);
                creatorSocket.emit('game-started', gameStartData);
              }, 500);
            }
          }
        }, 1000);
      } else {
        console.log(`Failed to start game: ${!room ? 'Room not found' : 'User is not the creator'}`);
        socket.emit('error', {
          type: 'start-game-error',
          message: 'You are not authorized to start this game'
        });
      }
    } catch (error) {
      console.error('Error starting game:', error);
      socket.emit('error', {
        type: 'start-game-error',
        message: error.message
      });
    }
  });

  socket.on('typing-progress', ({ roomId, progress, wpm, accuracy }) => {
    const room = rooms.get(roomId);
    if (room && room.players.has(socket.id)) {
      // Update player's progress
      const player = room.players.get(socket.id);
      player.progress = progress;
      player.wpm = wpm;
      player.accuracy = accuracy;

      // Broadcast progress to all players in the room
      io.to(roomId).emit('update-progress', {
        socketId: socket.id,
        progress,
        wpm,
        accuracy
      });
    }
  });

  socket.on('game-completed', ({ roomId, stats }) => {
    const room = rooms.get(roomId);
    if (room && room.players.has(socket.id)) {
      const player = room.players.get(socket.id);
      player.progress = 100;
      player.wpm = stats.wpm;
      player.accuracy = stats.accuracy;

      io.to(roomId).emit('player-completed', {
        socketId: socket.id,
        stats: {
          ...stats,
          firstName: player.firstName,
          lastName: player.lastName
        }
      });

      // Check if all players have completed
      const allCompleted = Array.from(room.players.values()).every(p => p.progress === 100);
      if (allCompleted) {
        io.to(roomId).emit('game-ended', {
          players: Array.from(room.players.entries()).map(([socketId, player]) => ({
            socketId,
            ...player
          }))
        });
        room.isGameStarted = false;
      }
    }
  });

  // Handle room deletion
  socket.on('delete-room', ({ roomId }) => {
    const room = rooms.get(roomId);
    if (room && socket.id === room.creatorId) {
      console.log(`Deleting room ${roomId}`);
      
      // Notify all players in the room that it's being deleted
      io.to(roomId).emit('room-deleted', { roomId });
      
      // Also broadcast to all connected clients so they can update their room lists
      io.emit('room-list-update', { deletedRoomId: roomId });
      
      // Remove the room from the server
      rooms.delete(roomId);
      
      // Make all sockets leave the room
      io.in(roomId).socketsLeave(roomId);
      
      console.log(`Room ${roomId} has been deleted`);
    } else {
      socket.emit('error', {
        type: 'delete-room-error',
        message: 'You are not authorized to delete this room'
      });
    }
  });
});

// Error handling
io.on('error', (error) => {
  console.error('Socket.IO Server Error:', error);
});

process.on('SIGINT', () => {
  io.close(() => {
    console.log('Socket.IO server closed');
    process.exit(0);
  });
}); 