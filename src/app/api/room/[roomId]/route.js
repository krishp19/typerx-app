import { NextResponse } from "next/server";
import connectDB from "../../../../helper/db";
import Room from "../../../../models/room";

export async function GET(req) {
  try {
    await connectDB(); // Ensure DB connection

    const roomId = req.nextUrl.pathname.split('/').pop();
    if (!roomId) {
      return NextResponse.json({ error: "Room ID is required" }, { status: 400 });
    }

    // Find the room by ID
    const room = await Room.findOne({ roomId });
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Return room information (excluding sensitive data like password)
    const roomInfo = {
      roomId: room.roomId,
      roomName: room.roomName,
      creatorId: room.creatorId,
      players: room.players,
      maxPlayers: room.maxPlayers,
      isPrivate: !!room.password, // Indicate if room is private without exposing password
      currentPlayers: room.players.length,
      createdAt: room.createdAt
    };

    return NextResponse.json({ room: roomInfo }, { status: 200 });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Failed to fetch room details" },
      { status: 500 }
    );
  }
}

// Optional: Add DELETE endpoint to remove a room
export async function DELETE(req) {
  try {
    await connectDB();

    const roomId = req.nextUrl.pathname.split('/').pop();
    const userId = req.headers.get("x-user-id");

    if (!roomId || !userId) {
      return NextResponse.json({ error: "Room ID and User ID are required" }, { status: 400 });
    }

    // Find the room and verify ownership
    const room = await Room.findOne({ roomId, creatorId: userId });
    if (!room) {
      return NextResponse.json({ error: "Room not found or you are not the creator" }, { status: 404 });
    }

    // Delete the room
    await Room.deleteOne({ roomId });

    return NextResponse.json({ message: "Room deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json({ error: "Failed to delete room" }, { status: 500 });
  }
} 