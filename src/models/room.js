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
  maxPlayers: {
    type: Number,
    required: true,
  },
  creatorId: {
    type: String,
    required: true,
  },
  players: [{
    type: String,
  }],
  currentPlayers: {
    type: Number,
    default: 1,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model is already defined to prevent OverwriteModelError
const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;
