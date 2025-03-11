"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSocket } from "../../hooks/useSocket";
import { useUser } from "@clerk/clerk-react";

export default function CompetePage() {
  const searchParams = useSearchParams();
  const socket = useSocket();
  const { user } = useUser();
  const roomId = searchParams.get("roomId");

  const [gameState, setGameState] = useState({
    isStarted: false,
    countdown: 3,
    timeLeft: 60,
    text: "The quick brown fox jumps over the lazy dog and the cat sleeps peacefully.", // Sample text
    typed: "",
    wpm: 0,
    accuracy: 100,
    progress: 0,
    isComplete: false,
  });

  const [opponents, setOpponents] = useState(new Map());
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);

  useEffect(() => {
    if (!socket || !roomId || !user) return;

    // Join the room when component mounts
    socket.emit("join-room", {
      roomId,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    // Listen for game events
    socket.on("game-starting", () => {
      setShowCountdown(true);
    });

    socket.on("countdown", (count) => {
      setCountdownValue(count);
    });

    socket.on("game-started", () => {
      setShowCountdown(false);
      setGameState(prev => ({ ...prev, isStarted: true }));
    });

    socket.on("update-progress", ({ socketId, progress, wpm, accuracy }) => {
      setOpponents(prev => new Map(prev).set(socketId, { progress, wpm, accuracy }));
    });

    socket.on("player-completed", ({ socketId, stats }) => {
      setOpponents(prev => new Map(prev).set(socketId, { ...stats, completed: true }));
    });

    return () => {
      socket.off("game-starting");
      socket.off("countdown");
      socket.off("game-started");
      socket.off("update-progress");
      socket.off("player-completed");
    };
  }, [socket, roomId, user]);

  // Game timer
  useEffect(() => {
    if (!gameState.isStarted || gameState.isComplete) return;

    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeLeft: prev.timeLeft - 1,
      }));
    }, 1000);

    if (gameState.timeLeft === 0) {
      handleGameComplete();
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [gameState.isStarted, gameState.timeLeft, gameState.isComplete]);

  const handleTyping = (e) => {
    if (!gameState.isStarted || gameState.isComplete) return;

    const typed = e.target.value;
    const targetText = gameState.text;
    const accuracy = calculateAccuracy(typed, targetText);
    const progress = (typed.length / targetText.length) * 100;
    const wpm = calculateWPM(typed, 60 - gameState.timeLeft);

    setGameState(prev => ({
      ...prev,
      typed,
      accuracy,
      progress,
      wpm,
    }));

    // Send progress to other players
    socket.emit("typing-progress", {
      roomId,
      progress,
      wpm,
      accuracy,
    });

    // Check if completed
    if (typed === targetText) {
      handleGameComplete();
    }
  };

  const handleGameComplete = () => {
    setGameState(prev => ({ ...prev, isComplete: true }));
    
    socket.emit("game-completed", {
      roomId,
      stats: {
        wpm: gameState.wpm,
        accuracy: gameState.accuracy,
        progress: gameState.progress,
      },
    });
  };

  const calculateWPM = (text, timeElapsed) => {
    const words = text.trim().split(/\s+/).length;
    const minutes = timeElapsed / 60;
    return Math.round(words / minutes) || 0;
  };

  const calculateAccuracy = (typed, target) => {
    if (typed.length === 0) return 100;
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === target[i]) correct++;
    }
    return Math.round((correct / typed.length) * 100);
  };

  if (!roomId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Room ID is required</div>
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
        <h1 className="text-3xl font-bold text-white mb-4">Multiplayer Race</h1>
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

      {/* Typing Area */}
      <div className="mb-8">
        <div className="bg-neutral-800 p-4 rounded-lg mb-4">
          <p className="text-lg text-neutral-400 leading-relaxed">{gameState.text}</p>
        </div>
        <textarea
          className="w-full bg-neutral-700 text-white p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="3"
          value={gameState.typed}
          onChange={handleTyping}
          disabled={!gameState.isStarted || gameState.isComplete}
          placeholder={gameState.isStarted ? "Start typing..." : "Waiting for game to start..."}
        />
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        {/* Your Progress */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-white font-medium">You</span>
            <div className="flex gap-4">
              <span className="text-green-400">{gameState.wpm} WPM</span>
              <span className="text-blue-400">{gameState.accuracy}%</span>
            </div>
          </div>
          <div className="w-full bg-neutral-700 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${gameState.progress}%` }}
            />
          </div>
        </div>

        {/* Opponent Progress Bars */}
        {Array.from(opponents.entries()).map(([socketId, data]) => (
          <div key={socketId}>
            <div className="flex justify-between mb-2">
              <span className="text-white font-medium">Opponent</span>
              <div className="flex gap-4">
                <span className="text-green-400">{data.wpm} WPM</span>
                <span className="text-blue-400">{data.accuracy}%</span>
              </div>
            </div>
            <div className="w-full bg-neutral-700 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${data.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Game Complete Screen */}
      {gameState.isComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-neutral-900 p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-white mb-6">Race Complete!</h2>
            
            {/* Your Results */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Your Results</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">WPM</span>
                  <span className="text-green-400 font-medium">{gameState.wpm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Accuracy</span>
                  <span className="text-blue-400 font-medium">{gameState.accuracy}%</span>
                </div>
              </div>
            </div>

            {/* Opponent Results */}
            {opponents.size > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Opponent Results</h3>
                <div className="space-y-4">
                  {Array.from(opponents.entries()).map(([socketId, data]) => (
                    <div key={socketId} className="bg-neutral-800 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-neutral-400">WPM</span>
                        <span className="text-green-400 font-medium">{data.wpm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Accuracy</span>
                        <span className="text-blue-400 font-medium">{data.accuracy}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 