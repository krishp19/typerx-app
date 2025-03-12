import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const userId = params.userId;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_REQUEST',
            message: 'User ID is required'
          }
        },
        { status: 400 }
      );
    }

    // Mock data - In a real app, fetch from database
    const mockProgress = {
      totalSessions: 25,
      averageWpm: 65,
      averageAccuracy: 95.5,
      bestWpm: 85,
      recentResults: [
        {
          id: '1',
          sessionId: 'session1',
          userId: userId,
          wpm: 70,
          accuracy: 96,
          completedAt: new Date(),
          duration: 180,
          mistakes: 4
        }
      ]
    };

    return NextResponse.json({
      success: true,
      data: mockProgress
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch user progress'
        }
      },
      { status: 500 }
    );
  }
} 