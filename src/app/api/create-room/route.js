// api/create-room.js

import { NextResponse } from "next/server";
import connectDB from "../../../helper/db.js";
import Room from "../../../models/room.js";
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique roomId generation

export async function POST(req) {
  try {
    await connectDB(); // Ensure DB connection

    const userId = req.headers.get("x-user-id"); // Get userId from headers
    const { roomName, password, maxPlayers } = await req.json();

    if (!userId || !roomName) {
      return NextResponse.json({ error: "User ID and Room Name are required" }, { status: 400 });
    }

    // Check if the room name already exists for the user
    const existingRoom = await Room.findOne({ creatorId: userId, roomName });
    if (existingRoom) {
      return NextResponse.json({ error: "A room with this name already exists for this user!" }, { status: 400 });
    }

    // Generate a unique roomId
    const roomId = uuidv4();

    // Check if maxPlayers is a valid number
    const maxPlayersInt = parseInt(maxPlayers, 10);
    if (isNaN(maxPlayersInt) || maxPlayersInt <= 0) {
      return NextResponse.json({ error: "Invalid number of players" }, { status: 400 });
    }

    // Create new room with password protection and maxPlayers
    const newRoom = new Room({
      roomId,         // Using the generated roomId
      roomName,       // Room name from the request body
      creatorId: userId,
      players: [userId], // Add creator as first player
      password,       // Password protection
      maxPlayers: maxPlayersInt, // Max players in the room
    });

    await newRoom.save();
    return NextResponse.json({ message: "Room created successfully", room: newRoom }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
