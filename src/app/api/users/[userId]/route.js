import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(req, { params }) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch user details from Clerk API
    const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Clerk API error: ${response.statusText}`);
    }

    const user = await response.json();

    // Return relevant user information
    const userInfo = {
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      imageUrl: user.image_url,
      lastActiveAt: user.last_active_at,
      createdAt: user.created_at,
      emailAddresses: user.email_addresses,
    };

    return NextResponse.json({ user: userInfo }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { error: "Failed to fetch user details" },
      { status: 500 }
    );
  }
} 