import { NextResponse } from "next/server";
import connectDB from '../../../helper/db.js'
import UserStats from '../../../models/user.js'


export async function GET() {
    try {
      await connectDB();
      
      // Fetch top users from MongoDB
      const topUsers = await UserStats.find({})
        .sort({ averageWpm: -1 }) // Sort by highest WPM
        .limit(10); // Get top 10 users
  
      // Fetch user details from Clerk API
      const userIds = topUsers.map(user => user.userId);
      
      const clerkResponse = await fetch(`https://api.clerk.dev/v1/users?user_id=${userIds.join(",")}`, {
        headers: {
          "Authorization": `Bearer ${process.env.CLERK_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      });
  
      const clerkUsers = await clerkResponse.json();
      
      // Map usernames from Clerk API to the leaderboard data
      const leaderboard = topUsers.map(user => {
        const clerkUser = clerkUsers.find(cu => cu.id === user.userId);
        return {
          userId: user.userId,
          username: clerkUser ? clerkUser.username || clerkUser.first_name : "Anonymous",
          averageWpm: user.averageWpm,
          averageAccuracy: user.averageAccuracy,
          totalSessions: user.totalSessions
        };
      });
  
      return NextResponse.json(leaderboard, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
    }
  }
