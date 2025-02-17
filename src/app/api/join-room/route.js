// api/join-room.js

import { NextResponse } from "next/server";
import connectDB from "../../../helper/db.js";
import Room from "../../../models/room.js";

export async function POST(req) {
  try {
    await connectDB(); // Ensure DB connection

    const userId = req.headers.get("x-user-id"); // Get userId from headers
    const { roomId, password } = await req.json(); // Get roomId and password from request body

    if (!userId || !roomId || !password) {
      return NextResponse.json({ error: "User ID, Room ID, and Password are required" }, { status: 400 });
    }

    // Find the room by roomId
    const room = await Room.findOne({ roomId });
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Check if the provided password matches the room's password
    if (room.password !== password) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 400 });
    }

    if (room.players.includes(userId)) {
        return NextResponse.json({ error: "You are already in this room" }, { status: 400 });
      }

    // Check if the room has space for more players
    if (room.players.length >= room.maxPlayers) {
      return NextResponse.json({ error: "Room is full" }, { status: 400 });
    }

    // Add the user to the players list
    room.players.push(userId);
    await room.save();

    return NextResponse.json({ message: "Joined the room successfully", room }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
