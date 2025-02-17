// models/room.js

import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  creatorId: {
    type: String,
    required: true,
  },
  players: {
    type: [String], // Array to store player IDs
    default: [],
  },
  password: {
    type: String, // Password field for the room
    required: false, // Not mandatory, only if password protection is enabled
  },
  maxPlayers: {
    type: Number, // Max players allowed in the room
    default: 2, // Default value is 2, you can change it
  },
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);
export default Room;
