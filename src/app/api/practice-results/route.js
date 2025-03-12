import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['sessionId', 'userId', 'wpm', 'accuracy', 'duration', 'mistakes'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_REQUEST',
            message: `Missing required fields: ${missingFields.join(', ')}`
          }
        },
        { status: 400 }
      );
    }

    // Validate data types and ranges
    if (body.wpm < 0 || body.accuracy < 0 || body.accuracy > 100) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_DATA',
            message: 'Invalid values: WPM must be positive, accuracy must be between 0 and 100'
          }
        },
        { status: 400 }
      );
    }

    // Create practice result
    const result = {
      id: Math.random().toString(36).substr(2, 9), // Generate random ID (use UUID in production)
      sessionId: body.sessionId,
      userId: body.userId,
      wpm: body.wpm,
      accuracy: body.accuracy,
      completedAt: new Date(),
      duration: body.duration,
      mistakes: body.mistakes
    };

    // In a real app, save to database here

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error saving practice results:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to save practice results'
        }
      },
      { status: 500 }
    );
  }
} 