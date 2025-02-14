import mongoose from "mongoose";

const UserStatsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  averageWpm: { type: Number, default: 0 },
  averageAccuracy: { type: Number, default: 100 },
  totalSessions: { type: Number, default: 0 },
  sessionHistory: [
    {
      wpm: Number,
      accuracy: Number,
      date: String, // Store date as ISO string
    },
  ],
});

export default mongoose.models.UserStats || mongoose.model("UserStats", UserStatsSchema);
