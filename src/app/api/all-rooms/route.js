import { NextResponse } from "next/server";
import connectDB from "../../../helper/db";
import Room from "../../../models/room";


export async function GET() {
  try {
    await connectDB(); // Ensure DB connection

    // Fetch all rooms, exclude passwords for security
    const rooms = await Room.find({}, "-password").lean();

    return NextResponse.json({ rooms }, { status: 200 });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
