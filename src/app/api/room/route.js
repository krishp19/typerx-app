// api/get-room.js

import { NextResponse } from "next/server";
import connectDB from "../../../helper/db.js";
import Room from "../../../models/room.js";

export async function GET(req) {
  try {
    await connectDB(); // Ensure DB connection

    const userId = req.headers.get("x-user-id"); // Get userId from headers
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Find all rooms created by the user
    const rooms = await Room.find({ creatorId: userId });
    if (!rooms.length) {
      return NextResponse.json({ error: "No rooms found for this user" }, { status: 404 });
    }

    return NextResponse.json({ rooms }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB(); // Ensure DB connection

    const userId = req.headers.get("x-user-id"); // Get userId from headers
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const { roomId } = await req.json(); // Get roomId from the request body

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
