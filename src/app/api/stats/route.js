import { NextResponse } from "next/server";
import connectDB from '../../../helper/db.js'
import UserStats from '../../../models/user.js'

export async function GET(req) {
  try {
    await connectDB(); // Ensure MongoDB connection

    // Get userId from query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const userStats = await UserStats.findOne({ userId: userId.trim() });

    if (!userStats) {
      return NextResponse.json({ message: "No stats found for this user" }, { status: 404 });
    }

    return NextResponse.json(userStats, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
