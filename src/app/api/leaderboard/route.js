import { NextResponse } from "next/server";
import connectDB from '../../../helper/db.js';
import UserStats from '../../../models/user.js';

export async function GET() {
  try {
    await connectDB();
    
    const topUsers = await UserStats.find({})
      .sort({ averageWpm: -1 })
      .limit(10);

    const userIds = topUsers.map(user => user.userId);

    // Fetch each user separately from Clerk
    const userDetails = await Promise.all(
      userIds.map(async (id) => {
        const res = await fetch(`https://api.clerk.dev/v1/users/${id}`, {
          headers: {
            "Authorization": `Bearer ${process.env.CLERK_SECRET_KEY}`,
            "Content-Type": "application/json"
          }
        });
        return res.ok ? await res.json() : null;
      })
    );

    const leaderboard = topUsers.map(user => {
      const clerkUser = userDetails.find(cu => cu && cu.id === user.userId);

      return {
        userId: user.userId,
        username: clerkUser 
          ? clerkUser.username || `${clerkUser.first_name || ""} ${clerkUser.last_name || ""}`.trim() : "Guest",
        averageWpm: user.averageWpm,
        averageAccuracy: user.averageAccuracy,
        totalSessions: user.totalSessions
      };
    });

    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leaderboard", details: error.message }, { status: 500 });
  }
}
