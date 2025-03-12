import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.userId || !body.modeId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_REQUEST',
            message: 'Missing required fields: userId and modeId are required'
          }
        },
        { status: 400 }
      );
    }

    // Create a new session
    const session = {
      id: Math.random().toString(36).substr(2, 9), // Generate random ID (use UUID in production)
      userId: body.userId,
      modeId: body.modeId,
      startTime: new Date(),
      status: 'active'
    };

    // In a real app, save to database here

    return NextResponse.json({
      success: true,
      data: session
    });
  } catch (error) {
    console.error('Error creating practice session:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create practice session'
        }
      },
      { status: 500 }
    );
  }
} 