import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'

function CreateRoomForm({ onRoomCreated }) {
  const { user, isLoaded } = useUser()
  const [roomName, setRoomName] = useState('')
  const [password, setPassword] = useState('')
  const [maxPlayers, setMaxPlayers] = useState('')
  const [roomType, setRoomType] = useState('public') // Toggle between public and private
  const [alert, setAlert] = useState({ show: false, message: '', type: '' }) // Alert state
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isLoaded) return <div>Loading...</div>

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      showAlert('You must be logged in to create a room.', 'error')
      return
    }

    const userId = user.id

    try {
      setIsSubmitting(true)
      const res = await fetch('/api/create-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({
          roomName,
          password: roomType === 'private' ? password : null, // Include password only if private
          maxPlayers,
          roomType,
        }),
      })

      const data = await res.json()

      if (data.message) {
        showAlert(`Room "${roomName}" created successfully!`, 'success')
        onRoomCreated(roomName)
      } else {
        showAlert(data.error || 'Error creating room.', 'error')
      }
    } catch (error) {
      showAlert('Something went wrong. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to show alert
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type })
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000) // Auto-hide after 3s
  }

  return (
    <div className="space-y-6 mt-4 relative">
      {/* Custom Alert */}
      <AnimatePresence>
        {alert.show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`fixed top-5 right-5 px-6 py-4 rounded-lg text-white shadow-lg ${
              alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {alert.message}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="roomName" className="block text-sm font-semibold text-white">
            Room Name
          </label>
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border-2 border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        {/* Toggle for Public / Private Room */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Room Type</label>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg text-white ${
                roomType === 'public' ? 'bg-green-500' : 'bg-neutral-700'
              }`}
              onClick={() => setRoomType('public')}
            >
              Public
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg text-white ${
                roomType === 'private' ? 'bg-green-500' : 'bg-neutral-700'
              }`}
              onClick={() => setRoomType('private')}
            >
              Private
            </button>
          </div>
        </div>

        {/* Show password field only if Private Room is selected */}
        {roomType === 'private' && (
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border-2 border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
        )}

        <div>
          <label htmlFor="maxPlayers" className="block text-sm font-semibold text-white">
            Max Players
          </label>
          <input
            type="number"
            id="maxPlayers"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border-2 border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 ${
            isSubmitting ? 'bg-gray-500' : 'bg-green-500'
          } text-neutral-900 rounded-lg font-semibold hover:bg-green-400 transition-colors duration-200 ease-in-out`}
        >
          {isSubmitting ? 'Creating...' : 'Create Room'}
        </button>
      </form>
    </div>
  )
}

export default CreateRoomForm
