import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'

function CreateRoomForm({ onRoomCreated }) {
  const { user, isLoaded } = useUser()
  const [roomName, setRoomName] = useState('')
  const [password, setPassword] = useState('')
  const [maxPlayers, setMaxPlayers] = useState(1)
  const [roomType, setRoomType] = useState('public')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [roomId, setRoomId] = useState(null)

  if (!isLoaded) return <div>Loading...</div>

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      toast.error('You must be logged in to create a room.')
      return
    }

    const maxPlayersInt = parseInt(maxPlayers, 10)
    if (!roomName.trim() || maxPlayersInt < 1 || maxPlayersInt > 10) {
      toast.error('Please enter a valid room name and number of players (1-10).')
      return
    }

    try {
      setIsSubmitting(true)

      const res = await fetch('http://localhost:3000/api/create-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify({
          roomName,
          password: roomType === 'private' ? password : null,
          maxPlayers: maxPlayersInt,
          roomType,
        }),
      })

      // Log the raw response for debugging
      console.log('Response status:', res.status);
      const responseText = await res.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        toast.error('Invalid response from server. Please try again.');
        return;
      }

      if (res.ok && data.success) {
        toast.success(`Room "${roomName}" created successfully!`);
        setRoomId(data.room.roomId)

        if (typeof onRoomCreated === 'function') {
          onRoomCreated(data.room.roomId)
        }

        setTimeout(() => {
          resetForm()
        }, 3000)
      } else {
        toast.error(data.error || 'Error creating room.');
      }
    } catch (error) {
      console.error('Error creating room:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setRoomName('')
    setPassword('')
    setMaxPlayers(1)
    setRoomType('public')
  }

  const copyToClipboard = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId).then(() => {
        toast.success('Room ID copied to clipboard!')
      }).catch((err) => {
        console.error('Failed to copy:', err)
        toast.error('Failed to copy Room ID.')
      })
    }
  }

  return (
    <div className="max-w-lg mx-auto flex items-center justify-center bg-neutral-900 rounded-lg shadow-lg overflow-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-neutral-900 p-6 rounded-lg shadow-lg w-96 relative"
      >
        <h2 className="text-xl font-bold text-white mb-4">Create a Room</h2>

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
              className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border-2 border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Room Type</label>
            <div className="flex space-x-4">
              <button
                type="button"
                className={`flex-1 px-4 py-2 rounded-lg text-white ${
                  roomType === 'public' ? 'bg-green-500' : 'bg-neutral-700'
                }`}
                onClick={() => setRoomType('public')}
              >
                Public
              </button>
              <button
                type="button"
                className={`flex-1 px-4 py-2 rounded-lg text-white ${
                  roomType === 'private' ? 'bg-green-500' : 'bg-neutral-700'
                }`}
                onClick={() => setRoomType('private')}
              >
                Private
              </button>
            </div>
          </div>

          {roomType === 'private' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <label htmlFor="password" className="block text-sm font-semibold text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border-2 border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              />
            </motion.div>
          )}

          <div>
            <label htmlFor="maxPlayers" className="block text-sm font-semibold text-white">
              Max Players (1-10)
            </label>
            <input
              type="number"
              id="maxPlayers"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(e.target.value)}
              required
              min="1"
              max="10"
              className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border-2 border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ease-in-out ${
              isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400'
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Create Room'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default CreateRoomForm
