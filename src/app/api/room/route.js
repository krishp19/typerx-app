// api/get-room.js

import { NextResponse } from "next/server";
import connectDB from "../../../helper/db.js";
import Room from "../../../models/room.js";

export async function GET(req) {
  try {
    await connectDB(); // Ensure DB connection

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Find rooms where the user is either a creator or a player
    const rooms = await Room.find({
      $or: [
        { players: userId },
        { creatorId: userId }
      ]
    });

    return NextResponse.json({ rooms }, { status: 200 });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB(); // Ensure DB connection

    const { roomName, maxPlayers, creatorId } = await req.json();

    if (!roomName || !maxPlayers || !creatorId) {
      return NextResponse.json(
        { error: "Room name, max players, and creator ID are required" },
        { status: 400 }
      );
    }

    const room = new Room({
      roomId: Math.random().toString(36).substring(2, 15),
      roomName,
      maxPlayers,
      creatorId,
      players: [creatorId],
      currentPlayers: 1,
      createdAt: new Date(),
      isActive: true,
    });

    await room.save();

    return NextResponse.json({ room }, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB(); // Ensure DB connection

    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const { roomId } = await req.json();

    if (!roomId) {
      return NextResponse.json({ error: "Room ID is required" }, { status: 400 });
    }

    // Find the room by roomId and check if the user is the creator
    const room = await Room.findOne({ roomId, creatorId: userId });
    if (!room) {
      return NextResponse.json({ error: "Room not found or you are not the creator" }, { status: 404 });
    }

    // Delete the room
    await Room.deleteOne({ roomId });

    return NextResponse.json({ message: "Room deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
