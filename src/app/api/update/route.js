import { NextResponse } from "next/server";
import connectDB from "../../../helper/db";
import UserStats from "../../../models/user";

export async function POST(req) {
  try {
    await connectDB(); // Ensure DB connection

    const { userId, wpm, accuracy, sessionDate } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    let user = await UserStats.findOne({ userId });

    if (!user) {
      user = new UserStats({ 
        userId, 
        averageWpm: 0, 
        averageAccuracy: 100, 
        totalSessions: 0, 
        sessionHistory: [] 
      });
    }

    user.totalSessions += 1;
    user.averageWpm = ((user.averageWpm * (user.totalSessions - 1)) + wpm) / user.totalSessions;
    user.averageAccuracy = ((user.averageAccuracy * (user.totalSessions - 1)) + accuracy) / user.totalSessions;
    user.sessionHistory.push({ wpm, accuracy, date: sessionDate });

    await user.save();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
