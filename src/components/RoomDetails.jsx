"use client";

import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";

export default function RoomDetails({ roomId }) {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`/api/room/${roomId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch room details');
        }
        
        setRoom(data.room);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchRoomDetails();
    }
  }, [roomId]);

  if (loading) return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 text-red-500 bg-red-100 rounded-lg">
      Error: {error}
    </div>
  );

  if (!room) return (
    <div className="p-4 text-gray-500 bg-gray-100 rounded-lg">
      Room not found
    </div>
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {room.roomName}
        </h2>
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          {room.currentPlayers}/{room.maxPlayers} Players
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Room Creator
          </h3>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <img
              src={user?.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${room.creatorId}`}
              alt="Creator"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {user?.fullName || `User ${room.creatorId.substring(0, 8)}`}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Creator</p>
            </div>
          </div>
        </div>

        {room.players.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Players
            </h3>
            <div className="space-y-2">
              {room.players.map((playerId) => (
                <div key={playerId} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${playerId}`}
                    alt={`Player ${playerId}`}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {`User ${playerId.substring(0, 8)}`}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Player</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Created {new Date(room.createdAt).toLocaleString()}</span>
            <span>{room.isActive ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 