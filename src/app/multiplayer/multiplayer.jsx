"use client"

import React, { useEffect, useState } from "react"
import CreateRoomForm from "../../components/createRoomModal"
import JoinRoomModal from "../../components/joinRoomModal"
import { useUser } from "@clerk/clerk-react"

function Multiplayer() {
  const { user, isLoaded } = useUser()
  const [showCreateRoomForm, setShowCreateRoomForm] = useState(false)
  const [showJoinRoomModal, setShowJoinRoomModal] = useState(false)
  const [createdRoom, setCreatedRoom] = useState(null)
  const [activeRooms, setActiveRooms] = useState([])
  const [joinedRooms, setJoinedRooms] = useState([])
  const [loadingRooms, setLoadingRooms] = useState(false)

  // Hardcoded recent winners
  const recentWinners = [
    { id: 1, name: "Alice", wpm: 120, accuracy: "98%" },
    { id: 2, name: "Bob", wpm: 110, accuracy: "95%" },
    { id: 3, name: "Charlie", wpm: 115, accuracy: "97%" },
    { id: 4, name: "David", wpm: 105, accuracy: "94%" },
  ]

  // Toggle Create Room Modal
  const handleCreateRoomClick = () => {
    setShowCreateRoomForm(!showCreateRoomForm)
    setCreatedRoom(null)
  }

  // Toggle Join Room Modal
  const handleJoinRoomClick = () => {
    setShowJoinRoomModal(!showJoinRoomModal)
  }

  // Close Join Room Modal
  const closeJoinRoomModal = () => {
    setShowJoinRoomModal(false)
  }

  // Fetch active and joined rooms
  useEffect(() => {
    if (isLoaded && user) {
      const fetchRooms = async () => {
        setLoadingRooms(true)
        try {
          const response = await fetch("http://localhost:3000/api/room", {
            method: "GET",
            headers: {
              "x-user-id": user.id,
            },
          })
          const data = await response.json()
  
          if (response.ok) {
            const allRooms = data.rooms || []
  
            // Filter rooms where the current user is in the players array
            const userJoinedRooms = allRooms.filter((room) =>
              room.players.includes(user.id)
            )
  
            setActiveRooms(allRooms)
            setJoinedRooms(userJoinedRooms)
          } else {
            setActiveRooms([])
            setJoinedRooms([])
          }
        } catch (error) {
          console.error("Error fetching rooms:", error)
        } finally {
          setLoadingRooms(false)
        }
      }
  
      fetchRooms()
    }
  }, [isLoaded, user])
  

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">
            Multiplayer Arena
          </h2>
          <p className="text-neutral-400">
            Race against friends or join random matches
          </p>
        </div>

        {/* Multiplayer Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Quick Race - Opens Join Room Modal */}
          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-green-400 transition duration-200 cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-2">Quick Race</h3>
            <p className="text-neutral-400 mb-4">
              Join a random match instantly with players of similar skill level
            </p>
            <button
              onClick={handleJoinRoomClick}
              className="w-full py-3 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200"
            >
              Join Match
            </button>
          </div>

          {/* Create Private Room */}
          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-green-400 transition duration-200 cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-2">
              Create Private Room
            </h3>
            <p className="text-neutral-400 mb-4">
              Create a private room and invite your friends to compete
            </p>
            <button
              onClick={handleCreateRoomClick}
              className="w-full py-3 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200"
            >
              {showCreateRoomForm ? "Cancel" : "Create Room"}
            </button>
          </div>

          {/* Tournament Section */}
          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-green-400 transition duration-200 cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-2">Tournament</h3>
            <p className="text-neutral-400 mb-4">
              Join competitive tournaments with prizes and rankings
            </p>
            <button className="w-full py-3 bg-neutral-700 text-green-400 rounded-lg font-medium hover:bg-neutral-600 transition-colors duration-200">
              View Tournaments
            </button>
          </div>
        </div>

        {/* Joined Rooms Section */}

      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-white mb-4">Joined Rooms</h3>
        {loadingRooms ? (
          <p className="text-neutral-400">Loading joined rooms...</p>
        ) : joinedRooms.length > 0 ? (
          <ul className="space-y-3">
            {joinedRooms.map((room) => (
              <li
                key={room.roomId}
                className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 text-white flex justify-between"
              >
                <span>{room.roomName}</span>
                <span className="text-neutral-400">Max: {room.maxPlayers}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-400">You haven't joined any rooms yet.</p>
        )}
      </div>


        {/* Recent Winners Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-4">Recent Winners</h3>
          <ul className="space-y-3">
            {recentWinners.map((winner) => (
              <li
                key={winner.id}
                className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex justify-between"
              >
                <span className="text-white font-medium">{winner.name}</span>
                <span className="text-green-400">{winner.wpm} WPM ({winner.accuracy})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Create Room Modal */}
        {showCreateRoomForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-neutral-900 p-6 rounded-lg shadow-lg w-96 relative">
              <button
                onClick={handleCreateRoomClick}
                className="absolute top-2 right-2 text-white text-xl hover:text-gray-400"
              >
                &times;
              </button>
              <CreateRoomForm onRoomCreated={(roomName) => setCreatedRoom(roomName)} />
            </div>
          </div>
        )}


        {/* Join Room Modal */}
        {showJoinRoomModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-neutral-900 p-6 rounded-lg shadow-lg w-96 relative">
              <button
                onClick={closeJoinRoomModal}
                className="absolute top-2 right-2 text-white text-xl hover:text-gray-400"
              >
                &times;
              </button>
              <JoinRoomModal onClose={closeJoinRoomModal} />
            </div>
          </div>
        )}

      </div>
    </section>
  )
}

export default Multiplayer
