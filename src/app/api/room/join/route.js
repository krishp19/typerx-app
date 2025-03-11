import { NextResponse } from "next/server";
import connectDB from "../../../../helper/db.js";
import Room from "../../../../models/room.js";

export async function POST(req) {
  try {
    await connectDB(); // Ensure DB connection

    const { roomId, userId } = await req.json();

    if (!roomId || !userId) {
      return NextResponse.json(
        { error: "Room ID and user ID are required" },
        { status: 400 }
      );
    }

    // Find the room
    const room = await Room.findOne({ roomId });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Check if user is already in the room
    if (room.players.includes(userId)) {
      return NextResponse.json(
        { 
          message: "You are already in this room", 
          alreadyJoined: true,
          room 
        }, 
        { status: 200 }
      );
    }

    if (room.currentPlayers >= room.maxPlayers) {
      return NextResponse.json(
        { error: "Room is full" },
        { status: 400 }
      );
    }

    // Update room with new player
    room.players.push(userId);
    room.currentPlayers += 1;
    await room.save();

    return NextResponse.json(
      { 
        message: "Successfully joined the room", 
        alreadyJoined: false,
        room 
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error joining room:", error);
    return NextResponse.json(
      { error: "Failed to join room" },
      { status: 500 }
    );
  }
} 