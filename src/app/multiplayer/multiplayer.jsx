"use client"

import React, { useEffect, useState } from "react"
import CreateRoomForm from "../../components/createRoomModal"
import JoinRoomModal from "../../components/joinRoomModal"
import UserDetails from "../../components/UserDetails"
import { useUser } from "@clerk/clerk-react"
import { useSocket } from "../../hooks/useSocket"
import { useRouter } from "next/navigation"

function Multiplayer() {
  const router = useRouter()
  const socket = useSocket()
  const { user, isLoaded } = useUser()
  const [showCreateRoomForm, setShowCreateRoomForm] = useState(false)
  const [showJoinRoomModal, setShowJoinRoomModal] = useState(false)
  const [createdRoom, setCreatedRoom] = useState(null)
  const [activeRooms, setActiveRooms] = useState([])
  const [joinedRooms, setJoinedRooms] = useState([])
  const [loadingRooms, setLoadingRooms] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [roomDetails, setRoomDetails] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [showRoomDetails, setShowRoomDetails] = useState(false)
  const [roomPlayers, setRoomPlayers] = useState([])
  const [isCreator, setIsCreator] = useState(false)
  const [countdown, setCountdown] = useState(null)

  // Hardcoded recent winners
  const recentWinners = [
    { id: 1, name: "Alice", wpm: 120, accuracy: "98%" },
    { id: 2, name: "Bob", wpm: 110, accuracy: "95%" },
    { id: 3, name: "Charlie", wpm: 115, accuracy: "97%" },
    { id: 4, name: "David", wpm: 105, accuracy: "94%" },
  ]

  // Toggle Create Room Modal
  const handleCreateRoomClick = () => {
    setShowCreateRoomForm(!showCreateRoomForm);
    setCreatedRoom(null); // Reset when opening modal
  };
  

  // Toggle Join Room Modal
  const handleJoinRoomClick = () => {
    setShowJoinRoomModal(!showJoinRoomModal)
  }

  // Close Join Room Modal
  const closeJoinRoomModal = () => {
    setShowJoinRoomModal(false)
  }

  // Copy Room ID to Clipboard
  const copyRoomId = async () => {
    if (createdRoom) {
      try {
        await navigator.clipboard.writeText(createdRoom);
        alert("Room ID copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy room ID:", err);
        alert("Failed to copy room ID. Please try again.");
      }
    }
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

      // Set up periodic refresh of room list (every 30 seconds)
      const refreshInterval = setInterval(fetchRooms, 30000);
      
      // Clean up interval on unmount
      return () => clearInterval(refreshInterval);
    }
  }, [isLoaded, user])
  

  // Handle room click and fetch details
  const handleRoomClick = async (room) => {
    if (!isLoaded || !user) return;

    setSelectedRoom(room);
    setLoadingDetails(true);
    setShowRoomDetails(true);

    try {
      // Fetch room details
      const roomResponse = await fetch(`http://localhost:3000/api/room/${room.roomId}`, {
        method: "GET",
        headers: {
          "x-user-id": user.id,
        },
      });

      if (!roomResponse.ok) {
        // Room might have been deleted
        if (roomResponse.status === 404) {
          // Remove the room from the lists
          setJoinedRooms(prevRooms => prevRooms.filter(r => r.roomId !== room.roomId));
          setActiveRooms(prevRooms => prevRooms.filter(r => r.roomId !== room.roomId));
          
          setShowRoomDetails(false);
          setSelectedRoom(null);
          setLoadingDetails(false);
          alert("This room no longer exists. It may have been deleted by the creator.");
          return;
        }
        throw new Error(`Failed to fetch room: ${roomResponse.statusText}`);
      }

      const responseData = await roomResponse.json();
      const roomData = responseData.room;
      console.log("Received room data:", roomData);

      if (!roomData) {
        throw new Error("No room data received");
      }

      // Check if user is already in the room
      const isUserInRoom = roomData.players.includes(user.id);
      
      // Join the room when clicking on it (only if not already in the room)
      if (socket && !isUserInRoom) {
        console.log("Joining room:", roomData.roomId);
        
        // Call the join API first
        const joinResponse = await fetch("/api/room/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomId: roomData.roomId,
            userId: user.id,
          }),
        });
        
        const joinData = await joinResponse.json();
        
        if (!joinResponse.ok) {
          throw new Error(joinData.error || "Failed to join room");
        }
        
        // Then emit socket event to notify other users
        socket.emit("join-room", {
          roomId: roomData.roomId,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
            email: user.emailAddresses?.[0]?.emailAddress
          },
        });
      } else if (isUserInRoom) {
        console.log("User is already in room:", roomData.roomId);
      }

      // Fetch user details for each player in the room
      const playersWithDetails = await Promise.all(
        roomData.players.map(async (playerId) => {
          try {
            const userResponse = await fetch(`http://localhost:3000/api/users/${playerId}`);
            if (!userResponse.ok) {
              console.error(`Failed to fetch user ${playerId}:`, userResponse.statusText);
              return {
                id: playerId,
                fullName: `User ${playerId.substring(0, 8)}`,
              };
            }
            const userData = await userResponse.json();
            return userData.user || {
              id: playerId,
              fullName: `User ${playerId.substring(0, 8)}`,
            };
          } catch (error) {
            console.error(`Error fetching user details for ${playerId}:`, error);
            return {
              id: playerId,
              fullName: `User ${playerId.substring(0, 8)}`,
            };
          }
        })
      );

      setRoomDetails({
        ...roomData,
        playersWithDetails,
      });
      setIsCreator(roomData.creatorId === user.id);
    } catch (error) {
      console.error("Error fetching room details:", error);
      setRoomDetails(null);
      setShowRoomDetails(false);
      alert("Failed to join room. Please try again later.");
    } finally {
      setLoadingDetails(false);
    }
  };

  // Handle socket events
  useEffect(() => {
    if (!socket || !isLoaded || !user) {
      console.log("Socket connection status:", {
        socketExists: !!socket,
        isLoaded,
        userExists: !!user
      });
      return;
    }

    console.log("Setting up socket event listeners for socket:", socket.id);

    // Debug socket state
    socket.on("connect", () => {
      console.log("Socket connected successfully:", {
        id: socket.id,
        connected: socket.connected,
        disconnected: socket.disconnected
      });
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socket.on("players-update", async ({ players, roomId }) => {
      console.log("Received players-update event:", { players, roomId });
      // Update room details when players change
      try {
        const roomResponse = await fetch(`http://localhost:3000/api/room/${roomId}`, {
          method: "GET",
          headers: {
            "x-user-id": user.id,
          },
        });

        if (!roomResponse.ok) {
          throw new Error(`Failed to fetch room: ${roomResponse.statusText}`);
        }

        const responseData = await roomResponse.json();
        const roomData = responseData.room;

        if (!roomData) {
          throw new Error("No room data received");
        }

        // Fetch user details for each player in the room
        const playersWithDetails = await Promise.all(
          roomData.players.map(async (playerId) => {
            try {
              const userResponse = await fetch(`http://localhost:3000/api/users/${playerId}`);
              if (!userResponse.ok) {
                console.error(`Failed to fetch user ${playerId}:`, userResponse.statusText);
                return null;
              }
              const userData = await userResponse.json();
              return userData.user || null;
            } catch (error) {
              console.error(`Error fetching user details for ${playerId}:`, error);
              return null;
            }
          })
        );

        // Filter out any null values from failed user fetches
        const validPlayers = playersWithDetails.filter(player => player !== null);

        setRoomDetails({
          ...roomData,
          playersWithDetails: validPlayers,
        });
      } catch (error) {
        console.error("Error updating room details:", error);
      }
    });

    socket.on("game-starting", () => {
      console.log("Received game-starting event");
      setCountdown("Starting...");
    });

    socket.on("countdown", (count) => {
      console.log(`Countdown received: ${count}`);
      setCountdown(count);
    });

    socket.on("game-started", () => {
      console.log("Received game-started event, redirecting to compete page");
      setCountdown(null);
      
      if (selectedRoom) {
        console.log(`Redirecting to compete page for room: ${selectedRoom.roomId}`);
        router.replace(`/compete?mode=multiplayer&roomId=${selectedRoom.roomId}`);
      } else {
        console.error("Cannot redirect: selectedRoom is null");
      }
    });

    // Listen for room deleted event
    socket.on("room-deleted", ({ roomId }) => {
      console.log(`Room ${roomId} has been deleted`);
      
      // Remove the room from joined rooms and active rooms
      setJoinedRooms(prevRooms => prevRooms.filter(room => room.roomId !== roomId));
      setActiveRooms(prevRooms => prevRooms.filter(room => room.roomId !== roomId));
      
      // If this is the currently selected room, close the details
      if (selectedRoom && selectedRoom.roomId === roomId) {
        setShowRoomDetails(false);
        setSelectedRoom(null);
        alert('This room has been deleted by the creator');
      } else {
        // Notify users even if they're not viewing the room details
        const deletedRoom = joinedRooms.find(room => room.roomId === roomId);
        if (deletedRoom) {
          // Show a notification toast or alert
          alert(`Room "${deletedRoom.roomName || roomId}" has been deleted by the creator`);
        }
      }
    });

    // Listen for global room list updates
    socket.on("room-list-update", ({ deletedRoomId }) => {
      if (deletedRoomId) {
        console.log(`Received global notification that room ${deletedRoomId} was deleted`);
        // Update room lists for all clients
        setJoinedRooms(prevRooms => prevRooms.filter(room => room.roomId !== deletedRoomId));
        setActiveRooms(prevRooms => prevRooms.filter(room => room.roomId !== deletedRoomId));
      }
    });

    return () => {
      socket.off("players-update");
      socket.off("game-starting");
      socket.off("countdown");
      socket.off("game-started");
      socket.off("room-deleted");
      socket.off("room-list-update");
    };
  }, [socket, selectedRoom, router, isLoaded, user, joinedRooms]);

  // Start the game (only for room creator)
  const handleStartGame = () => {
    console.log("Start game button clicked");
    if (!socket || !selectedRoom) {
      console.error("Socket or selectedRoom not available", { socket: !!socket, roomId: selectedRoom?.roomId });
      return;
    }
    
    // Set countdown to indicate game is starting
    setCountdown("Starting...");
    
    console.log("Emitting start-game event for room:", selectedRoom.roomId);
    socket.emit("start-game", selectedRoom.roomId);
    
    // Set up a manual countdown for the creator in case socket events don't work
    let count = 3;
    const countdownInterval = setInterval(() => {
      if (count > 0) {
        console.log(`Local countdown for creator: ${count}`);
        setCountdown(count);
        count--;
      } else {
        clearInterval(countdownInterval);
        console.log("Local countdown complete, redirecting creator to compete page");
        setCountdown(null);
        router.replace(`/compete?mode=multiplayer&roomId=${selectedRoom.roomId}`);
      }
    }, 1000);
    
    // Clear the interval if we receive the game-started event from the server
    const clearCountdownOnGameStarted = () => {
      clearInterval(countdownInterval);
      socket.off("game-started", clearCountdownOnGameStarted);
    };
    
    socket.on("game-started", clearCountdownOnGameStarted);
  };

  // Room Details Content Component
  const RoomDetailsContent = () => {
    console.log("Room Details:", roomDetails); // Debug log
    return (
      <div>
        <h3 className="text-2xl font-semibold text-white mb-4">{roomDetails.roomName}</h3>
        <div className="space-y-4">
          <div className="bg-neutral-800 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-white mb-2">Room Information</h4>
            <p className="text-neutral-400">Current Players: {roomDetails.currentPlayers}</p>
            <p className="text-neutral-400">Max Players: {roomDetails.maxPlayers}</p>
            {countdown !== null && (
              <div className="mt-4 text-center">
                <p className="text-2xl font-bold text-green-400">{countdown}</p>
              </div>
            )}
            {isCreator && roomDetails.players.length >= 2 && countdown === null && (
              <button
                onClick={handleStartGame}
                className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Start Game
              </button>
            )}
            
            {/* Delete Room Button - Only visible to the creator */}
            {isCreator && (
              <button
                onClick={handleDeleteRoom}
                className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete Room
              </button>
            )}
          </div>
          
          <div className="bg-neutral-800 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-white mb-2">Room Creator</h4>
            <div className="mb-4">
              {roomDetails.playersWithDetails.map(player => 
                player.id === roomDetails.creatorId && (
                  <div key={player.id} className="flex items-center space-x-4">
                    <img
                      src={player.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${player.id}`}
                      alt={player.fullName || "User"}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-white">
                        {player.fullName || `User ${player.id.substring(0, 8)}`}
                      </h3>
                      {player.email && (
                        <p className="text-sm text-neutral-400">{player.email}</p>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            <h4 className="text-lg font-medium text-white mb-2">Players</h4>
            {roomDetails.playersWithDetails.length > 0 ? (
              <ul className="space-y-4">
                {roomDetails.playersWithDetails.map((player) => (
                  <li key={player.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={player.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${player.id}`}
                        alt={player.fullName || "User"}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-white">
                          {player.fullName || `User ${player.id.substring(0, 8)}`}
                        </h3>
                        {player.email && (
                          <p className="text-sm text-neutral-400">{player.email}</p>
                        )}
                      </div>
                    </div>
                    {player.id === roomDetails.creatorId && (
                      <span className="ml-2 text-green-400 text-sm">(Creator)</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-400">No players have joined yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Handle room deletion
  const handleDeleteRoom = async () => {
    if (!isCreator || !selectedRoom || !user || !socket) {
      console.log("Cannot delete room:", { 
        isCreator, 
        hasSelectedRoom: !!selectedRoom, 
        hasUser: !!user, 
        hasSocket: !!socket 
      });
      
      if (!isCreator) {
        alert("Only the room creator can delete a room");
      } else if (!socket) {
        alert("Socket connection is not available. Please refresh the page and try again.");
      } else {
        alert("Unable to delete room. Please try again later.");
      }
      
      return;
    }

    try {
      console.log("Deleting room:", selectedRoom.roomId);
      
      // Show confirmation dialog
      if (!window.confirm(`Are you sure you want to delete the room "${selectedRoom.roomName}"? This action cannot be undone.`)) {
        return;
      }
      
      // First, emit socket event to notify all users in the room
      socket.emit("delete-room", { roomId: selectedRoom.roomId });
      
      // Then, call the API to delete the room from the database
      const response = await fetch(`http://localhost:3000/api/room/${selectedRoom.roomId}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': user.id
        }
      });

      if (response.ok) {
        console.log("Room deleted successfully via API");
        
        // Remove the room from joined rooms and active rooms
        setJoinedRooms(prevRooms => prevRooms.filter(room => room.roomId !== selectedRoom.roomId));
        setActiveRooms(prevRooms => prevRooms.filter(room => room.roomId !== selectedRoom.roomId));
        
        // Close the room details modal
        setShowRoomDetails(false);
        
        // Clear selected room
        setSelectedRoom(null);
        
        // Show success message
        alert('Room deleted successfully');
      } else {
        const data = await response.json();
        console.error("API error deleting room:", data.error);
        
        if (response.status === 404) {
          // Room already deleted
          setShowRoomDetails(false);
          setSelectedRoom(null);
          alert('Room has already been deleted');
        } else {
          alert(data.error || 'Failed to delete room');
        }
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('Failed to delete room. Please try again.');
    }
  };

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
          {/* Quick Race */}
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
          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-green-400 transition duration-200 cursor-pointer">
            <h3 className="text-xl font-semibold text-white mb-2">Join Tournament</h3>
            <p className="text-neutral-400 mb-4">
              Compete in an official tournament against top players
            </p>
            <button
              onClick={() => alert("Tournament feature coming soon!")}
              className="w-full py-3 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200"
            >
              Join Tournament
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
                  className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 text-white flex justify-between cursor-pointer hover:border-green-400 transition-colors duration-200"
                  onClick={() => handleRoomClick(room)}
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

        {/* Room Details Modal */}
        {showRoomDetails && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-neutral-900 p-6 rounded-lg shadow-lg w-[600px] relative">
              <button
                onClick={() => setShowRoomDetails(false)}
                className="absolute top-2 right-2 text-white text-xl hover:text-gray-400"
              >
                &times;
              </button>
              
              {loadingDetails ? (
                <p className="text-neutral-400">Loading room details...</p>
              ) : roomDetails ? (
                <RoomDetailsContent />
              ) : (
                <p className="text-neutral-400">Failed to load room details</p>
              )}
            </div>
          </div>
        )}

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
              <CreateRoomForm onRoomCreated={(roomId) => setCreatedRoom(roomId)} />

              {/* Display Room ID */}
              {createdRoom && (
                <div className="mt-4 p-3 bg-neutral-800 rounded-lg text-center border border-neutral-700">
                  <p className="text-white text-lg">Room ID: <span className="text-green-400 font-bold">{createdRoom}</span></p>
                  <button
                    onClick={copyRoomId}
                    className="mt-2 px-4 py-2 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400 transition-colors duration-200"
                  >
                    Copy Room ID
                  </button>
                </div>
              )}
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
              <JoinRoomModal isOpen={showJoinRoomModal} onClose={closeJoinRoomModal} />
            </div>
          </div>
        )}


      </div>
    </section>
  )
}

export default Multiplayer
