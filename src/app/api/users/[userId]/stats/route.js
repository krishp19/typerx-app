import { NextResponse } from 'next/server';

const mockUserStats = {
  overallStats: {
    totalSessions: 150,
    averageWpm: 65,
    bestWpm: 85,
    averageAccuracy: 96,
  },
  practiceTypeStats: {
    basic: {
      totalSessions: 50,
      averageWpm: 70,
      bestWpm: 85,
      averageAccuracy: 97,
    },
    advanced: {
      totalSessions: 30,
      averageWpm: 62,
      bestWpm: 78,
      averageAccuracy: 95,
    },
    numbers: {
      totalSessions: 20,
      averageWpm: 45,
      bestWpm: 60,
      averageAccuracy: 92,
    },
    symbols: {
      totalSessions: 15,
      averageWpm: 40,
      bestWpm: 55,
      averageAccuracy: 90,
    },
    code: {
      totalSessions: 25,
      averageWpm: 55,
      bestWpm: 70,
      averageAccuracy: 94,
    },
    quotes: {
      totalSessions: 10,
      averageWpm: 75,
      bestWpm: 82,
      averageAccuracy: 98,
    },
  },
  recentResults: [
    {
      id: '1',
      type: 'basic',
      wpm: 68,
      accuracy: 97,
      duration: 60,
      mistakes: 3,
      completedAt: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'code',
      wpm: 52,
      accuracy: 94,
      duration: 120,
      mistakes: 8,
      completedAt: '2024-03-14T15:45:00Z'
    },
    {
      id: '3',
      type: 'symbols',
      wpm: 42,
      accuracy: 91,
      duration: 90,
      mistakes: 12,
      completedAt: '2024-03-14T09:20:00Z'
    },
    {
      id: '4',
      type: 'quotes',
      wpm: 73,
      accuracy: 98,
      duration: 180,
      mistakes: 4,
      completedAt: '2024-03-13T14:15:00Z'
    },
    {
      id: '5',
      type: 'advanced',
      wpm: 61,
      accuracy: 95,
      duration: 150,
      mistakes: 9,
      completedAt: '2024-03-13T11:00:00Z'
    }
  ]
};

export async function GET(request, { params }) {
  try {
    const { userId } = params;

    // In a real application, you would fetch this data from your database
    // For now, we'll use mock data
    const userStats = mockUserStats;

    return NextResponse.json({
      success: true,
      data: userStats
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: {
        message: 'Failed to fetch user statistics'
      }
    }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { userId } = params;
    const body = await request.json();
    
    // In a real application, you would save this data to your database
    // For now, we'll just return a success response
    return NextResponse.json({
      success: true,
      message: 'Statistics updated successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: {
        message: 'Failed to update user statistics'
      }
    }, { status: 500 });
  }
} 