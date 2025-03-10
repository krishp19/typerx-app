import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";

const JoinRoomModal = ({ onClose }) => {
  const { user } = useUser();
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/join-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user?.id,
        },
        body: JSON.stringify({ roomId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join room");
      }

      setSuccess("Successfully joined the room!");
      setTimeout(() => onClose(), 1500); // Close modal after success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // Close when clicking outside the modal
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-neutral-900 p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-white text-2xl hover:text-gray-400"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-green-400 text-center">Join Room</h2>
        <p className="text-neutral-400 text-sm text-center mt-2">
          Enter the Room ID and password to join an active game.
        </p>

        <form className="mt-6" onSubmit={handleJoinRoom}>
          <div className="mb-4">
            <label className="text-white text-sm">Room ID</label>
            <input
              type="text"
              className="w-full mt-1 p-3 bg-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-green-400 border border-neutral-700 outline-none"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 bg-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-green-400 border border-neutral-700 outline-none"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>}
          {success && <p className="text-green-400 text-sm text-center mt-2">{success}</p>}

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition duration-200 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="border-4 border-white border-t-transparent rounded-full w-5 h-5"
              />
            ) : (
              "Join Room"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default JoinRoomModal;
