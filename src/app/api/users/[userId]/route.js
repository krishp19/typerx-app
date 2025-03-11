import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    // Extract userId from route params
    const requestedUserId = params.userId;

    if (!requestedUserId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch user from Clerk API
    const response = await fetch(`https://api.clerk.com/v1/users/${requestedUserId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = await response.json();

    return NextResponse.json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        fullName: `${user.first_name} ${user.last_name}`,
        imageUrl: user.image_url,
        email: user.email_addresses?.[0]?.email_address
      }
    });

  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { error: "Failed to fetch user details" },
      { status: 500 }
    );
  }
}
