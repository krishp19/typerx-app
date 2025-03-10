"use client"

import React, { useEffect, useState } from 'react'
import CreateRoomForm from '../../components/createRoomModal'
import { useUser } from '@clerk/clerk-react'

function Multiplayer() {

  const { user, isLoaded } = useUser()  
  const [showCreateRoomForm, setShowCreateRoomForm] = useState(false)
  const [createdRoom, setCreatedRoom] = useState(null) 
  const [activeRooms, setActiveRooms] = useState([])
  const [loading, setLoading] = useState(false) 

  // Function to toggle form visibility
  const handleCreateRoomClick = () => {
    setShowCreateRoomForm(!showCreateRoomForm)
    setCreatedRoom(null) // Reset room creation on toggling form
  }

  // Callback function to handle room creation success
  const handleRoomCreated = (roomName) => {
    setCreatedRoom(roomName)
  }

  // Fetch active rooms when the component mounts and user is loaded
  useEffect(() => {
    if (isLoaded && user) {
      const fetchActiveRooms = async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/room', {
            method: 'GET',
            headers: {
              'x-user-id': user.id // Use the user ID from the useUser hook
            }
          });
          const data = await response.json();

          if (response.ok) {
            setActiveRooms(data.rooms); // Assuming `data.rooms` contains an array of the user's rooms
          } else {
            setActiveRooms([]); // No rooms found for the user
          }
        } catch (error) {
          console.error('Error fetching active rooms:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchActiveRooms();
    }
  }, [isLoaded, user]); // Re-run this effect when `user` is available and loaded

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate__animated animate__fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">Multiplayer Arena</h2>
          <p className="text-neutral-400">Race against friends or join random matches</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-green-400 transition-duration-200 cursor-pointer animate__animated animate__fadeInUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Quick Race</h3>
              <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm">15 Online</span>
            </div>
            <p className="text-neutral-400 mb-4">Join a random match instantly with players of similar skill level</p>
            <button className="w-full py-3 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200">
              Join Match
            </button>
          </div>

          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-green-400 transition-duration-200 cursor-pointer animate__animated animate__fadeInUp animate__delay-1s">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Create Private Room</h3>
              <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm">Custom</span>
            </div>
            <p className="text-neutral-400 mb-4">Create a private room and invite your friends to compete</p>
            <button
              onClick={handleCreateRoomClick}  // Toggle form visibility
              className="w-full py-3 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200"
            >
              {showCreateRoomForm ? 'Cancel' : 'Create Room'}
            </button>

            {/* Conditionally render CreateRoomForm based on state and pass onRoomCreated */}
            {showCreateRoomForm && <CreateRoomForm onRoomCreated={handleRoomCreated} />}
          </div>

          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-green-400 transition-duration-200 cursor-pointer animate__animated animate__fadeInUp animate__delay-2s">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Tournament</h3>
              <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm">Premium</span>
            </div>
            <p className="text-neutral-400 mb-4">Join competitive tournaments with prizes and rankings</p>
            <button className="w-full py-3 bg-neutral-700 text-green-400 rounded-lg font-medium hover:bg-neutral-600 transition-colors duration-200">
              View Tournaments
            </button>
          </div>
        </div>

        {/* Show success message in active matches if a room is created */}
        <div className="bg-neutral-800 rounded-xl p-6 animate__animated animate__fadeInUp animate__delay-3s">
  <h3 className="text-xl font-semibold text-white mb-6">Joined Rooms</h3>
  {loading ? (
    <p className="text-neutral-400">Loading active rooms...</p>
  ) : (
    activeRooms.length > 0 ? (
      activeRooms.map((room, index) => (
        <div key={index} className="bg-neutral-900 p-4 rounded-lg mt-6 border-2 border-neutral-700 hover:border-green-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-between">
          {/* Room name and player count */}
          <div className="flex items-center">
            <p className="text-lg font-semibold text-white mr-4">{room.roomName}</p>
            <span className="bg-green-400/30 text-green-400 px-3 py-1 rounded-full text-sm">
              {room.players.length} / {room.maxPlayers} Players
            </span>
          </div>

          {/* Join Room Button */}
          <div>
            <button className="bg-green-500 text-neutral-900 px-4 py-2 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200">
              Join Room
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-neutral-400">No joined rooms found</p>
    )
  )}
</div>



        {/* Show recent winners */}
        <div className="mt-12 bg-neutral-800 rounded-xl p-6 animate__animated animate__fadeInUp animate__delay-4s">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Winners</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-900 rounded-lg p-4 flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-neutral-900 font-bold">1</div>
              <div>
                <div className="text-white font-semibold">SpeedDemon</div>
                <div className="text-green-400">145 WPM</div>
              </div>
            </div>
            <div className="bg-neutral-900 rounded-lg p-4 flex items-center space-x-4">
              <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div>
                <div className="text-white font-semibold">TypeMaster</div>
                <div className="text-green-400">138 WPM</div>
              </div>
            </div>
            <div className="bg-neutral-900 rounded-lg p-4 flex items-center space-x-4">
              <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div>
                <div className="text-white font-semibold">SwiftKeys</div>
                <div className="text-green-400">132 WPM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Multiplayer
