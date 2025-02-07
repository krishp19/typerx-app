import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectDb } from '../../../helper/db';
import { User } from '../../../models/user';


export async function GET(request) {
    let users = []
    
    try {
        await connectDb();
        users = await User.find().select("-password");
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "failed to get users",
            success: false,
        })
    }

    return NextResponse.json(users);
}


export async function POST(req) {

  await connectDb();
  const { name, email, password, about, profileURL } = await req.json();

  try {
    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { name }] });

    if (existingUser) {
      return NextResponse.json({
        message: existingUser.email === email ? "Email is already in use." : "Username is already in use.",
        status: false
      }, { status: 400 });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user object
    const user = new User({
      name,
      email,
      password: hashedPassword,
      about,
      profileURL
    });

    const createdUser = await user.save();

    return NextResponse.json({
      message: "User created successfully",
      user: {
        name: createdUser.name,
        email: createdUser.email,
        about: createdUser.about,
        profileURL: createdUser.profileURL
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({
      message: "Something went wrong",
      status: false
    }, { status: 500 });
  }
}

export function DELETE(request){
    console.log("delete api called")
    return NextResponse.json({
        message: "delete api called!!",
        status: true,
    },{
        status: 200, 
        statusText:"I love you dude"
    });
}