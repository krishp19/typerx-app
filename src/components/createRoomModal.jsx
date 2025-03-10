import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'

function CreateRoomForm({ onRoomCreated }) {
  const { user, isLoaded } = useUser()
  const [roomName, setRoomName] = useState('')
  const [password, setPassword] = useState('')
  const [maxPlayers, setMaxPlayers] = useState('')
  const [roomType, setRoomType] = useState('public')
  const [alert, setAlert] = useState({ show: false, message: '', type: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isLoaded) return <div>Loading...</div>

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      showAlert('You must be logged in to create a room.', 'error')
      return
    }

    if (!roomName.trim() || maxPlayers <= 0) {
      showAlert('Please enter a valid room name and number of players.', 'error')
      return
    }

    const userId = user.id

    try {
      setIsSubmitting(true)

      console.log('Sending API request with:', {
        roomName,
        password: roomType === 'private' ? password : null,
        maxPlayers,
        roomType,
        userId,
      })

      const res = await fetch('/api/create-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({
          roomName,
          password: roomType === 'private' ? password : null,
          maxPlayers,
          roomType,
        }),
      })

      console.log('API Response Status:', res.status)
      const data = await res.json()
      console.log('API Response Data:', data)

      if (res.ok && data.success) {
        showAlert(`Room "${roomName}" created successfully!`, 'success')

        try {
          if (typeof onRoomCreated === 'function') {
            onRoomCreated(roomName)
          } else {
            console.error('onRoomCreated is not a function!')
          }
        } catch (error) {
          console.error('Error calling onRoomCreated:', error)
        }

        resetForm()
      } else {
        showAlert(data.error || 'Error creating room.', 'error')
      }
    } catch (error) {
      console.error('Error creating room:', error)
      showAlert('Something went wrong. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setRoomName('')
    setPassword('')
    setMaxPlayers('')
    setRoomType('public')
  }

  const showAlert = (message, type) => {
    try {
      setAlert({ show: true, message, type })
      setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000)
    } catch (error) {
      console.error('Error setting alert:', error)
    }
  }

  return (
    <div className="max-w-lg mx-auto  flex items-center justify-center bg-neutral-900 rounded-lg shadow-lg overflow-auto ">
      <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-900 p-6 rounded-lg shadow-lg w-96 relative"
      >
      <AnimatePresence>
        {alert.show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`fixed top-5 right-5 px-6 py-3 rounded-lg text-white shadow-lg ${
              alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {alert.message}
          </motion.div>
        )}
      </AnimatePresence>
      
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
