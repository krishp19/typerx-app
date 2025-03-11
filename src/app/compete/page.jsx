"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSocket } from "../../hooks/useSocket";
import { useUser } from "@clerk/clerk-react";

export default function CompetePage() {
  const searchParams = useSearchParams();
  const socket = useSocket();
  const { user } = useUser();
  const roomId = searchParams.get("roomId");
  const router = useRouter();

  const [gameState, setGameState] = useState({
    isStarted: false,
    countdown: 3,
    timeLeft: 60,
    text: "The quick brown fox jumps over the lazy dog.", // Default text
    typed: "",
    wpm: 0,
    accuracy: 100,
    progress: 0,
    isComplete: false,
    isCreator: false
  });

  const [opponents, setOpponents] = useState(new Map());
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [isConnected, setIsConnected] = useState(false);

  // Handle socket connection and room joining
  useEffect(() => {
    if (!socket || !roomId || !user) {
      console.log("Waiting for socket connection...", {
        socketExists: !!socket,
        roomId,
        userExists: !!user,
        socketConnected: socket?.connected
      });
      return;
    }

    const joinRoom = () => {
      if (!socket.connected) {
        console.log("Socket not connected, attempting to connect...");
        socket.connect();
        return;
      }

      console.log("Attempting to join room:", roomId);
      socket.emit("join-room", {
        roomId,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    };

    // Set up connection event handlers
    const onConnect = () => {
      console.log('Socket connected in compete page, socket id:', socket.id);
      setIsConnected(true);
      joinRoom(); // Join room when connected
    };

    const onDisconnect = (reason) => {
      console.log('Socket disconnected in compete page:', reason);
      setIsConnected(false);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Handle room events
    socket.on('room-joined', ({ players, isCreator, message, isGameStarted, typingText }) => {
      console.log('Room joined in compete page:', { 
        players, 
        isCreator, 
        message, 
        isGameStarted,
        typingText,
        userId: user.id,
        totalPlayers: players?.length || 0
      });
      
      if (!Array.isArray(players)) {
        console.error('Invalid players data received:', players);
        return;
      }
      
      const opponentsMap = new Map();
      players.forEach(player => {
        if (player.id !== user.id) {
          console.log('Adding opponent:', player);
          opponentsMap.set(player.socketId, {
            id: player.id,
            firstName: player.firstName,
            lastName: player.lastName,
            progress: player.progress || 0,
            wpm: player.wpm || 0,
            accuracy: player.accuracy || 100
          });
        }
      });
      
      console.log('Setting opponents:', Array.from(opponentsMap.entries()));
      setOpponents(opponentsMap);
      
      setGameState(prev => {
        console.log('Setting game state:', { isCreator, isGameStarted, typingText });
        return { 
          ...prev, 
          isCreator,
          isStarted: isGameStarted || prev.isStarted,
          text: typingText || prev.text // Use the typing text from the server if available
        };
      });
    });

    socket.on('player-joined', ({ socketId, player }) => {
      console.log('New player joined:', player);
      if (player.id !== user.id) {
        setOpponents(prev => new Map(prev).set(socketId, {
          firstName: player.firstName,
          lastName: player.lastName,
          progress: player.progress || 0,
          wpm: player.wpm || 0,
          accuracy: player.accuracy || 100
        }));
      }
    });

    socket.on('player-left', ({ socketId }) => {
      console.log('Player left:', socketId);
      setOpponents(prev => {
        const newMap = new Map(prev);
        newMap.delete(socketId);
        return newMap;
      });
    });

    // If already connected, join room immediately
    if (socket.connected) {
      console.log('Socket already connected, joining room immediately');
      setIsConnected(true);
      joinRoom();
    } else {
      console.log('Socket not connected, attempting to connect...');
      socket.connect();
    }

    return () => {
      console.log('Cleaning up socket event listeners in compete page');
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('room-joined');
      socket.off('player-joined');
      socket.off('player-left');
    };
  }, [socket, roomId, user]);

  // Handle game events
  useEffect(() => {
    if (!socket || !isConnected) return;

    console.log("Setting up game event listeners");

    socket.on("game-starting", (data) => {
      console.log("Game starting event received with data:", data);
      setShowCountdown(true);
      setGameState(prev => ({ 
        ...prev, 
        isStarted: false,
        text: data?.text || prev.text || "The quick brown fox jumps over the lazy dog.", // Fallback text
        typed: "",
        progress: 0
      }));
    });

    socket.on("countdown", (count) => {
      console.log("Countdown received:", count);
      setCountdownValue(count);
    });

    socket.on("game-started", (data) => {
      console.log("Game started event received with data:", data);
      setShowCountdown(false);
      
      // Force focus on the textarea to enable typing
      setTimeout(() => {
        // Update game state first
        setGameState(prev => {
          const newState = {
            ...prev,
            isStarted: true,
            text: data?.text || prev.text || "The quick brown fox jumps over the lazy dog.", // Fallback text
            timeLeft: 60,
            typed: "",
            wpm: 0,
            accuracy: 100,
            progress: 0,
            isComplete: false
          };
          console.log("Game state updated:", newState);
          return newState;
        });
        
        // Then focus the textarea
        setTimeout(() => {
          const textarea = document.querySelector('textarea');
          if (textarea) {
            textarea.disabled = false;
            textarea.focus();
            console.log("Focused on textarea after game started");
          }
        }, 100);
      }, 100);
      
      console.log("Game state update initiated, typing should be enabled soon");
    });

    socket.on("update-progress", ({ socketId, progress, wpm, accuracy }) => {
      console.log("Progress update received:", { socketId, progress, wpm, accuracy });
      setOpponents(prev => {
        const newMap = new Map(prev);
        const opponent = newMap.get(socketId);
        if (opponent) {
          newMap.set(socketId, { ...opponent, progress, wpm, accuracy });
        }
        return newMap;
      });
    });

    socket.on("player-completed", ({ socketId, stats }) => {
      console.log("Player completed:", { socketId, stats });
      setOpponents(prev => {
        const newMap = new Map(prev);
        const opponent = newMap.get(socketId);
        if (opponent) {
          newMap.set(socketId, {
            ...opponent,
            ...stats,
            progress: 100,
            completed: true
          });
        }
        return newMap;
      });
    });

    return () => {
      socket.off("game-starting");
      socket.off("countdown");
      socket.off("game-started");
      socket.off("update-progress");
      socket.off("player-completed");
    };
  }, [socket, isConnected]);

  // Game timer
  useEffect(() => {
    // Log the current game state for debugging
    console.log("Timer useEffect running with state:", { 
      isStarted: gameState.isStarted, 
      isComplete: gameState.isComplete,
      timeLeft: gameState.timeLeft,
      isCreator: gameState.isCreator
    });
    
    if (!gameState.isStarted || gameState.isComplete) {
      console.log("Timer not running:", { 
        isStarted: gameState.isStarted, 
        isComplete: gameState.isComplete 
      });
      return;
    }

    console.log("Starting game timer");
    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft - 1;
        console.log(`Timer tick: ${newTimeLeft}s remaining`);
        
        // Check if time is up
        if (newTimeLeft <= 0) {
          console.log("Time's up!");
          clearInterval(timer);
          handleGameComplete();
          return { ...prev, timeLeft: 0, isComplete: true };
        }
        
        return {
          ...prev,
          timeLeft: newTimeLeft,
        };
      });
    }, 1000);

    return () => {
      console.log("Clearing timer");
      clearInterval(timer);
    };
  }, [gameState.isStarted, gameState.isComplete]);

  const handleTyping = (e) => {
    // Log the current state for debugging
    console.log("Typing attempt with state:", { 
      isStarted: gameState.isStarted, 
      isComplete: gameState.isComplete,
      isCreator: gameState.isCreator,
      textLength: gameState.text?.length || 0
    });
    
    // If the game hasn't started or is complete, block typing
    if (!gameState.isStarted || gameState.isComplete) {
      console.log("Typing blocked:", { 
        isStarted: gameState.isStarted, 
        isComplete: gameState.isComplete,
        isCreator: gameState.isCreator
      });
      
      // If the creator is trying to type but the game hasn't officially started,
      // we'll still allow it for testing purposes
      if (gameState.isCreator && !gameState.isComplete) {
        console.log("Creator override: allowing typing even though game hasn't started");
        // Force the game to start for the creator
        setGameState(prev => ({
          ...prev,
          isStarted: true,
          // Ensure we have a text to type
          text: prev.text || "The quick brown fox jumps over the lazy dog."
        }));
      } else {
        return;
      }
    }

    // Ensure we have a text to type against
    if (!gameState.text) {
      console.error("No text to type against!");
      setGameState(prev => ({
        ...prev,
        text: "The quick brown fox jumps over the lazy dog."
      }));
      return;
    }

    const typed = e.target.value;
    console.log("Typing:", { 
      typed: typed.substring(0, 20) + "...", 
      typedLength: typed.length,
      targetLength: gameState.text.length
    });
    
    const targetText = gameState.text;
    const accuracy = calculateAccuracy(typed, targetText);
    const progress = Math.min((typed.length / targetText.length) * 100, 100);
    const wpm = calculateWPM(typed, 60 - gameState.timeLeft);

    // Update game state
    setGameState(prev => {
      const newState = {
        ...prev,
        typed,
        accuracy,
        progress,
        wpm,
      };
      
      // Check if completed
      if (typed === targetText) {
        console.log("Text match detected - completing game");
        newState.isComplete = true;
        setTimeout(() => handleGameComplete(), 0);
      }
      
      return newState;
    });

    // Send progress to other players
    if (socket && isConnected) {
      console.log("Sending progress update:", { progress, wpm, accuracy });
      socket.emit("typing-progress", {
        roomId,
        progress,
        wpm,
        accuracy,
      });
    }
  };

  const handleGameComplete = () => {
    console.log("Game complete called with state:", {
      wpm: gameState.wpm,
      accuracy: gameState.accuracy,
      progress: gameState.progress
    });
    
    setGameState(prev => {
      const finalState = { 
        ...prev, 
        isComplete: true,
        progress: 100
      };
      console.log("Setting final game state:", finalState);
      return finalState;
    });
    
    if (socket && isConnected) {
      const stats = {
        wpm: gameState.wpm,
        accuracy: gameState.accuracy,
        progress: 100,
      };
      console.log("Emitting game-completed with stats:", stats);
      socket.emit("game-completed", {
        roomId,
        stats
      });
    }
  };

  const calculateWPM = (text, timeElapsed) => {
    const words = text.trim().split(/\s+/).length;
    const minutes = timeElapsed / 60;
    return Math.round(words / minutes) || 0;
  };

  const calculateAccuracy = (typed, target) => {
    if (!typed) return 100;
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === target[i]) correct++;
    }
    return Math.round((correct / typed.length) * 100);
  };

  const handleStartGame = () => {
    if (socket && isConnected && gameState.isCreator) {
      console.log("Creator starting the game", {
        roomId,
        socketId: socket.id,
        isConnected,
        isCreator: gameState.isCreator
      });
      socket.emit("start-game", roomId);
    } else {
      console.error("Cannot start game:", {
        hasSocket: !!socket,
        isConnected,
        isCreator: gameState.isCreator,
        roomId
      });
    }
  };

  const handleDeleteRoom = async () => {
    if (!gameState.isCreator || !roomId) return;
    
    try {
      console.log("Attempting to delete room:", roomId);
      
      // Delete room from the specific room endpoint
      const deleteSpecificRoom = await fetch(`/api/room/${roomId}`, {
        method: 'DELETE',
      });
      
      // Delete room from rooms list
      const deleteFromRooms = await fetch('/api/room', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId }),
      });

      if (deleteSpecificRoom.ok && deleteFromRooms.ok) {
        console.log("Room deleted successfully");
        // Emit room deleted event to notify other players
        if (socket && isConnected) {
          socket.emit("room-deleted", { roomId });
        }
        // Navigate back to multiplayer page
        router.push('/multiplayer');
      } else {
        console.error("Failed to delete room");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  // Add socket listener for room deletion
  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on("room-deleted", () => {
      console.log("Room was deleted by creator");
      router.push('/multiplayer');
    });

    return () => {
      socket.off("room-deleted");
    };
  }, [socket, isConnected, router]);

  // Debug logging for game state and opponents
  useEffect(() => {
    console.log("Current game state:", {
      isStarted: gameState.isStarted,
      isCreator: gameState.isCreator,
      text: gameState.text?.substring(0, 20) + "...",
      progress: gameState.progress,
      opponents: Array.from(opponents.entries()).map(([id, data]) => ({
        id,
        name: `${data.firstName} ${data.lastName}`,
        progress: data.progress
      }))
    });
  }, [gameState.isStarted, gameState.progress, opponents]);

  // Debug function to help diagnose issues
  const debugGameState = () => {
    console.log("=== GAME STATE DEBUG ===");
    console.log("Game State:", {
      isStarted: gameState.isStarted,
      isCreator: gameState.isCreator,
      text: gameState.text?.substring(0, 30) + "...",
      textLength: gameState.text?.length || 0,
      typed: gameState.typed?.substring(0, 30) + "...",
      typedLength: gameState.typed?.length || 0,
      progress: gameState.progress,
      timeLeft: gameState.timeLeft,
      isComplete: gameState.isComplete
    });
    console.log("Opponents:", Array.from(opponents.entries()).map(([id, data]) => ({
      id,
      name: `${data.firstName} ${data.lastName}`,
      progress: data.progress
    })));
    console.log("Socket:", {
      id: socket?.id,
      connected: socket?.connected,
      disconnected: socket?.disconnected
    });
    console.log("Room ID:", roomId);
    console.log("=== END DEBUG ===");
    
    // Force the game to start if it hasn't
    if (!gameState.isStarted && !gameState.isComplete) {
      setGameState(prev => ({
        ...prev,
        isStarted: true,
        text: prev.text || "The quick brown fox jumps over the lazy dog."
      }));
      
      // Focus the textarea
      setTimeout(() => {
        const textarea = document.querySelector('textarea');
        if (textarea) {
          textarea.disabled = false;
          textarea.focus();
          console.log("Focused on textarea from debug function");
        }
      }, 100);
    }
  };

  // Render loading state
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Connecting to game...</h2>
          <p className="text-neutral-400">Please wait while we establish connection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Countdown Overlay */}
      {showCountdown && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-6xl font-bold text-white animate-pulse">
            {countdownValue}
          </div>
        </div>
      )}

      {/* Game Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-white">Multiplayer Race</h1>
          {gameState.isCreator && !gameState.isStarted && !showCountdown && (
            <button
              onClick={handleDeleteRoom}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Delete Room
            </button>
          )}
        </div>
        <div className="flex justify-between items-center bg-neutral-800 p-4 rounded-lg">
          <div className="text-2xl font-bold text-white">
            Time: {gameState.timeLeft}s
          </div>
          <div className="flex gap-6">
            <div className="text-green-400">WPM: {gameState.wpm}</div>
            <div className="text-blue-400">Accuracy: {gameState.accuracy}%</div>
          </div>
        </div>
      </div>

      {/* Start Game Button for Creator */}
      {gameState.isCreator && !gameState.isStarted && !showCountdown && (
        <div className="mb-8">
          <button
            onClick={handleStartGame}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Start Game
          </button>
        </div>
      )}

      {/* Typing Area */}
      <div className="mb-8">
        <div className="bg-neutral-800 p-4 rounded-lg mb-4">
          <p className="text-lg text-neutral-400 leading-relaxed">{gameState.text}</p>
        </div>
        <textarea
          className={`w-full bg-neutral-700 text-white p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${
            gameState.isStarted && !gameState.isComplete ? 'border-2 border-green-500' : 'border-2 border-neutral-600'
          }`}
          rows="3"
          value={gameState.typed}
          onChange={handleTyping}
          disabled={!gameState.isStarted || gameState.isComplete}
          placeholder={
            !gameState.isStarted
              ? gameState.isCreator
                ? "Click the Start Game button when ready..."
                : "Waiting for creator to start the game..."
              : "Start typing..."
          }
          ref={(textarea) => {
            // Auto-focus the textarea when the game starts
            if (gameState.isStarted && !gameState.isComplete && textarea) {
              textarea.focus();
            }
          }}
        />
        {!gameState.isStarted && (
          <p className="mt-2 text-sm text-neutral-400">
            {gameState.isCreator 
              ? "As the creator, you can start the game when all players are ready." 
              : "Waiting for the room creator to start the game..."}
          </p>
        )}
        
        {/* Debug Button - Only visible in development */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={debugGameState}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Debug: Fix Game State
          </button>
          
          <div className="text-white">
            Status: {gameState.isStarted ? "Started" : "Not Started"} | 
            Creator: {gameState.isCreator ? "Yes" : "No"} | 
            Complete: {gameState.isComplete ? "Yes" : "No"}
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-2">Race Progress</h3>
        
        {/* Race Track - Visual comparison of all players */}
        <div className="relative h-16 bg-neutral-800 rounded-lg mb-6 overflow-hidden">
          {/* Track markings */}
          <div className="absolute inset-0 flex justify-between px-2">
            <div className="border-l border-neutral-600 h-full"></div>
            <div className="border-l border-neutral-600 h-full"></div>
            <div className="border-l border-neutral-600 h-full"></div>
            <div className="border-l border-neutral-600 h-full"></div>
            <div className="border-l border-neutral-600 h-full"></div>
          </div>
          
          {/* Finish line */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-500"></div>
          
          {/* Your position */}
          <div 
            className="absolute top-2 h-6 w-10 bg-green-500 rounded-full flex items-center justify-center transition-all duration-300 transform -translate-x-1/2"
            style={{ 
              left: `${gameState.progress}%`,
              zIndex: 10
            }}
          >
            <span className="text-xs font-bold text-white">You</span>
          </div>
          
          {/* Opponent positions */}
          {Array.from(opponents.entries()).map(([socketId, data], index) => (
            <div 
              key={socketId}
              className="absolute h-6 w-10 rounded-full flex items-center justify-center transition-all duration-300 transform -translate-x-1/2"
              style={{ 
                left: `${data.progress}%`,
                top: index % 2 === 0 ? '2.5rem' : '0.5rem',
                backgroundColor: `hsl(${(index * 40) + 200}, 70%, 50%)`,
                zIndex: 5
              }}
            >
              <span className="text-xs font-bold text-white truncate w-full text-center">
                {data.firstName?.charAt(0) || '?'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}